export function setState(state) {
    return {type: 'SET_SEATS', state};
}

export function vote(entry) {
    return {meta: {remote: true}, type: 'VOTE', entry};
}

export function next() {
    return {meta: {remote: true}, type: 'NEXT'}
}

export function setTimer(count) {
    return {meta: {remote: true}, type: 'TIMER', count}
}
