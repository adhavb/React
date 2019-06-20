import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Joi from 'joi-browser';
import Input from './input';

class Registration extends Component {
    state = {
        account: { name: '', email: '', password: '' },
        errors: {}
    }
    username = React.createRef();

    schema = {
        name: Joi.string().min(5).max(50).required().label("Full Name").error(errors => {
            errors.forEach(err => {
                switch (err.type) {
                    case "any.empty":
                        err.message = "Full Name should not be empty!";
                        break;
                    case "string.min":
                        err.message = `Full Name should have at least ${err.context.limit} characters!`;
                        break;
                    case "string.max":
                        err.message = `Full Name should have at most ${err.context.limit} characters!`;
                        break;
                    default:
                        break;
                }
            });
            return errors;
        }),

        email: Joi.string().email().required().label('Email').error(errors => {
            errors.forEach(err => {
                switch (err.type) {
                    case "any.empty":
                        err.message = "Email should not be empty!";
                        break;
                    case "string.email":
                        err.message = `Email is not valid`;
                        break;

                    default:
                        break;
                }
            });
            return errors;
        }),
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
        //console.log('Result of JOI ' + JSON.stringify(result.error.details));
        let uniquemsg = '';
        let finalmsg = {};
        for (let message of result.error.details) {
            if (uniquemsg != message.context.label) {
                uniquemsg = message.context.label;
                console.log('message ' + JSON.stringify(message));
                finalmsg[message.context.key] = message.message;

            }
        }
        console.log('final message ' + JSON.stringify(finalmsg));

        return finalmsg;

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
        if (property == 'name' && value.trim() == '')
            return 'Full Name is required';
        if (property == 'password' && value.trim() == '')
            return 'Password is required';
        if (property == 'email' && value.trim() == '')
            return 'E-Mail is required';


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
                        <h3> User Registration Form </h3>
                        <form onSubmit={this.handleSubmit}>
                            <div className="form-group">
                                <label>User Name</label>
                                <input ref={this.username} id="username" type="text" className="form-control" placeholder="Enter User Name" />
                            </div>
                            <Input type="text"
                                name="name"
                                label="Full Name"
                                value={this.state.account.name}
                                onChange={this.handleChange}
                                placeholder="Enter Full Name"
                                error={this.state.errors.name ? this.state.errors.name : ''} />
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
                                    className="btn btn-primary my-2 my-sm-0 m-1" onClick={this.handleSubmit}>Register</button>
                            </div>
                        </form>
                    </div>
                </div>
            </React.Fragment >
        );
    }
}

export default Registration;