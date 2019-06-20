const initialState = {
    age: 21,
    history: []
}

const reducer = (state = initialState, action) => {
    const newState = { ...state };
    if (action.type == 'AGE_UP') {
        newState.age = newState.age + 1;
        newState.history = newState.history.concat({ key: Math.random(), age: newState.age });
    }

    if (action.type == 'AGE_DOWN') {
        newState.age = newState.age - 1;
        newState.history = newState.history.concat({ key: Math.random(), age: newState.age });
    }

    if (action.type == 'REMOVE_HISTORY') {
        newState.history = newState.history.filter(e1 => e1.key != action.key)
    }

    return newState;
}

export default reducer;