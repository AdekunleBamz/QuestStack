;; Staking Helper Contract
;; Utility functions for staking operations

(define-constant minimum-stake u1000000)

(define-read-only (get-minimum-stake)
  (ok minimum-stake)
)

(define-read-only (calc-reward (amount uint) (blocks uint))
  (/ (* amount u100 blocks) u10000)
)
