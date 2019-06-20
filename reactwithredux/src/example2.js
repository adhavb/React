import React from 'react';
import './App.css';
import { connect } from 'react-redux';

function Example2(props) {
    return (
        <div className="App">
            <div>A:{props.A}</div>
            <div>B:{props.B}</div>
            <button onClick={() => props.incrementA(props.B)}>Increase A</button>
            <button onClick={() => props.incrementB(props.A)}>Increase B</button>


        </div>
    );
}

const dispatchToProps = dispatch => {
    return {
        incrementA: (valueB) => dispatch({ type: "INCREMENT_A", valueB }),
        incrementB: (valueA) => dispatch({ type: "INCREMENT_B", valueA }),

    }
}
const stateToProps = (store) => {
    return {
        A: store.rA.A,
        B: store.rB.B
    }
}
export default connect(stateToProps, dispatchToProps)(Example2);
