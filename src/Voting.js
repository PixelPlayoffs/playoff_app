import React, { Component } from 'react';
import * as bs from 'react-bootstrap';
import {connect} from 'react-redux';
import './Voting.css';
import Vote from './Vote';
import Winner from './Winner';
import logo from './logo.png';
import * as actions from './Actions';

class Voting extends Component {
  getMatchSeats() {
      return this.props.seats || [];
  }
  getMatchTallys() {
      return this.props.tally || [];
  }
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
            <img src={logo} className="App-logo" alt="logo" height="45" width="450" />
          </div>

          <div className="row">
            <div className="col-md-1">
            </div>

          {this.getMatchSeats().map(entry =>
            <div key={entry} className="tally col-md-5">
              <h4 key={entry}>{entry} Tally</h4>
            </div>
          )}

          <div className="col-md-1">
            </div>
          </div>

          <div className="row">
            <div className="col-md-1">
            </div>

          {this.getMatchTallys().map(entry =>
            <div key={entry} className="tally col-md-5">
              <h4 key={entry}>{entry}</h4>
            </div>
          )}

          <div className="col-md-1">
            </div>
          </div>
          <p>&nbsp;</p>

          <bs.Jumbotron>
            <video id="azuremediaplayer" className="center azuremediaplayer amp-default-skin amp-big-play-centered" tabIndex="0"> </video>
          </bs.Jumbotron>

          {this.props.winner ?
            <Winner ref="winner" winner={this.props.winner} /> :
            <Vote {...this.props} />
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

function mapStateToProps(state) {
  return {
    seats: state.getIn(['vote', 'seats']),
    winner: state.get('winner'),
    tally: state.getIn(['vote', 'tally']),
    videoSource: state.get('videoSource')
  };
}

export const VotingContainer = connect(mapStateToProps, actions)(Voting);

export default Voting;
