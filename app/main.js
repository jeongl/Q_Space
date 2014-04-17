require.config({
  paths: {
    hbs: '../lib/require-handlebars-plugin/hbs'
  }
}),
require(['Controllers/QuoteCollectionController',
  'Controllers/IndexViewController', 'Routers/Routes'],
  function(QuoteCollectionController, IndexViewController, Router){
    Router.startRouting();

  });