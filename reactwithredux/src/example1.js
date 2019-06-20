import React from 'react';
import './App.css';
import { connect } from 'react-redux';

function Example1(props) {
    return (
        <div className="App">
            <div>Age:{props.age}</div>
            <button onClick={() => props.onAgeUp()}>Age Up</button>
            <button onClick={() => props.onAgeDown()}>Age Down</button>
            <br></br>
            <div>
                <ul>
                    {props.history.map(e1 => <li onClick={() => props.removeHistory(e1.key)} key={e1.key}>{e1.age}</li>)}
                </ul>
            </div>

        </div>
    );
}

const dispatchToProps = dispatch => {
    return {
        onAgeUp: () => dispatch({ type: "AGE_UP" }),
        onAgeDown: () => dispatch({ type: "AGE_DOWN" }),
        removeHistory: (key) => dispatch({ type: "REMOVE_HISTORY", key })
    }
}
const stateToProps = (state) => {
    return {
        age: state.age,
        history: state.history
    }
}
export default connect(stateToProps, dispatchToProps)(Example1);
