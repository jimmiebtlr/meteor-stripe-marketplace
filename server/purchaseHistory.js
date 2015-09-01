Market._publications['market/purchaseHistory'] = function() {
  check(this.userId, String);
  return Market.PurchaseHistory.find({'userId': this.userId});
};
Meteor.publish('market/purchaseHistory',Market._publications['market/purchaseHistory']);

Market._publications['market/salesHistory'] = function() {
  check(this.userId, String);
  return Market.PurchaseHistory.find({'destinationId': this.userId});
};
Meteor.publish('market/salesHistory',Market._publications['market/salesHistory']);
  

Market._publications['market/purchaseHistory/single'] = function(id, type){
  check( this.userId, String);
  check( id, String );
  check( type, String );

  return Market.PurchaseHistory.find({userId: this.userId, charges: {$elemMatch: {itemType: type, itemId: id}}});
}
Meteor.publish('market/purchaseHistory/single',Market._publications['market/purchaseHistory/single']);
