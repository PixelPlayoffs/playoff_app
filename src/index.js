import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

let videoSource = '//amssamples.streaming.mediaservices.windows.net/91492735-c523-432b-ba01-faba6c2206a2/AzureMediaServicesPromo.ism/manifest';
let match = [
  'Artist One',
  'Artist Two'
];
let tally = [
  '98',
  '103'
];

ReactDOM.render(
  <App 
    videoSource={videoSource} 
    match={match} 
    tally={tally} />,
  document.getElementById('root')
);
