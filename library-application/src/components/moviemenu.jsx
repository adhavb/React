import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';

class MovieMenu extends Component {

    render() {
        const location = this.findLocation;
        return (
            < nav class="navbar navbar-expand-md navbar-light bg-light justify-content-center fixed-top" >
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav mr-auto">
                        <li class="nav-item">
                        </li>
                        <li class="nav-item active">
                            <NavLink className="nav-link" to='/' >Home </NavLink>
                        </li>

                        <li class="nav-item">
                        </li>
                        <li class="nav-item active">
                            <NavLink className="nav-link" to='/rentals'>Rentals</NavLink>
                        </li>

                        <li class="nav-item active">
                            <NavLink className="nav-link" to='/customers'>Customers</NavLink>
                        </li>

                        <li class="nav-item active">
                            <NavLink className="nav-link" to='/movies'>Movies</NavLink>
                        </li>

                    </ul>
                    <a class="btn btn-primary my-2 my-sm-0 m-1" href='/login'>Login</a>
                    <button class="btn btn-danger my-2 my-sm-0 m-1">Logout</button>
                </div>
            </nav >

        );
    }
}

export default MovieMenu;