Market.schemas.stripeCharge = new SimpleSchema({
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


Market.schemas.stripeTOS = new SimpleSchema({
  date: {
    type: Number
  },
  ip: {
    type: SimpleSchema.RegEx.IP
  },
  user_agent: {
    type: String
  }
});

Market._fieldsNeededDefinitions = {
  first_name: {
    type: String
  },
  last_name: {
    type: String
  },
  dob_hash: {
    type: String
  },
  personal_id_number: {
    type: String
  },
  ssn_last_4: {
    type: String
  }
};
