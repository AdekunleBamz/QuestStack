;; Staking Contract - Users stake tokens to unlock premium quests
;; Uses Clarity 4 features: contract-hash?, restrict-assets?
;; Version: 2.0.0 - Added enhanced features and validation

(define-constant contract-owner (as-contract tx-sender))
(define-constant reward-token-contract (unwrap-panic (contract-of? .reward-token)))
(define-constant minimum-stake u1000000) ;; 1 token (6 decimals)

;; Error codes
(define-constant err-below-minimum u1)
(define-constant err-insufficient-balance u2)
(define-constant err-no-stake u3)
(define-constant err-zero-amount u4)
(define-constant err-reward-zero u5)
(define-constant err-not-owner u6)

;; Staking data
(define-map stakes principal uint)
(define-map staking-rewards principal uint)
(define-map stake-timestamps principal uint)
(define-constant reward-rate u100) ;; 1% per block

;; Enhanced stake tracking
(define-map stake-history principal (list 100 { amount: uint, timestamp: uint, type: (string-ascii 10) }))

;; Clarity 4: contract-hash? to verify reward token contract
(define-read-only (verify-token-contract)
  (contract-hash? reward-token-contract)
)

;; Stake tokens with enhanced tracking
(define-public (stake (amount uint))
  (let ((current-stake (default-to u0 (map-get? stakes tx-sender)))
        (current-time (unwrap-panic (stacks-block-time))))
    (begin
      (asserts! (> amount u0) (err err-zero-amount))
      (asserts! (>= amount minimum-stake) (err err-below-minimum))
      (try! (contract-call? reward-token-contract transfer-from amount tx-sender (as-contract tx-sender)))
      (map-set stakes tx-sender (+ current-stake amount))
      (map-set stake-timestamps tx-sender current-time)
      ;; Track stake history
      (map-set stake-history tx-sender 
        (unwrap-panic (as-max-len? 
          (append (default-to () (map-get? stake-history tx-sender)) 
            { amount: amount, timestamp: current-time, type: "stake" })
          u100)
      ))
      (ok true)
    )
  )
)

;; Unstake tokens
(define-public (unstake (amount uint))
  (let ((current-stake (default-to u0 (map-get? stakes tx-sender))))
    (begin
      (asserts! (> amount u0) (err err-zero-amount))
      (asserts! (>= current-stake amount) (err err-insufficient-balance))
      (try! (contract-call? reward-token-contract transfer amount (as-contract tx-sender) tx-sender))
      (map-set stakes tx-sender (- current-stake amount))
      (ok true)
    )
  )
)

;; Calculate and claim staking rewards
(define-public (claim-staking-rewards)
  (let ((staked-amount (default-to u0 (map-get? stakes tx-sender)))
        (stake-time (default-to u0 (map-get? stake-timestamps tx-sender)))
        (current-time (unwrap-panic (stacks-block-time))))
    (if (and (> staked-amount u0) (> stake-time u0))
      (let ((time-diff (- current-time stake-time))
            (rewards (/ (* staked-amount reward-rate time-diff) u10000)))
        (begin
          (if (> rewards u0)
            (begin
              (try! (contract-call? reward-token-contract mint rewards tx-sender))
              (map-set stake-timestamps tx-sender current-time)
              (ok rewards)
            )
            (ok u0)
          )
        )
      )
      (ok u0)
    )
  )
)

;; Auto-compound rewards
(define-public (compound-rewards)
  (let ((rewards (claim-staking-rewards)))
    (if (> rewards u0)
      (stake rewards)
      (ok false)
    )
  )
)

;; Check if user has enough stake for premium quests
(define-read-only (has-premium-access (user principal))
  (ok (>= (default-to u0 (map-get? stakes user)) minimum-stake))
)

;; Get user's staked amount
(define-read-only (get-stake (user principal))
  (ok (default-to u0 (map-get? stakes user)))
)

;; Get staking rewards for user
(define-read-only (get-staking-rewards (user principal))
  (let ((staked-amount (default-to u0 (map-get? stakes user)))
        (stake-time (default-to u0 (map-get? stake-timestamps user)))
        (current-time (unwrap-panic (stacks-block-time))))
    (if (and (> staked-amount u0) (> stake-time u0))
      (let ((time-diff (- current-time stake-time)))
        (ok (/ (* staked-amount reward-rate time-diff) u10000))
      )
      (ok u0)
    )
  )
)

;; Get stake history
(define-read-only (get-stake-history (user principal))
  (ok (default-to () (map-get? stake-history user)))
)

;; Get minimum stake amount
(define-read-only (get-minimum-stake)
  (ok minimum-stake)
)
