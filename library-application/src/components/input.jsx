import React, { Component } from 'react';

const Input = ({ type, name, label, value, onChange, placeholder, error }) => {
    return (
        <div className="form-group">
            <label>{label}</label>
            <input id={name} onChange={onChange} name={name} value={value} type={type} className="form-control"
                placeholder={placeholder} />
            {error && <div className="alert alert-danger">{error}</div>}
        </div>
    );
}

export default Input;