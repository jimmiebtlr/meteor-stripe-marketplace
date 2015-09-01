Market.schemas.PurchaseHistoryLineItem = new SimpleSchema({
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
  },
  itemType: {
    type: String
  },
  itemId: {
    type: SimpleSchema.RegEx.ID
  },
  purchaseStatus: {
    type: String,
    allowedValues: ['Error', 'Success'],
    optional: true
  },
  stripeChargeId: {
    type: String,
    optional: true
  }
});

Market.schemas.PurchaseHistorySchema = new SimpleSchema({
  charges: {
    type: [Market.schemas.PurchaseHistoryLineItem],
    defaultValue: []
  },
  total: {
    type: Number
  },
  userId: {
    type: SimpleSchema.RegEx.ID
  }
});

Market.PurchaseHistory = new Mongo.Collection('purchaseHistory');
Market.PurchaseHistory.attachSchema(Market.schemas.PurchaseHistorySchema);
Market.PurchaseHistory.attachBehaviour('timestampable');

Market.PurchaseHistory.purchased = function(userId, type, id) {
  var purchased = !!Market.PurchaseHistory.findOne({
    userId: userId,
    charges: {
      $elemMatch: {
        itemType: type,
        itemId: id
      }
    }
  });
  return purchased;
};
