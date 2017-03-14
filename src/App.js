import React, { Component } from 'react';
import * as bs from 'react-bootstrap';
import './App.css';
import Voting from './Voting';
import Winner from './Winner';

class App extends Component {
  getVideoSource() {
      const tmpSource = '//amssamples.streaming.mediaservices.windows.net/91492735-c523-432b-ba01-faba6c2206a2/AzureMediaServicesPromo.ism/manifest';
      return this.props.videoSource || tmpSource;
  }
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
        myPlayer.src([{ src: "` + this.getVideoSource() + `", type: "application/vnd.ms-sstr+xml" }, ]);
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

            <div className="tally col-md-5">
              <h4>{this.props.match[0]} Tally</h4>
              <span>{this.props.tally[0]}</span>
            </div>

            <div className="tally col-md-5">
              <h4>{this.props.match[1]} Tally</h4>
              <span>{this.props.tally[1]}</span>
            </div>

            <div className="col-md-1">
            </div>
          </div>
          <p>&nbsp;</p>

          <bs.Jumbotron>
            <video id="azuremediaplayer" className="center azuremediaplayer amp-default-skin amp-big-play-centered" tabIndex="0"> </video>
          </bs.Jumbotron>

          {this.props.winner ?
            <Winner ref="winner" winner={this.props.winner} /> :
            <Voting {...this.props} />
          }
          
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
