import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class SampleMenu extends Component {

    render() {
        return (
            <nav class="navbar navbar-expand-md navbar-light bg-light justify-content-center fixed-top">
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav mr-auto">
                        <li class="nav-item">
                        </li>
                        <li class="nav-item active">
                            <Link className="nav-link" to='/' >Home </Link>
                        </li>

                        <li class="nav-item">
                        </li>
                        <li class="nav-item active">
                            <Link className="nav-link" to='/products'>Products</Link>
                        </li>

                        <li class="nav-item active">
                            <Link className="nav-link" to='/posts'>Posts</Link>
                        </li>

                        <li class="nav-item active">
                            <Link className="nav-link" to='/admin/dashboard'>Admin</Link>
                        </li>

                    </ul>
                    <button class="btn my-2 my-sm-0" >Login</button>
                    <button class="btn my-2 my-sm-0">Logout</button>
                </div>
            </nav>
        );
    }
}

export default SampleMenu;