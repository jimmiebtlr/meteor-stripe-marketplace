var stripeStateSchema = new SimpleSchema({
  userId: {
    type: SimpleSchema.RegEx.ID
  },
  accountId: {
    type: SimpleSchema.RegEx.ID,
    optional: true
  },
  customerId: {
    type: SimpleSchema.RegEx.ID,
    optional: true
  },
  fieldsNeeded: {
    type: [String],
    defaultValue: []
  },
  fieldsNeededBy: {
    type: Date,
    optional: true
  },
  activeCreditCard: {
    type: Boolean,
    defaultValue: false
  }
});

StripeMarketplaceImplementation.prototype._stateCollection = new Mongo.Collection("stripeMarketplaceState");
StripeMarketplaceImplementation.prototype._stateCollection.attachSchema( stripeStateSchema );
