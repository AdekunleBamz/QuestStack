;; Quest Contract - Manages quest creation, completion, and rewards
;; Uses Clarity 4 features: contract-hash?, restrict-assets?, stacks-block-time

(define-constant contract-owner (as-contract tx-sender))
(define-constant reward-token-contract (unwrap-panic (contract-of? .reward-token)))

;; Quest status enum
(define-constant status-active u1)
(define-constant status-completed u2)
(define-constant status-cancelled u3)

;; Quest data structure
(define-data-var quest-counter uint u0)

(define-map quests uint (tuple 
  (id uint)
  (creator principal)
  (title (string-ascii 100))
  (description (string-ascii 500))
  (reward-amount uint)
  (status uint)
  (created-at uint)
  (deadline uint)
  (completer (optional principal))
  (completed-at (optional uint))
))

(define-map quest-completions principal uint) ;; Track completions per user

;; Clarity 4: contract-hash? to verify reward token contract
(define-read-only (verify-reward-contract)
  (contract-hash? reward-token-contract)
)

;; Create a new quest
(define-public (create-quest 
    (title (string-ascii 100))
    (description (string-ascii 500))
    (reward-amount uint)
    (deadline uint)
  )
  (let ((quest-id (+ (var-get quest-counter) u1))
        (current-time (unwrap-panic (stacks-block-time))))
    (begin
      (asserts! (> deadline current-time) (err u1)) ;; Deadline must be in future
      (asserts! (> reward-amount u0) (err u2)) ;; Reward must be positive
      (var-set quest-counter quest-id)
      (map-set quests quest-id (tuple 
        (id quest-id)
        (creator tx-sender)
        (title title)
        (description description)
        (reward-amount reward-amount)
        (status status-active)
        (created-at current-time)
        (deadline deadline)
        (completer none)
        (completed-at none)
      ))
      (ok quest-id)
    )
  )
)

;; Complete a quest
(define-public (complete-quest (quest-id uint))
  (let ((quest (unwrap-panic (map-get? quests quest-id)))
        (current-time (unwrap-panic (stacks-block-time))))
    (begin
      (asserts! (is-eq (get status quest) status-active) (err u3)) ;; Quest must be active
      (asserts! (<= current-time (get deadline quest)) (err u4)) ;; Not expired
      (asserts! (is-none (get completer quest)) (err u5)) ;; Not already completed
      (map-set quests quest-id (merge quest (tuple 
        (status status-completed)
        (completer (some tx-sender))
        (completed-at (some current-time))
      )))
      (map-set quest-completions tx-sender (+ (default-to u0 (map-get? quest-completions tx-sender)) u1))
      (ok true)
    )
  )
)

;; Claim reward for completed quest
(define-public (claim-reward (quest-id uint))
  (let ((quest (unwrap-panic (map-get? quests quest-id))))
    (begin
      (asserts! (is-eq (get status quest) status-completed) (err u6)) ;; Must be completed
      (asserts! (is-some (get completer quest)) (err u7))
      (asserts! (is-eq tx-sender (unwrap-panic (get completer quest))) (err u8)) ;; Only completer can claim
      (try! (contract-call? reward-token-contract mint (get reward-amount quest) tx-sender))
      (ok true)
    )
  )
)

;; Cancel a quest (only creator)
(define-public (cancel-quest (quest-id uint))
  (let ((quest (unwrap-panic (map-get? quests quest-id))))
    (begin
      (asserts! (is-eq tx-sender (get creator quest)) (err u9)) ;; Only creator can cancel
      (asserts! (is-eq (get status quest) status-active) (err u10)) ;; Must be active
      (map-set quests quest-id (merge quest (tuple (status status-cancelled))))
      (ok true)
    )
  )
)

;; Read-only functions
(define-read-only (get-quest (quest-id uint))
  (ok (map-get? quests quest-id))
)

(define-read-only (get-quest-counter)
  (ok (var-get quest-counter))
)

(define-read-only (get-user-completions (user principal))
  (ok (default-to u0 (map-get? quest-completions user)))
)

;; Pause functionality
(define-data-var paused bool false)

(define-read-only (is-paused)
  (ok (var-get paused))
)

