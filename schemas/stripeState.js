SimpleSchema.debug = true;

Market.schemas.stripeStateSchema = new SimpleSchema({
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
  tosAcceptance: {
    type: Boolean,
    defaultValue: false
  },
  activeCreditCard: {
    type: Boolean,
    defaultValue: false
  }
});

Market._stateCollection = new Mongo.Collection("stripeMarketplaceState");
Market._stateCollection.attachSchema( Market.schemas.stripeStateSchema );
