var Style = require ('./fast-style');

var animateElement = function(eltOrID, animation, delay, duration) {
  var webkit = ['', 'webkit']

  var elt;
  // check if eltOrID is an element or id
  if (typeof eltOrID.innerHTML === 'string') {
    elt = eltOrID
  } else {
    elt = document.getElementById( eltOrID )
  }

  Style.setStyle (elt, 'animation-duration', duration + 's', webkit)
  Style.setStyle (elt, 'animation-delay', delay + 's', webkit)
  Style.setStyle (elt, 'animation-name', animation, webkit)
}

exports = module.exports = animateElement;
