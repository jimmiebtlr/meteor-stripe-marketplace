PurchaseHistoryLineItem = new SimpleSchema({
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

PurchaseHistorySchema = new SimpleSchema({
  charges: {
    type: [PurchaseHistoryLineItem],
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
Market.PurchaseHistory.attachSchema(PurchaseHistorySchema);

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
