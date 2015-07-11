var Future = Npm.require('fibers/future');
 
resetDatabase = function () {
  //console.log('Resetting database');
  var fut = new Future();
 
  var collectionsRemoved = 0;
  var db = MongoInternals.defaultRemoteCollectionDriver().mongo.db;
  db.collections(function (err, collections) {
 
    var appCollections = _.reject(collections, function (col) {
      return col.collectionName.indexOf('velocity') === 0 ||
        col.collectionName === 'system.indexes';
    });
 
    if (appCollections.length > 0) {
      _.each(appCollections, function (appCollection) {
        appCollection.remove(function (e) {
          if (e) {
            //console.error('Failed removing collection', e);
            fut.return('fail: ' + e);
          }
          collectionsRemoved++;
          //console.log('Removed collection');
          if (appCollections.length === collectionsRemoved) {
            //console.log('Finished resetting database');
            fut['return']('success');
          }
        });
      });
    } else {
      //console.log('No collections found. No need to reset anything.');
      fut['return']('success');
    }
 
  });
 
  return fut.wait();
};

beforeEach(function(){
  resetDatabase();
});
