import Tournament from './models/tournament'; 

function setState(state, newState) {
    console.log(JSON.stringify(state));
    return state.merge(newState);
}

class Reducer {
    reduce(state = Tournament(), action) {
        switch (action.type) {
            case 'SET_SEATS':
                return setState(state, action.state);
            default:
                break;
        }
        return state;
    }
}

export default new Reducer();
