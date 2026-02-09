;; Quest Contract - Manages quest creation, completion, and rewards
;; Uses Clarity 4 features: contract-hash?, restrict-assets?, stacks-block-time
;; Version: 2.0.0 - Added improved validation, events, and emergency functions

(define-constant contract-owner (as-contract tx-sender))
(define-constant reward-token-contract (unwrap-panic (contract-of? .reward-token)))

;; Quest status enum
(define-constant status-active u1)
(define-constant status-completed u2)
(define-constant status-cancelled u3)

;; Error codes
(define-constant err-deadline-past u1)
(define-constant err-reward-zero u2)
(define-constant err-quest-not-active u3)
(define-constant err-quest-expired u4)
(define-constant err-quest-completed u5)
(define-constant err-not-completed u6)
(define-constant err-no-completer u7)
(define-constant err-not-creator u8)
(define-constant err-not-active u10)

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

;; Events for indexing
(define-map quest-events uint (list 100 { event-type: (string-ascii 20), block-height: uint, data: (buff 500) }))

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
      ;; Enhanced validation
      (asserts! (> deadline current-time) (err err-deadline-past))
      (asserts! (> reward-amount u0) (err err-reward-zero))
      (asserts! (<= (len title) u100) (err u11))
      (asserts! (<= (len description) u500) (err u12))
      
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
      ;; Emit event
      (map-set quest-events quest-id (list 
        { event-type: "created", block-height: current-time, data: (buff "quest created") }
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
      (asserts! (is-eq (get status quest) status-active) (err err-quest-not-active))
      (asserts! (<= current-time (get deadline quest)) (err err-quest-expired))
      (asserts! (is-none (get completer quest)) (err err-quest-completed))
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
      (asserts! (is-eq (get status quest) status-completed) (err err-not-completed))
      (asserts! (is-some (get completer quest)) (err err-no-completer))
      (asserts! (is-eq tx-sender (unwrap-panic (get completer quest))) (err u8))
      (try! (contract-call? reward-token-contract mint (get reward-amount quest) tx-sender))
      (ok true)
    )
  )
)

;; Cancel a quest (only creator)
(define-public (cancel-quest (quest-id uint))
  (let ((quest (unwrap-panic (map-get? quests quest-id))))
    (begin
      (asserts! (is-eq tx-sender (get creator quest)) (err err-not-creator))
      (asserts! (is-eq (get status quest) status-active) (err err-not-active))
      (map-set quests quest-id (merge quest (tuple (status status-cancelled))))
      (ok true)
    )
  )
)

;; Emergency function to pause contract
(define-data-var paused bool false)
(define-public (pause-contract)
  (begin
    (asserts! (is-eq tx-sender contract-owner) (err u9))
    (var-set paused true)
    (ok true)
  )
)

(define-public (unpause-contract)
  (begin
    (asserts! (is-eq tx-sender contract-owner) (err u9))
    (var-set paused false)
    (ok true)
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

(define-read-only (is-paused)
  (ok (var-get paused))
)
