Meteor.publish('market/purchaseHistory',function() {
  check(this.userId, String);
  return Market.PurchaseHistory.find({'userId': this.userId});
});
