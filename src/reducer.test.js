import {List, Map, fromJS} from 'immutable';
import Reducer from './Reducer';
import Round from './models/round';

describe('reducer', () => {
    it('handles SET_SEATS', () => {
        const state = Round();
        const action = {type: 'SET_SEATS', state: Map({
                vote: Map({
                    seats: List.of('Artist One', 'Artist Two'),
                    tally: Map({'Artist One': 1})
                }),
                videoSource: '',
                currentRound: 'quarterFinals'
            })
        };
        const nextState = Reducer.reduce(state, action);

        expect(nextState).toEqual(fromJS({
            vote: {
                seats: ['Artist One', 'Artist Two'],
                tally: {'Artist One': 1}
            },
            videoSource: '',
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
        const state = Round();
        const action = {type: 'SET_SEATS', state: {
                vote: {
                    seats: ['Artist One', 'Artist Two'],
                    tally: {'Artist One': 1}
                },
                videoSource: '',
                currentRound: 'quarterFinals'
            }
        };
        const nextState = Reducer.reduce(state, action);

        expect(nextState).toEqual(fromJS({
            vote: {
                seats: ['Artist One', 'Artist Two'],
                tally: {'Artist One': 1}
            },
            videoSource: '',
            currentRound: 'quarterFinals'
        }));
    });

    // it('creates a tally for the voted seat', () => {
    //     const state = Map({
    //         vote: Map({
    //             seats: List.of('Artist One', 'Artist Two'),
    //             tally: Map()
    //         }),
    //         videoSource: '',
    //         currentRound: 'quarterFinals'
    //     });
    //     const action = {type: 'VOTE', entry: 'Artist One'};
    //     const nextState = Reducer.reduce(state, action);

    //     expect(nextState).toEqual(fromJS({
    //         vote: {
    //             seats: ['Artist One', 'Artist Two'],
    //             tally: {'Artist One': 1}
    //         },
    //         videoSource: '',
    //         currentRound: 'quarterFinals'
    //     }));
    // });
});
