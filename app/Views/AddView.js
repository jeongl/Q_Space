define(function(){

  function render(parameters){
    var appDiv = document.getElementById('AddButton');
    appDiv.innerHTML = '<input id="user-name" /><button id="add">Add this user</button>';
//    console.log(out);
//    appDiv.innerHTML=out;
  }
  return {
    render : render
  }
});