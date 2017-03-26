import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter as Router, Route} from 'react-router-dom';
// import App from './App';
import Voting from './Voting';
import Results from './Results';

let props = {
  videoSource: '//amssamples.streaming.mediaservices.windows.net/91492735-c523-432b-ba01-faba6c2206a2/AzureMediaServicesPromo.ism/manifest',
  match: [
    'Artist One',
    'Artist Two'
  ],
  tally: [
    '98',
    '103'
  ]
}

ReactDOM.render(
  <Router>
    <div>
      <Route path="/" render={(props) =>(
        <Voting {...props} />
      )} />
    </div>
  </Router>,
  document.getElementById('root')
);
