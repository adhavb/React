const initialState = {
    B: 1
}

const reducerB = (state = initialState, action) => {
    const newState = { ...state };
    if (action.type == 'INCREMENT_B') {
        newState.B = newState.B + action.valueA;

    }



    return newState;
}

export default reducerB;