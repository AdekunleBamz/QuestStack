;; Token Helper Contract
;; Utility functions for token operations

(define-read-only (get-token-name)
  (ok "QuestStack Token")
)

(define-read-only (get-token-symbol)
  (ok "QST")
)

(define-read-only (get-token-decimals)
  (ok u6)
)

(define-read-only (get-total-supply)
  (ok u1000000000)
)
