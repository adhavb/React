import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Joi from 'joi-browser';
import Input from './input';

class LoginForm extends Component {
    state = {
        account: { email: '', password: '' },
        errors: {}
    }
    username = React.createRef();

    schema = {
        email: Joi.string().required().label('Email'),
        password: Joi.string().required().label('Password')
    }

    handleSubmit = e => {

        e.preventDefault(); //this avoids the full page reload/refresh
        const errors = this.validate();
        this.setState({ errors });
        if (Object.keys(errors).length > 0) return;
        console.log("Proceed with submitting");
    }
    validate = () => {
        const result = Joi.validate(this.state.account, this.schema, { abortEarly: false }); //JOI library is used for form field validation
        console.log('Result of JOI ' + JSON.stringify(result));
        //this.setState({ errors: {} });
        const errors = {};

        if (this.state.account.email == '')
            errors.email = 'Email is required';
        if (this.state.account.password == '')
            errors.password = 'Password is required';
        return errors;
        // return Object.keys(errors).length == 0 ? null : errors;
    }

    handleChange = e => {
        console.log(e.currentTarget.name);
        console.log(e.currentTarget.value);
        const account = { ...this.state.account };
        const errors = { ...this.state.errors };
        const errorMessage = this.validateProperty(e.currentTarget.name, e.currentTarget.value);
        account[e.currentTarget.name] = e.currentTarget.value;
        errors[e.currentTarget.name] = errorMessage;
        this.setState({ account, errors });
    }
    validateProperty = (property, value) => {
        if (property == 'email' && value.trim() == '')
            return 'E-Mail is required';
        if (property == 'password' && value.trim() == '')
            return 'Password is required';


    }
    userRegistration = () => {
        console.log(this.props.location);
        this.props.location.push('/register');
    }

    componentDidMount() {
        this.username.current.focus();
    }

    render() {
        return (
            <React.Fragment>
                <div className="row">
                    <div class="col-md-2">

                    </div>
                    <div className="col-md-6">
                        <form onSubmit={this.handleSubmit}>
                            <div className="form-group">
                                <label>User Name</label>
                                <input ref={this.username} id="username" type="text" className="form-control" placeholder="Enter User Name" />
                            </div>
                            <p>or</p>
                            <Input type="email"
                                name="email"
                                label="E-Mail"
                                value={this.state.account.email}
                                onChange={this.handleChange}
                                placeholder="Enter Email"
                                error={this.state.errors.email ? this.state.errors.email : ''} />
                            <Input type="password"
                                name="password"
                                label="Password"
                                value={this.state.account.password}
                                onChange={this.handleChange}
                                placeholder="Enter Password"
                                error={this.state.errors.password ? this.state.errors.password : ''} />

                            <div className="form-group">
                                <button
                                    className="btn btn-primary my-2 my-sm-0 m-1" onClick={this.handleSubmit}>Login</button>
                                <Link to='/register'><button
                                    className="btn btn-primary my-2 my-sm-0 m-1">New User?</button>
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default LoginForm;