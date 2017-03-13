import React, { Component } from 'react';
import * as bs from 'react-bootstrap';
import './App.css';

class App extends Component {
  componentDidMount() {
    const script = document.createElement("script");
    script.text = `
      (function(){
      var myOptions = {
            autoplay: false,
            controls: true,
            width: "480",
            height: "270",
            poster: ""
        };
        var myPlayer = amp("azuremediaplayer", myOptions);
        myPlayer.src([{ src: "` + this.props.videoSource + `", type: "application/vnd.ms-sstr+xml" }, ]);
    })();
    `
    document.body.appendChild(script);
  }
  render() {
    return (
      <div className="App">
        <bs.Grid>
          <div className="header clearfix">
            <bs.Nav bsStyle="pills" className="pull-right">
              <bs.NavItem href="./signin.html" role="presentation">Battle Board</bs.NavItem>
            </bs.Nav>
            <h3 className="text-muted">Battle Voting</h3>
          </div>

          <div className="row">
            <div className="col-md-1">
            </div>

            <div className="col-md-5">
              <h4>{this.props.match[0]} Tally</h4>
              <span>{this.props.tally[0]}</span>
            </div>

            <div className="col-md-1">
            </div>

            <div className="col-md-5">
              <h4>{this.props.match[1]} Tally</h4>
              <span>{this.props.tally[1]}</span>
            </div>
          </div>
          <p>&nbsp;</p>

          <bs.Jumbotron>
            <video id="azuremediaplayer" className="center azuremediaplayer amp-default-skin amp-big-play-centered" tabIndex="0"> </video>
          </bs.Jumbotron>

          <div className="row">
            <div className="col-md-1">
            </div>

            <div className="col-md-5">
              <bs.Button className="btn btn-primary btn-lg" type="submit">Vote for {this.props.match[0]}</bs.Button>
            </div>

            <div className="col-md-1">
            </div>

            <div className="col-md-5">
              <bs.Button className="btn btn-primary btn-lg" type="submit">Vote for {this.props.match[1]}</bs.Button>
            </div>
          </div>

          <p>&nbsp;</p>

          <footer className="footer">
            <p>&copy; 2017 Pixel Playoffs, LLC</p>
          </footer>
        </bs.Grid>
      </div>
    );
  }
}

export default App;
