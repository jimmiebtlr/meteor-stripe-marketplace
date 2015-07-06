Meteor.publish("marketplace/state",function(){
  return StripeState.find({'userId': this.userId});
});
