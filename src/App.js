import React, { Component } from 'react';

let videoSource = '//amssamples.streaming.mediaservices.windows.net/91492735-c523-432b-ba01-faba6c2206a2/AzureMediaServicesPromo.ism/manifest';
let match = [
  'Artist One',
  'Artist Two'
];
let tally = [
  '98',
  '103'
];

class App extends Component {
    render() {
        return React.cloneElement(this.props.children, {match: match, videoSource: videoSource, tally: tally});
    }
}

export default App;
