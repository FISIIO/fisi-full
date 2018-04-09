var React          = require('react');
var ReactDOM       = require('react-dom');
var $              = require('jquery');
var animateElement = require('../lib/animateElement')

require ('../styles/description-display-style.scss');

class DescriptionDisplay extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      nextEventDisplay: 'TBA'
    }
  }

  static animate() {
    $( '#info' ).css("opacity", "0")
    var rects = $( 'rect' )
    var length = $( 'rect' ).length
    var baseDelay = .1
    var offsetDelay = .05
    var duration = 1.2
    for(var i = 0; i < length; ++i){
      var delay = baseDelay + (offsetDelay * i);
      animateElement(rects[i], "zoom-in", delay, duration)
    }
    var contentDelay = baseDelay + (offsetDelay * length) + duration
    animateElement("stripes", "fade-out", contentDelay, .8)
    contentDelay += .4
    animateElement("info", "fade-in", contentDelay, .8)
  }

  componentDidMount() {
    return this.setState({
      nextEventDisplay: `04•12•18`
    })
    this.serverRequest = $.get('/api/events', (result) => {
      if (result.length) {
        let nextEvent = new Date(result[0].start_time);
        let month = nextEvent.getMonth() + 1;
        let day   = nextEvent.getDate();
        let year  = nextEvent.getFullYear().toString().slice(2);
        this.setState({
          nextEventDisplay: `${month}•${day}•${year}`
        })
      }
    })
  }

  componentWillUnmount() {
    this.serverRequest.abort();
  }

  render() {
    return (
      <div className="description-display">
        <div className="head">
          <div className="left-side">
            <h1>Fuck it<br/>Ship it</h1>
            <div id="border" className="border"></div>
          </div>
          <div className="content">
            <svg id="stripes" className="stripes" viewBox="0 0 1128 400" preserveAspectRatio="xMidYMid slice">
              <rect y="16"  width="1128" height="16"/>
              <rect y="48"  width="1128" height="16"/>
              <rect y="80"  width="1128" height="16"/>
              <rect y="112" width="1128" height="16"/>
              <rect y="144" width="1128" height="16"/>
              <rect y="176" width="1128" height="16"/>
              <rect y="208" width="1128" height="16"/>
              <rect y="240" width="1128" height="16"/>
              <rect y="272" width="1128" height="16"/>
              <rect y="304" width="1128" height="16"/>
              <rect y="336" width="1128" height="16"/>
              <rect y="368" width="1128" height="16"/>
            </svg>
            <div id="info" className="info">
              <p>Drop the school work and day job for a few hours.&nbsp; Share your crazy ideas, whimsical passions, and new projects</p>
            </div>
          </div>
        </div>
        <div className="actionables">
          <div className="left-side">
            <div className="date">
              <h3>Thursday</h3>
              <h3>{ this.state.nextEventDisplay }</h3>
            </div>
          </div>
          <div className="tagline">
            <h2>Make some noise. <b>Fuck it Ship It</b> is back</h2>
          </div>
        </div>
      </div>
    )
  }
}

module.exports = DescriptionDisplay;
