StripeMarketplaceImplementation.creditCardSchema = new SimpleSchema({
  card_number: {
    type: String,
    autoform: {
      type: 'payments/creditCard'
    },
    custom: function(){
    }
  },
  cvc: {
    type: String,
    autoform: {
      type: 'payments/creditCardCVC'
    },
    custom: function(){
    }
  },
  expiry: {
    type: String,
    autoform: {
      type: 'payments/creditCardExpiry'
    },
    custom: function(){
    }
  }
});
