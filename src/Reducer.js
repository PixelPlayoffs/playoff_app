import Round from './models/round';

function setState(state, newState) {
    return state.merge(newState);
}

function vote(state, entry) {
    const currentSeats = state.getIn(['vote', 'seats']);
    if (currentSeats && currentSeats.includes(entry)) {
        return state.updateIn(
            ['vote', 'tally', entry],
            0,
            tally => tally + 1
        );
    } else {
        return state;
    }
}

class Reducer {
    reduce(state = Round(), action) {
        switch (action.type) {
            case 'SET_SEATS':
                return setState(state, action.state);
            case 'VOTE':
                return vote(state, action.entry);
            default:
                break;
        }
        return state;
    }
}

export default new Reducer();
