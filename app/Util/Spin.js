define(['Spin'],function(Spin){

  var opts = {
    lines: 5, // The number of lines to draw
    length: 40, // The length of each line
    width: 30, // The line thickness
    radius: 30, // The radius of the inner circle
    corners: 1, // Corner roundness (0..1)
    rotate: 54, // The rotation offset
    direction: 1, // 1: clockwise, -1: counterclockwise
    color: '#000', // #rgb or #rrggbb or array of colors
    speed: 1, // Rounds per second
    trail: 100, // Afterglow percentage
    shadow: true, // Whether to render a shadow
    hwaccel: false, // Whether to use hardware acceleration
    className: 'spinner', // The CSS class to assign to the spinner
    zIndex: 2e9, // The z-index (defaults to 2000000000)
    top: '50%', // Top position relative to parent
    left: '50%' // Left position relative to parent
  };

  function Spin_Initialize(options, target){
    var OPTIONS = options || opts;
    return new Spin(OPTIONS).spin(target);
  }

  return Spin_Initialize

});