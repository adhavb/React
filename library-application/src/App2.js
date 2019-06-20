import React from 'react';
import './App.css';
import Movies from './movies';
import { Route, Switch, Redirect } from 'react-router-dom';
import SampleMenu from './components/samplemenu';
import Home from './components/home';
import Dashboard from './components/admin/dashboard';
import NotFound from './components/notfound';
import Posts from './components/posts';
import ProductDetails from './components/productdetails';
import Products from './components/products';



function App2() {
    return (
        <React.Fragment>
            <SampleMenu />
            <div className="content">
                <Dashboard />
                <Switch>
                    <Route path="/admin/dashboard" component={Dashboard} />
                    <Route path="/posts" component={Posts} />
                    <Redirect from='/messages' to='/posts' />
                    <Route path="/product/:id" component={ProductDetails} />
                    <Route path="/not-found" component={NotFound} />
                    <Route path="/products"
                        render={(props) => <Products sortBy="newest" {...props} />} />
                    <Route path="/" exact component={Home} />
                    <Redirect to="/not-found" />
                </Switch>
            </div>
        </React.Fragment>
    );
}

export default App2;
