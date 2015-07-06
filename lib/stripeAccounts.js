StripeMarketplaceImplementation.prototype._schemas.stripeState = new SimpleSchema({
  userId: {
    type: SimpleSchema.RegEx.ID
  },
  accountId: {
    type: SimpleSchema.RegEx.ID
  },
  customerId: {
    type: SimpleSchema.RegEx.ID
  },
  fieldsNeeded: {
    type: [String],
    defaultValue: []
  },
  fieldsNeededBy: {
    type: Date,
    optional: true
  }
});

Meteor.startup(function(){
  StripeState = new Mongo.collection("stripeMarketplaceState");
  StripeState.attachSchema( Market._schemas.stripeState );
});
