import React from 'react';
import logo from './logo.svg';
import './App.css';
import Counters from './components/counters';
import Movies from './movies';
import NavBar from './components/navbar';

class App1 extends React.Component {
    state = {
        counters: [
            { id: 1, value: 4 },
            { id: 2, value: 0 },
            { id: 3, value: 1 },
            { id: 4, value: 1 },
            { id: 5, value: 2 }
        ]
    }
    handleDelete = (id) => {
        console.log('Delete handler called', id);
        const counters = this.state.counters.filter(counter => counter.id !== id);
        this.setState({ counters });
    }
    handleReset = () => {
        const counters = this.state.counters.map(counter => {
            counter.value = 0
            return counter;
        });
        this.setState({ counters });
    }
    handleIncrement = (id) => {
        const counters = this.state.counters.map(counter => {
            if (counter.id === id) counter.value++;
            return counter;
        });
        this.setState({ counters });

    }

    handleDecrement = (id) => {
        const counters = this.state.counters.map(counter => {
            if (counter.id === id) counter.value--;
            return counter;
        });
        this.setState({ counters });

    }
    render() {
        return (
            <React.Fragment>
                <NavBar totalCount={this.state.counters.filter(counter => counter.value > 0).length} />
                <main className="container">
                    <Counters
                        counters={this.state.counters}
                        onReset={this.handleReset}
                        onDelete={this.handleDelete}
                        onIncrement={this.handleIncrement}
                        onDecrement={this.handleDecrement}
                    />
                </main>
            </React.Fragment >
        );
    }
}

export default App1;
