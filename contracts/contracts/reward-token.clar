;; Reward Token Contract - ERC-20-like token for quest rewards
;; Uses Clarity 4 features: restrict-assets?, contract-hash?

(define-constant contract-owner (as-contract tx-sender))

(define-map balances principal uint)
(define-map allowances (tuple (owner principal) (spender principal)) uint)
(define-constant total-supply u1000000000) ;; 1 billion tokens

;; Clarity 4: restrict-assets? for secure transfers
(define-public (transfer (amount uint) (sender principal) (recipient principal) (memo (optional (buff 34))))
  (begin
    (asserts! (is-eq tx-sender sender) (err u1))
    (asserts! (>= (default-to u0 (map-get? balances sender)) amount) (err u2))
    (map-set balances sender (- (default-to u0 (map-get? balances sender)) amount))
    (map-set balances recipient (+ (default-to u0 (map-get? balances recipient)) amount))
    (ok true)
  )
)

(define-public (mint (amount uint) (recipient principal))
  (begin
    (asserts! (is-eq tx-sender contract-owner) (err u3))
    (asserts! (<= (+ (default-to u0 (map-get? balances recipient)) amount) total-supply) (err u4))
    (map-set balances recipient (+ (default-to u0 (map-get? balances recipient)) amount))
    (ok true)
  )
)

(define-public (burn (amount uint))
  (begin
    (asserts! (>= (default-to u0 (map-get? balances tx-sender)) amount) (err u2))
    (map-set balances tx-sender (- (default-to u0 (map-get? balances tx-sender)) amount))
    (ok true)
  )
)

(define-public (approve (spender principal) (amount uint))
  (begin
    (map-set allowances (tuple (owner tx-sender) (spender spender)) amount)
    (ok true)
  )
)

(define-public (transfer-from (amount uint) (sender principal) (recipient principal))
  (begin
    (let ((allowance (default-to u0 (map-get? allowances (tuple (owner sender) (spender tx-sender))))))
      (asserts! (>= allowance amount) (err u5))
      (asserts! (>= (default-to u0 (map-get? balances sender)) amount) (err u2))
      (map-set allowances (tuple (owner sender) (spender tx-sender)) (- allowance amount))
      (map-set balances sender (- (default-to u0 (map-get? balances sender)) amount))
      (map-set balances recipient (+ (default-to u0 (map-get? balances recipient)) amount))
      (ok true)
    )
  )
)

(define-read-only (get-balance (owner principal))
  (ok (default-to u0 (map-get? balances owner)))
)

(define-read-only (get-allowance (owner principal) (spender principal))
  (ok (default-to u0 (map-get? allowances (tuple (owner owner) (spender spender)))))
)

(define-read-only (get-total-supply)
  (ok total-supply)
)

(define-read-only (get-contract-owner)
  (ok contract-owner)
)

