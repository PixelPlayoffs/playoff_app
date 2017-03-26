import {Map, List} from 'immutable';

export default () => {
    return Map({
            vote: Map({
                seats: List(),
                tally: Map()
            }),
            currentRound: 'quarterFinals'
        });
};
