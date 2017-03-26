import {List, Map, fromJS} from 'immutable';
import Reducer from './reducer';
import Round from './models/round';

describe('reducer', () => {
    it('handles SET_SEATS', () => {
        const state = Round();
        const action = {type: 'SET_SEATS', state: Map({
                vote: Map({
                    seats: List.of('Artist One', 'Artist Two'),
                    tally: Map({'Artist One': 1})
                }),
                currentRound: 'quarterFinals'
            })
        };
        const nextState = new Reducer(state, action);

        expect(nextState).toEqual(fromJS({
            vote: {
                seats: ['Artist One', 'Artist Two'],
                tally: {'Artist One': 1}
            },
            currentRound: 'quarterFinals'
        }));
    });

    it('handles SET_SEATS with undefined state', () => {
        const state = Round();
        const action = {type: 'SET_SEATS', state: {
                vote: {
                    seats: ['Artist One', 'Artist Two'],
                    tally: {'Artist One': 1}
                },
                currentRound: 'quarterFinals'
            }
        };
        const nextState = new Reducer(state, action);

        expect(nextState).toEqual(fromJS({
            vote: {
                seats: ['Artist One', 'Artist Two'],
                tally: {'Artist One': 1}
            },
            currentRound: 'quarterFinals'
        }));
    });

    it('handles SET_SEATS with plain JS', () => {
        const action = {type: 'SET_SEATS', state: {
                vote: {
                    seats: ['Artist One', 'Artist Two'],
                    tally: {'Artist One': 1}
                },
                currentRound: 'quarterFinals'
            }
        };
        const nextState = new Reducer(undefined, action);

        expect(nextState).toEqual(fromJS({
            vote: {
                seats: ['Artist One', 'Artist Two'],
                tally: {'Artist One': 1}
            },
            currentRound: 'quarterFinals'
        }));
    });
});
