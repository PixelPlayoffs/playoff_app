import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter as Router, Route} from 'react-router-dom';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import io from 'socket.io-client';
import {Map, List} from 'immutable';
import Reducer from './Reducer';
import {setState} from './Actions';
import middleware from './middleware';
import {VotingContainer} from './Voting';

const socket = io(`${location.protocol}//${location.hostname}:8090`);

socket.on('state', state => 
  store.dispatch(setState(state))
);

const createStoreWithMiddleware = applyMiddleware(
  middleware(socket)
)(createStore);

const store = createStoreWithMiddleware(
  Reducer.reduce,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <div>
        <Route path="/" component={VotingContainer} />
      </div>
    </Router>
  </Provider>,
  document.getElementById('root')
);

/* store.dispatch({type: 'SET_SEATS', state: Map({
//         vote: Map({
//             seats: List.of('Artist One', 'Artist Two'),
//             tally: Map({'Artist One': 1, 'Artist Two': 2})
//         }),
//         videoSource: '//amssamples.streaming.mediaservices.windows.net/91492735-c523-432b-ba01-faba6c2206a2/AzureMediaServicesPromo.ism/manifest',
//         currentRound: 'quarterFinals'
//     })
// });

// let props = {
//   videoSource: '',
//   seats: [
//     'Artist One',
//     'Artist Two'
//   ],
//   tally: [
//     '98',
//     '103'
//   ]
// }

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <div>
        <Route path="/" render={(props) =>(
          <Voting {...props} />
        )} />
      </div>
    </Router>
  </Provider>,
  document.getElementById('root')
); */
