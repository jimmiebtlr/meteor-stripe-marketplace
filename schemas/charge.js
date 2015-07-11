/* 
 * Checkout
 * Params
 *   Expected Amount
 *   ID
 *   Type
 */
StripeMarketplaceImplementation.prototype._schemas.charge = new SimpleSchema({
  userId: {  // USer Id of the person getting charged
    type: SimpleSchema.RegEx.ID
  },
  destinationId: {  // UserId of the person who is receiving the credit
    type: SimpleSchema.RegEx.ID
  },
  amount: {  // Total cost to user, including stripe fee, application fee, and any other fees involved
    type: Number,
    min: 0
  },
  applicationFee: {
    type: Number,
    optional: true,
    min: 0
  }
});


StripeMarketplaceImplementation.prototype._schemas.stripeCharge = new SimpleSchema({
  customer: {  // USer Id of the person getting charged
    type: String
  },
  destination: {  // UserId of the person who is receiving the credit
    type: SimpleSchema.RegEx.ID
  },
  amount: {  // Total cost to user, including stripe fee, application fee, and any other fees involved
    type: Number,
    min: 0
  },
  application_fee: {
    type: Number,
    optional: true,
    min: 0
  },
  currency: {
    type: String
  }
});
