StripeMarketplaceImplementation.bankAccountSchema = new SimpleSchema({
  country: {
    type: String
  },
  currency: {
    type: String
  },
  routing_number: {
    type: String
  },
  account_number: {
    type: String
  }
});
