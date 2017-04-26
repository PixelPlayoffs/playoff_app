// import Round from './models/round';
import Tournament from './models/tournament'; 

function setState(state, newState) {
    console.log(JSON.stringify(state));
    return state.merge(newState);
}

// function vote(state, entry) {
//     // const currentSeats = state.getIn(['vote', 'seats']);
//     // if (currentSeats && currentSeats.includes(entry)) {
//     //     return state.updateIn(
//     //         ['vote', 'tally', entry],
//     //         0,
//     //         tally => tally + 1
//     //     );
//     // } else {
//     //     return state;
//     // }
//     return state
// }

// function setTimer(state, count) {
//     let length = state.get('timerLen');
//     return state.updateIn(['timer'], t => t = (count/length)*100);
// }

class Reducer {
    reduce(state = Tournament(), action) {
        switch (action.type) {
            case 'SET_SEATS':
                return setState(state, action.state);
            // case 'VOTE':
            //     return vote(state, action.entry);
            default:
                break;
        }
        return state;
    }
}

export default new Reducer();
