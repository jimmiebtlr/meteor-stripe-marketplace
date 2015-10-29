Meteor.publish('marketplace/userInfo',function(){
  return Market.userInfo.find({userId: this.userId})
})
