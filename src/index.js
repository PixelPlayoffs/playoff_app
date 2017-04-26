import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter as Router, Route} from 'react-router-dom';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import io from 'socket.io-client';
import Reducer from './Reducer';
import * as Actions from './Actions';
import middleware from './middleware';
import {VotingContainer} from './Voting';

const socket = io("http://localhost:8090");

const createStoreWithMiddleware = applyMiddleware(
  middleware(socket)
)(createStore);

const store = createStoreWithMiddleware(
  Reducer.reduce,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

socket.on('state', state =>
  store.dispatch(Actions.setState(state))
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
