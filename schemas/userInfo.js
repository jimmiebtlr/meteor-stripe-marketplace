var countries = [
  'AT',
  'AU',
  'BE',
  'CA',
  'CH',
  'DE',
  'DK',
  'ES',
  'FI',
  'FR',
  'GB',
  'IE',
  'IT',
  'JP',
  'LU',
  'MX',
  'NL',
  'NO',
  'SE',
  'SG',
  'US'
];


var fields = {
  country: {
    type: String,
    allowedValues: countries,
    defaultValue: 'US'
  },
  first_name: {
    type: String
  },
  last_name: {
    type: String
  },
  dob: {
    type: Date
  }
}


Market.userInfo = new Mongo.Collection('marketplace/user-info')

if( Meteor.isServer ){
  Market.userInfo._ensureIndex({userId: 1},{unique: true})
}

var schemaFields = {};
_.each(fields, function(val, k){
  schemaFields[k] = _.extend({optional: true},val);
})

schemaFields['userId'] = {
  type: SimpleSchema.RegEx.Id,
  autoValue: function(){
    if( this.isInsert && !this.fromTrustedCode ){
      return Meteor.userId()
    }else{
      this.unset();
    }
  }
}
Market.userInfo.attachSchema(schemaFields)
Market.userInfo.fields = fields

Market.userInfo.allow({
  insert( userId, doc ){
    return userId === doc.userId;
  },
  update(userId, doc, fields, modifier ){
    if(
       _.contains(fields,'userId') ||
       _.keys(modifier).length > 1 ||
       !modifier.$set
      ){
      return false
    }
    return userId === doc.userId;
  },
  remove(){ return false; }
});

if( Meteor.isServer ){
  let updateAccount = function( userId, doc ){
    let state = Market._stateCollection.findOne({'userId': userId})
    if( state ){
      let dob = moment.utc( doc.dob )
      doc.dob = {}
      doc.dob.day = dob.format("DD")
      doc.dob.month = dob.format("MM")
      doc.dob.year = dob.format("YYYY")
      console.log( _.omit(doc,'userId','_id','country') )
      Stripe.accounts.update(
        state.accountId, {
          legal_entity: _.omit(doc,'userId','_id','country')
        }
      )
    }else{
      console.error( "Stripe state for updated record not found" )
    }
  }

  Market.userInfo.after.insert((userId, doc) => {
    updateAccount( userId, doc );
  })
  Market.userInfo.after.update((userId, doc) => {
    updateAccount( userId, doc );
  })
}
