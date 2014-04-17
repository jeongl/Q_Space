require.config({
  paths: {
    hbs: '../lib/require-handlebars-plugin/hbs'
  }
}),
require(['Controllers/QuoteCollectionController'],
  function(QuoteCollectionController){

//    var users = [new User('Barney'),
//      new User('Cartman'),
//      new User('Sheldon')];
//
//    console.log('stringify',JSON.stringify(users));
//    localStorage.users = JSON.stringify(users);

    QuoteCollectionController.start();
});