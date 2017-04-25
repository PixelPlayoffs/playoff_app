import React from 'react';
import ReactDOM from 'react-dom';
import Voting from './Voting';
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
    let seats = [
      'Artist One',
      'Artist Two'
    ];
    let tally = [
      '98',
      '102'
    ];

    ReactDOM.render(<Voting 
                      videoSource={videoSource} 
                      seats={seats} 
                      tally={tally} />,
    div);
  });

  it ('renders with buttons', () => {
    let seats = [
      'Artist One',
      'Artist Two'
    ];
    let tally = [
      '98',
      '102'
    ];

    const wrapper = renderIntoDocument(<Voting seats={seats} tally={tally} />);
    const buttons = scryRenderedDOMComponentsWithTag(wrapper, 'button');

    expect(buttons.length).toEqual(2);
    expect(buttons[0].textContent).toEqual('Vote for Artist One');
    expect(buttons[1].textContent).toEqual('Vote for Artist Two');
  });

  it ('renders with video', () => {
    let seats = [
      'Artist One',
      'Artist Two'
    ];
    let tally = [
      '98',
      '102'
    ];

    const wrapper = renderIntoDocument(<Voting seats={seats} tally={tally} />);
    const video = findRenderedDOMComponentWithTag(wrapper, 'video');

    expect(video.hasAttribute('id')).toEqual(true);
  });

  it ('renders with tally fields', () => {
    let seats = [
      'Artist One',
      'Artist Two'
    ];
    let tally = [
      '98',
      '102'
    ];

    const wrapper = renderIntoDocument(<Voting seats={seats} tally={tally} />);
    const tallyFields = scryRenderedDOMComponentsWithClass(wrapper, 'tally');

    expect(tallyFields.length).toEqual(4);
    expect(tallyFields[2].textContent).toEqual('98');
    expect(tallyFields[3].textContent).toEqual('102');
  });

  it ('invokes callback when button is clicked', () => {
    let votedWith;
    const vote = (entry) => votedWith = entry;

    let seats = [
      'Artist One',
      'Artist Two'
    ];
    let tally = [
      '98',
      '102'
    ];

    const wrapper = renderIntoDocument(<Voting seats={seats} tally={tally} vote={vote} />);
    const buttons = scryRenderedDOMComponentsWithTag(wrapper, 'button');
    Simulate.click(buttons[0]);

    expect(votedWith).toEqual('Artist One');
  });

  it ('disables buttons when user has voted', () => {
    let seats = [
      'Artist One',
      'Artist Two'
    ];
    let tally = [
      '98',
      '102'
    ];

    const wrapper = renderIntoDocument(<Voting seats={seats} tally={tally} votingDisabled={true} />);
    const buttons = scryRenderedDOMComponentsWithTag(wrapper, 'button');

    expect(buttons.length).toEqual(2);
    expect(buttons[0].hasAttribute('disabled')).toEqual(true);
    expect(buttons[1].hasAttribute('disabled')).toEqual(true);
  });

  it ('renders just the winner when there is one', () => {
    let seats = [
      'Artist One',
      'Artist Two'
    ];
    let tally = [
      '98',
      '102'
    ];
    let win = 'winner';

    const wrapper = renderIntoDocument(<Voting currentRound={win} seats={seats} tally={tally} winner={seats[0]} />);
    
    const buttons = scryRenderedDOMComponentsWithTag(wrapper, 'button');
    expect(buttons.length).toEqual(0);

    const winner = ReactDOM.findDOMNode(wrapper.refs.winner);
    expect(winner.textContent).toContain('Winner is Artist One');
  });

  it ('does update DOM when prop changes', () => {
    const seats = List.of('Artist One', 'Artist Two');
    const tally = List.of('98', '102');
    const container = document.createElement('div');
    let wrapper = ReactDOM.render(<Voting seats={seats} tally={tally} />, container);
    
    let firstButton = scryRenderedDOMComponentsWithTag(wrapper, 'button')[0];
    expect(firstButton.textContent).toEqual('Vote for Artist One');

    const newseats = seats.set(0, 'Artist Three');
    wrapper = ReactDOM.render(<Voting seats={newseats} tally={tally} />, container);

    firstButton = scryRenderedDOMComponentsWithTag(wrapper, 'button')[0];
    expect(firstButton.textContent).toEqual('Vote for Artist Three');
    expect(seats.get(0)).toEqual('Artist One');
  });
});
