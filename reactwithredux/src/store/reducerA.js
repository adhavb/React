const initialState = {
    A: 1
}

const reducerA = (state = initialState, action) => {
    const newState = { ...state };
    if (action.type == 'INCREMENT_A') {
        newState.A = newState.A + action.valueB;
    }
    return newState;
}

export default reducerA;