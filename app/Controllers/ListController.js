define(['Views/ListView'], function(ListView){

  function start(){
    console.log('Start List Controller!');
    var users = JSON.parse(localStorage.users);
    ListView.render({users:users});
  }

  return {
    start : start
  }

});