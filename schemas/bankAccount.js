Market.schemas.bankAccount = new SimpleSchema({
  country: {
    type: String,
    defaultValue: "US"
  },
  currency: {
    type: String,
    defaultValue: "usd"
  },
  routing_number: {
    type: String
  },
  account_number: {
    type: String
  }
});
