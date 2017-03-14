import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {List} from 'immutable';
import {
  renderIntoDocument,
  scryRenderedDOMComponentsWithTag,
  findRenderedDOMComponentWithTag,
  scryRenderedDOMComponentsWithClass,
  Simulate
} from 'react-addons-test-utils';

describe('Voting', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');

    let videoSource = '//amssamples.streaming.mediaservices.windows.net/91492735-c523-432b-ba01-faba6c2206a2/AzureMediaServicesPromo.ism/manifest';
    let match = [
      'Artist One',
      'Artist Two'
    ];
    let tally = [
      '98',
      '102'
    ];

    ReactDOM.render(<App 
                      videoSource={videoSource} 
                      match={match} 
                      tally={tally} />,
    div);
  });

  it ('renders with buttons', () => {
    let match = [
      'Artist One',
      'Artist Two'
    ];
    let tally = [
      '98',
      '102'
    ];

    const wrapper = renderIntoDocument(<App match={match} tally={tally} />);
    const buttons = scryRenderedDOMComponentsWithTag(wrapper, 'button');

    expect(buttons.length).toEqual(2);
    expect(buttons[0].textContent).toEqual('Vote for Artist One');
    expect(buttons[1].textContent).toEqual('Vote for Artist Two');
  });

  it ('renders with video', () => {
    let match = [
      'Artist One',
      'Artist Two'
    ];
    let tally = [
      '98',
      '102'
    ];

    const wrapper = renderIntoDocument(<App match={match} tally={tally} />);
    const video = findRenderedDOMComponentWithTag(wrapper, 'video');

    expect(video.hasAttribute('id')).toEqual(true);
  });

  it ('renders with tally fields', () => {
    let match = [
      'Artist One',
      'Artist Two'
    ];
    let tally = [
      '98',
      '102'
    ];

    const wrapper = renderIntoDocument(<App match={match} tally={tally} />);
    const tallyFields = scryRenderedDOMComponentsWithClass(wrapper, 'tally');

    expect(tallyFields.length).toEqual(2);
    expect(tallyFields[0].textContent).toEqual('Artist One Tally98');
    expect(tallyFields[1].textContent).toEqual('Artist Two Tally102');
  });

  it ('invokes callback when button is clicked', () => {
    let votedWith;
    const vote = (entry) => votedWith = entry;

    let match = [
      'Artist One',
      'Artist Two'
    ];
    let tally = [
      '98',
      '102'
    ];

    const wrapper = renderIntoDocument(<App match={match} tally={tally} vote={vote} />);
    const buttons = scryRenderedDOMComponentsWithTag(wrapper, 'button');
    Simulate.click(buttons[0]);

    expect(votedWith).toEqual('Artist One');
  });

  it ('disables buttons when user has voted', () => {
    let match = [
      'Artist One',
      'Artist Two'
    ];
    let tally = [
      '98',
      '102'
    ];

    const wrapper = renderIntoDocument(<App match={match} tally={tally} votingDisabled={true} />);
    const buttons = scryRenderedDOMComponentsWithTag(wrapper, 'button');

    expect(buttons.length).toEqual(2);
    expect(buttons[0].hasAttribute('disabled')).toEqual(true);
    expect(buttons[1].hasAttribute('disabled')).toEqual(true);
  });

  it ('renders just the winner when there is one', () => {
    let match = [
      'Artist One',
      'Artist Two'
    ];
    let tally = [
      '98',
      '102'
    ];

    const wrapper = renderIntoDocument(<App match={match} tally={tally} winner={match[0]} />);
    
    const buttons = scryRenderedDOMComponentsWithTag(wrapper, 'button');
    expect(buttons.length).toEqual(0);

    const winner = ReactDOM.findDOMNode(wrapper.refs.winner);
    expect(winner.textContent).toContain('Winner is Artist One');
  });

  it ('does update DOM when prop changes', () => {
    const match = List.of('Artist One', 'Artist Two');
    const tally = List.of('98', '102');
    const container = document.createElement('div');
    let wrapper = ReactDOM.render(<App match={match} tally={tally} />, container);
    
    let firstButton = scryRenderedDOMComponentsWithTag(wrapper, 'button')[0];
    expect(firstButton.textContent).toEqual('Vote for Artist One');

    const newMatch = match.set(0, 'Artist Three');
    wrapper = ReactDOM.render(<App match={newMatch} tally={tally} />, container);

    firstButton = scryRenderedDOMComponentsWithTag(wrapper, 'button')[0];
    expect(firstButton.textContent).toEqual('Vote for Artist Three');
    expect(match.get(0)).toEqual('Artist One');
  });
});
