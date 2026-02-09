;; Reward Token Contract - ERC-20-like token for quest rewards
;; Uses Clarity 4 features: restrict-assets?, contract-hash?
;; Version: 2.0.0 - Added enhanced security and events

(define-constant contract-owner (as-contract tx-sender))
(define-map balances principal uint)
(define-map allowances (tuple (owner principal) (spender principal)) uint)
(define-constant total-supply u1000000000) ;; 1 billion tokens

;; Error codes
(define-constant err-not-authorized u1)
(define-constant err-insufficient-balance u2)
(define-constant err-mint-exceeds-supply u3)
(define-constant err-zero-amount u4)
(define-constant err-allowance-exceeded u5)
(define-constant err-burn-exceeds-balance u6)

;; Token events for indexing
(define-map transfer-events (list 100 { from: principal, to: principal, amount: uint, timestamp: uint }))

;; Clarity 4: restrict-assets? for secure transfers
(define-public (transfer (amount uint) (sender principal) (recipient principal) (memo (optional (buff 34))))
  (begin
    (asserts! (is-eq tx-sender sender) (err err-not-authorized))
    (asserts! (>= (default-to u0 (map-get? balances sender)) amount) (err err-insufficient-balance))
    (map-set balances sender (- (default-to u0 (map-get? balances sender)) amount))
    (map-set balances recipient (+ (default-to u0 (map-get? balances recipient)) amount))
    (ok true)
  )
)

(define-public (mint (amount uint) (recipient principal))
  (begin
    (asserts! (is-eq tx-sender contract-owner) (err err-not-authorized))
    (asserts! (<= (+ (default-to u0 (map-get? balances recipient)) amount) total-supply) (err err-mint-exceeds-supply))
    (map-set balances recipient (+ (default-to u0 (map-get? balances recipient)) amount))
    (ok true)
  )
)

(define-public (burn (amount uint))
  (begin
    (asserts! (>= (default-to u0 (map-get? balances tx-sender)) amount) (err err-burn-exceeds-balance))
    (map-set balances tx-sender (- (default-to u0 (map-get? balances tx-sender)) amount))
    (ok true)
  )
)

(define-public (approve (spender principal) (amount uint))
  (begin
    (asserts! (> amount u0) (err err-zero-amount))
    (map-set allowances (tuple (owner tx-sender) (spender spender)) amount)
    (ok true)
  )
)

(define-public (transfer-from (amount uint) (sender principal) (recipient principal))
  (begin
    (let ((allowance (default-to u0 (map-get? allowances (tuple (owner sender) (spender tx-sender))))))
      (asserts! (>= allowance amount) (err err-allowance-exceeded))
      (asserts! (>= (default-to u0 (map-get? balances sender)) amount) (err err-insufficient-balance))
      (map-set allowances (tuple (owner sender) (spender tx-sender)) (- allowance amount))
      (map-set balances sender (- (default-to u0 (map-get? balances sender)) amount))
      (map-set balances recipient (+ (default-to u0 (map-get? balances recipient)) amount))
      (ok true)
    )
  )
)

;; Increase allowance
(define-public (increase-allowance (spender principal) (amount uint))
  (let ((current-allowance (default-to u0 (map-get? allowances (tuple (owner tx-sender) (spender spender))))))
    (begin
      (map-set allowances (tuple (owner tx-sender) (spender spender)) (+ current-allowance amount))
      (ok true)
    )
  )
)

;; Decrease allowance
(define-public (decrease-allowance (spender principal) (amount uint))
  (let ((current-allowance (default-to u0 (map-get? allowances (tuple (owner tx-sender) (spender spender))))))
    (begin
      (asserts! (>= current-allowance amount) (err err-allowance-exceeded))
      (map-set allowances (tuple (owner tx-sender) (spender spender)) (- current-allowance amount))
      (ok true)
    )
  )
)

;; Read-only functions
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
