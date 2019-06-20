import React from 'react';
import './App.css';
import Movies from './movies';
import { Route, Switch, Redirect } from 'react-router-dom';
import MovieMenu from './components/moviemenu';
import Registration from './components/registration';
import NotFound from './components/notfound';
import Customers from './components/customers';
import Rentals from './components/rentals';
import LoginForm from './components/loginform';
import MovieForm from './components/movieform';


function App() {

  return (

    < React.Fragment >
      {window.location.pathname != "/login" && window.location.pathname != "/register" && <MovieMenu />}
      <Switch>
        <Route path='/login' component={LoginForm} />
        <Route path='/movie/:id' component={MovieForm} />
        <Route path='/movies' component={Movies} />
        <Route path='/rentals' component={Rentals} />
        <Route path='/register' component={Registration} />
        <Route path='/customers' component={Customers} />
        <Route path='/notfound' component={NotFound} />
        <Redirect from='/' exact to='/movies' />
        <Redirect to='/notfound' />
      </Switch>
    </React.Fragment >
  );
}

export default App;
