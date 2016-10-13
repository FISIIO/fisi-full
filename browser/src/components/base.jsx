var React              = require('react');
var ReactDOM           = require('react-dom');
var Splash             = require('./splash');
var DescriptionDisplay = require('./description-display');
var MapDisplay         = require('./map-display.jsx');
var Scroll             = require('../lib/scroll');
var $                  = require ('jquery');

require('../styles/style.base.scss');

$(document).ready( function() {

  var splashContainer = $( '#splash-section' )[0];
  ReactDOM.render(<Splash/>, splashContainer);

  var splashSection = new Scroll.Section('splash-section', Splash.animate, Splash.reset);
  var aboutSection  = new Scroll.Section('about-section', DescriptionDisplay.animate);

  Scroll.add( splashSection );
  Scroll.add( aboutSection );

  Scroll.addKeyListener();
  Scroll.switchSection( splashSection );

  var mapContainerProps = { latitude: 42.273909, longitude: -83.725786 };

  ReactDOM.render(<DescriptionDisplay />, document.getElementById ('description-container'));
  ReactDOM.render(<MapDisplay { ...mapContainerProps} />, document.getElementById('location-container'));

})
