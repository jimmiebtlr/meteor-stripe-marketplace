Meteor.publish("marketplace/state",function(){
  return Market._stateCollection.find({'userId': this.userId},{fields: {'customerId': 0, 'accountId': 0}});
});
