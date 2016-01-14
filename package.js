Package.describe({
  summary: 'Stripe market integration for meteor.',
  name: 'jimmiebtlr:stripe-marketplace',
  version: '0.0.1',
  git: 'https://github.com/elevatedevdesign/meteor-stripe-market.git'
});

Package.onUse(function(api) {
  api.versionsFrom('METEOR@1.1.0.2');

  api.use([
    'accounts-base',
    'aldeed:simple-schema@1.3.3',
    'aldeed:collection2@2.3.3',
    'benjick:stripe@4.1.0',
    'peppelg:on-login-logout@1.0.0',
    'elevatedevdesign:autoform-jquery-payments@0.0.5', // Can this be done in the UI package?
    'mongo',
    'ecmascript',
    'underscore',
    'reactive-dict',
    'zimme:collection-timestampable@1.0.9'
  ],['client','server']);

  api.use([
    'gadicohen:headers@0.0.31'
  ],'server');

  api.addFiles([
    'lib/market.js'
  ],['client','server']);

  api.addFiles([
      'schemas/charge.js',
      'schemas/marketProfile.js',
      'schemas/purchaseHistory.js',
      'schemas/userInfo.js',
      'schemas/stripeState.js',
    ],['client','server']
  );

  api.addFiles([
      'client/init.js',
      'client/stripeState.js',
      'client/customer.js',
      'client/account.js',

      // These should only be used on the client so make it so
      'schemas/creditCard.js',
      'schemas/bankAccount.js',
    ],['client']
  );

  api.addFiles([
    'schemas/stripe.js',

    'server/init.js',
    'server/charges.js',
    'server/stripeState.js',
    'server/customer.js',
    'server/account.js',
    'server/purchaseHistory.js',
    'server/userInfo.js',
    ],['server']
  );

  api.export('Market', ['client','server']);
});

Package.onTest(function(api) {
  api.use('sanjo:jasmine@0.17.0');
  api.use('velocity:core');
  api.use('aldeed:simple-schema@1.3.3'),
  api.use('velocity:html-reporter@0.8.2');
  api.use('pstuart2:velocity-notify@0.0.5');
  api.use('accounts-password');
  api.use('jimmiebtlr:stripe-marketplace@0.0.1-rc.1');
  api.use('benjick:stripe@4.1.0');

  api.addFiles([
    'tests/jasmine/server/unit/checkout-spec.js',
    'tests/jasmine/server/unit/charge-spec.js',
    'tests/jasmine/server/unit/purchase-history-spec.js',

    'tests/jasmine/server/integration/stripe/charge-spec.js',
    'tests/jasmine/server/integration/stripe/accounts-spec.js',

    'tests/fixtures.js'
  ], 'server');
});
