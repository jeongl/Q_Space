define(['Views/ListView'], function(ListView){

  function start(){
    console.log('Start List Controller!');
    var users = JSON.parse(localStorage.users);
    console.log('users', users);
    ListView.render({users:users});
  }

  return {
    start : start
  }

});