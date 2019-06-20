import React, { Component } from 'react';

function NavBar(props) {
    return (
        <nav class="navbar navbar-light bg-light">
            <a class="navbar-brand" href="#">
                Navbar <span class="badge badge-pill badge-secondary">{props.totalCount}</span>
            </a>
        </nav>
    );
}
export default NavBar;