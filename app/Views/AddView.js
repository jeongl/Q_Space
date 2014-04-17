define(function(){

  function render(parameters){
    var appDiv = document.getElementById('app');
    var out = '<input id="user-name" /><button id="add">Add this user</button>';
    appDiv.innerHTML+=out;
  }
  return {
    render : render
  }

});