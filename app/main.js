require.config({
  paths: {
    hbs: '../lib/require-handlebars-plugin/hbs',
    Two: '../bower_components/two/build/two',
    Spin: '../bower_components/spin.js/spin',
    jquery: '../bower_components/jquery/dist/jquery.min'
  }
}),
require(['Controllers/QuoteCollectionController',
'Controllers/IndexViewController', 'Routers/Routes'],

  function(QuoteCollectionController, IndexViewController, Router){
    Router.startRouting();
    //Todo - add callback
    // Router.startRouting(function(){

    // });
    console.log('Routing started: ');
  });