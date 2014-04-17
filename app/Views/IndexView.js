define(['hbs!assets/templates/IndexView'],function(indexViewTempl) {


  function render(){
    var div = document.createElement('div');
    div.classList.add('Main');
    div.innerHTML = indexViewTempl();
    document.getElementsByTagName('body')[0].appendChild(div);
  }


  return {
    render:render
  }

});