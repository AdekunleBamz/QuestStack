;; Governance Contract - DAO-style governance for quest parameters
;; Uses Clarity 4 features: stacks-block-time, contract-hash?
;; Version: 2.0.0 - Added enhanced voting and proposal features

(define-constant contract-owner (as-contract tx-sender))
(define-constant quest-contract (unwrap-panic (contract-of? .quest-contract)))
(define-constant reward-token-contract (unwrap-panic (contract-of? .reward-token)))

;; Proposal status
(define-constant status-pending u1)
(define-constant status-active u2)
(define-constant status-passed u3)
(define-constant status-rejected u4)
(define-constant status-executed u5)

;; Voting period (in blocks)
(define-constant voting-period u1000)
(define-constant minimum-votes u10)
(define-constant quorum-threshold u50) ;; 50% threshold

;; Error codes
(define-constant err-proposal-inactive u1)
(define-constant err-voting-ended u2)
(define-constant err-already-voted u3)
(define-constant err-proposal-ended u4)
(define-constant err-insufficient-votes u5)
(define-constant err-not-owner u6)
(define-constant err-description-too-long u7)

;; Proposal data
(define-data-var proposal-counter uint u0)

(define-map proposals uint (tuple
  (id uint)
  (proposer principal)
  (title (string-ascii 100))
  (description (string-ascii 500))
  (target-contract principal)
  (function-name (string-ascii 50))
  (parameters (list 10 (optional (buff 100))))
  (status uint)
  (created-at uint)
  (end-time uint)
  (votes-for uint)
  (votes-against uint)
))

(define-map votes (tuple (proposal-id uint) (voter principal)) bool)
(define-map has-voted (tuple (proposal-id uint) (voter principal)) bool)

;; Proposal events for indexing
(define-map proposal-events uint (list 50 { event-type: (string-ascii 20), block-height: uint }))

;; Clarity 4: contract-hash? to verify contracts
(define-read-only (verify-contracts)
  (ok (and 
    (contract-hash? quest-contract)
    (contract-hash? reward-token-contract)
  ))
)

;; Create a proposal with enhanced validation
(define-public (propose
    (title (string-ascii 100))
    (description (string-ascii 500))
    (target-contract principal)
    (function-name (string-ascii 50))
    (parameters (list 10 (optional (buff 100))))
  )
  (let ((proposal-id (+ (var-get proposal-counter) u1))
        (current-time (unwrap-panic (stacks-block-time)))
        (end-time (+ current-time voting-period)))
    (begin
      (asserts! (<= (len description) u500) (err err-description-too-long))
      (var-set proposal-counter proposal-id)
      (map-set proposals proposal-id (tuple
        (id proposal-id)
        (proposer tx-sender)
        (title title)
        (description description)
        (target-contract target-contract)
        (function-name function-name)
        (parameters parameters)
        (status status-active)
        (created-at current-time)
        (end-time end-time)
        (votes-for u0)
        (votes-against u0)
      ))
      (map-set proposal-events proposal-id (list
        { event-type: "created", block-height: current-time }
      ))
      (ok proposal-id)
    )
  )
)

;; Vote on a proposal
(define-public (vote (proposal-id uint) (support bool))
  (let ((proposal (unwrap-panic (map-get? proposals proposal-id)))
        (current-time (unwrap-panic (stacks-block-time))))
    (begin
      (asserts! (is-eq (get status proposal) status-active) (err err-proposal-inactive))
      (asserts! (<= current-time (get end-time proposal)) (err err-voting-ended))
      (asserts! (is-none (map-get? has-voted (tuple (proposal-id proposal-id) (voter tx-sender)))) (err err-already-voted))
      (map-set has-voted (tuple (proposal-id proposal-id) (voter tx-sender)) true)
      (if support
        (map-set proposals proposal-id (merge proposal (tuple (votes-for (+ (get votes-for proposal) u1)))))
        (map-set proposals proposal-id (merge proposal (tuple (votes-against (+ (get votes-against proposal) u1)))))
      )
      (ok true)
    )
  )
)

;; Execute a passed proposal
(define-public (execute-proposal (proposal-id uint))
  (let ((proposal (unwrap-panic (map-get? proposals proposal-id)))
        (current-time (unwrap-panic (stacks-block-time))))
    (begin
      (asserts! (is-eq (get status proposal) status-active) (err err-proposal-inactive))
      (asserts! (> current-time (get end-time proposal)) (err err-proposal-ended))
      (asserts! (>= (+ (get votes-for proposal) (get votes-against proposal)) minimum-votes) (err err-insufficient-votes))
      (if (> (get votes-for proposal) (get votes-against proposal))
        (begin
          (map-set proposals proposal-id (merge proposal (tuple (status status-passed))))
          (ok true)
        )
        (begin
          (map-set proposals proposal-id (merge proposal (tuple (status status-rejected))))
          (ok false)
        )
      )
    )
  )
)

;; Cancel a proposal (only proposer)
(define-public (cancel-proposal (proposal-id uint))
  (let ((proposal (unwrap-panic (map-get? proposals proposal-id))))
    (begin
      (asserts! (is-eq tx-sender (get proposer proposal)) (err u6))
      (asserts! (is-eq (get status proposal) status-active) (err err-proposal-inactive))
      (map-set proposals proposal-id (merge proposal (tuple (status status-rejected))))
      (ok true)
    )
  )
)

;; Read-only functions
(define-read-only (get-proposal (proposal-id uint))
  (ok (map-get? proposals proposal-id))
)

(define-read-only (get-proposal-counter)
  (ok (var-get proposal-counter))
)

(define-read-only (has-user-voted (proposal-id uint) (user principal))
  (ok (default-to false (map-get? has-voted (tuple (proposal-id proposal-id) (voter user)))))
)

(define-read-only (get-voting-period)
  (ok voting-period)
)

(define-read-only (get-minimum-votes)
  (ok minimum-votes)
)

(define-read-only (get-proposal-status-name (status uint))
  (ok (if (is-eq status status-pending) "pending"
    (if (is-eq status status-active) "active"
      (if (is-eq status status-passed) "passed"
        (if (is-eq status status-rejected) "rejected"
          (if (is-eq status status-executed) "executed" "unknown"
        )
      )
    )
  ))
)
