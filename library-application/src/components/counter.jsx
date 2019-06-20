import React, { Component } from 'react';

class Counter extends Component {

    styles = {
        fontSize: 15,
        fontWeight: 'bold'
    }
    formatCount() {
        const { value: counter } = this.props.counter;
        return counter === 0 ? 'Zero' : counter;
    }

    getBadgeClasses() {
        return this.props.counter == 0 ? 'badge badge-warning m-2' : 'badge badge-primary m-2';
    }





    render() {

        return (
            <React.Fragment>
                {this.props.children}
                <span style={this.styles} className={this.getBadgeClasses()}>{this.formatCount()}</span>

                <button
                    onClick={() => this.props.onIncrement(this.props.counter.id)}
                    className="btn btn-secondary btn-md m-2" >
                    +
                </button>

                <button
                    onClick={() => this.props.onDecrement(this.props.counter.id)}
                    className="btn btn-secondary btn-md m-2"
                    disabled={this.props.counter.value === 0}>
                    -
                </button>

                <button
                    onClick={() => this.props.onDelete(this.props.counter.id)}
                    className="btn btn-danger btn-md">
                    x
                </button>
                <br />

            </React.Fragment >
        );
    }
}

export default Counter;