;; Governance Helper Contract
;; Utility functions for governance operations

(define-constant voting-period u1000)
(define-constant minimum-votes u10)

(define-read-only (get-voting-period)
  (ok voting-period)
)

(define-read-only (get-minimum-votes)
  (ok minimum-votes)
)
