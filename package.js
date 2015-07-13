Package.describe({
    summary: "Stripe marketplace integration for meteor.",
    name: "elevatedevdesign:stripe-marketplace",
  	version: "0.0.1-rc.1",
    git: "https://github.com/elevatedevdesign/meteor-stripe-marketplace.git"
});

Package.on_use(function (api) {
	api.versionsFrom("METEOR@1.1.0.2");
	
  api.use([
    "accounts-base",
    'aldeed:simple-schema@1.3.3',
    'aldeed:collection2@2.3.3',
    'benjick:stripe@3.3.4',
    'jeffpatzer:jquery-payment@0.0.5',
    'peppelg:on-login-logout@1.0.0',
    'elevatedevdesign:autoform-jquery-payments@0.0.5',
    'mongo',
    'underscore',
    'reactive-dict'
  ],['client','server']);
 

  api.add_files([
      'marketBase.js',
      'stripeState.js',
      'schemas/charge.js',
      'schemas/marketProfile.js'
    ],['client','server']
  );
  
  api.add_files([
      'client/init.js',
      'client/stripeState.js',
      'schemas/creditCard.js',
      'schemas/bankAccount.js',
      'client/customer.js',
      'client/account.js',
    ],['client']
  );
  
  api.add_files([
    'server/init.js',
    'server/charges.js',
    'server/stripeState.js',
    'server/customer.js',
    ],['server']
  );
  
  api.add_files([
      'expose.js'
    ],['client','server']
  );

  api.export('Market', ['client','server']);
});

Package.onTest(function(api) {
  api.use('sanjo:jasmine@0.14.0');
  api.use('velocity:core');
  api.use('velocity:html-reporter@0.6.2');
  api.use('pstuart2:velocity-notify@0.0.5');
  api.use('accounts-password');
  api.use('elevatedevdesign:stripe-marketplace@0.0.1-rc.1');
  api.addFiles(['tests/jasmine/server/unit/checkout-spec.js'], 'server');
  api.addFiles(['tests/jasmine/server/unit/charge-spec.js'], 'server');
  api.addFiles(['tests/jasmine/server/integration/charge-spec.js'], 'server');
  api.addFiles(['tests/fixtures.js'], 'server');
});
