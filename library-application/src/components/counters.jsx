import React from 'react';
import Counter from './counter';
function Counters(props) {
    const test = () => { return 1 };
    return (
        <React.Fragment>
            <h1>This is a function test {test()}</h1>
            <button className="btn btn-primary" onClick={props.onReset}>Reset</button>
            {props.counters.map(counter =>
                <Counter key={counter.id}
                    counter={counter}
                    onDelete={props.onDelete}
                    onIncrement={props.onIncrement}
                    onDecrement={props.onDecrement}>
                    <h4>Counter #{counter.id}</h4>
                </Counter>)}
            <br />
            <img src='https://picsum.photos/200' />
        </React.Fragment >
    );
}


export default Counters;