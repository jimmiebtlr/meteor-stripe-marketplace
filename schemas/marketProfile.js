/*
 * Market profiles
 *  Type
 *  OnSuccess
 *  OnError
 *  Cost
 */
Market.schemas.profile = new SimpleSchema({
  type: {
    type: String
  },
  onSuccess: {
    type: Function
  },
  onError: {
    type: Function,
    optional: true
  },
  charges: {
    type: Function
  }
});
