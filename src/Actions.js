class Actions {
    setState(state) {
        return {type: 'SET_SEATS', state};
    }

    vote(entry) {
        return {meta: {remote: true}, type: 'VOTE', entry};
    }

    next() {
        return {meta: {remote: true}, type: 'NEXT'}
    }
}

export default new Actions();
