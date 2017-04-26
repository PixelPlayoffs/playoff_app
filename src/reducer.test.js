import {List, Map, fromJS} from 'immutable';
import Reducer from './Reducer';
import Tournament from './models/tournament';

describe('reducer', () => {
    it('handles SET_SEATS', () => {
        const state = Tournament();
        const action = {type: 'SET_SEATS', state: {
                vote: {
                    seats: ['Artist One', 'Artist Two'],
                    tally: {'Artist One': 1}
                },
                round: {
                    quarterFinals: [],
                    simiFinals: [],
                    finals: [],
                    winner: []
                },
                videoSource: '',
                vidSourceSwap: false,
                timer: '',
                timerLen: '',
                votingDisabled: false,
                currentRound: 'quarterFinals'
            }
        };
        const nextState = Reducer.reduce(state, action);

        expect(nextState).toEqual(fromJS({
                vote: {
                    seats: ['Artist One', 'Artist Two'],
                    tally: {'Artist One': 1}
                },
                round: {
                    quarterFinals: [],
                    simiFinals: [],
                    finals: [],
                    winner: []
                },
                videoSource: '',
                vidSourceSwap: false,
                timer: '',
                timerLen: '',
                votingDisabled: false,
                currentRound: 'quarterFinals'
            }));
    });

    it('handles SET_SEATS with undefined state', () => {
        const action = {type: 'SET_SEATS', state: {
                vote: {
                    seats: ['Artist One', 'Artist Two'],
                    tally: {'Artist One': 1}
                },
                round: {
                    quarterFinals: [],
                    simiFinals: [],
                    finals: [],
                    winner: []
                },
                videoSource: '',
                vidSourceSwap: false,
                timer: '',
                timerLen: '',
                votingDisabled: false,
                currentRound: 'quarterFinals'
            }
        };
        const nextState = Reducer.reduce(undefined, action);

        expect(nextState).toEqual(fromJS({
            vote: {
                seats: ['Artist One', 'Artist Two'],
                tally: {'Artist One': 1}
            },
            round: {
                quarterFinals: [],
                simiFinals: [],
                finals: [],
                winner: []
            },
            videoSource: '',
            vidSourceSwap: false,
            timer: '',
            timerLen: '',
            votingDisabled: false,
            currentRound: 'quarterFinals'
        }));
    });

    it('handles SET_SEATS with plain JS', () => {
        const state = Tournament();
        const action = {type: 'SET_SEATS', state: {
                vote: {
                    seats: ['Artist One', 'Artist Two'],
                    tally: {'Artist One': 1}
                },
                round: {
                    quarterFinals: [],
                    simiFinals: [],
                    finals: [],
                    winner: []
                },
                videoSource: '',
                vidSourceSwap: false,
                timer: '',
                timerLen: '',
                votingDisabled: false,
                currentRound: 'quarterFinals'
            }
        };
        const nextState = Reducer.reduce(state, action);

        expect(nextState).toEqual(fromJS({
                vote: {
                    seats: ['Artist One', 'Artist Two'],
                    tally: {'Artist One': 1}
                },
                round: {
                    quarterFinals: [],
                    simiFinals: [],
                    finals: [],
                    winner: []
                },
                videoSource: '',
                vidSourceSwap: false,
                timer: '',
                timerLen: '',
                votingDisabled: false,
                currentRound: 'quarterFinals'
            }));
    });
});
