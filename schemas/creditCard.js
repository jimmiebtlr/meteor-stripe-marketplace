StripeMarketplaceImplementation.prototype.creditCardSchema = new SimpleSchema({
  number: {
    type: String,
    label: "Card Number",
    autoform: {
      type: 'payments/creditCard'
    },
    custom: PaymentsHelpers.CreditCardValidation 
  },
  cvc: {
    type: String,
    autoform: {
      type: 'payments/creditCardCVC'
    },
    custom: PaymentsHelpers.CVCValidation 
  },
  expiry: {
    type: String,
    autoform: {
      type: 'payments/creditCardExpiry',
      placeholder: "MM / YY"
    },
    custom: PaymentsHelpers.CCExpiryValidation 
  }
});
