import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { registerUser } from '../actions/authentication';
import classnames from 'classnames';
import Navbar from './Navbar';

class Register extends Component {

    constructor() {
        super();
        this.state = {
            name: '',
            lastname:'',
            address:'',
            number:'',
            phone:'',
            email: '',
            password: '',
            password_confirm: '',
            admin:'',
            errors: {}
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit(e) {
        e.preventDefault();
        const user = {
            name: this.state.name,

            lastname: this.state.lastname,
            address: this.state.address,
            phone: this.state.phone,
            number: this.state.number,

            email: this.state.email,
            password: this.state.password,
            password_confirm: this.state.password_confirm,
            admin: this.state.admin,

        }
        this.props.registerUser(user, this.props.history);
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.auth.isAuthenticated) {
            this.props.history.push('/')
        }
        if(nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }

    componentDidMount() {
        if(this.props.auth.isAuthenticated) {
            this.props.history.push('/');
        }
    }

    render() {
        const { errors } = this.state;
        return(
            <div>
                <Navbar/>
               <div className="container" style={{ marginTop: '50px', width: '700px'}}>
            <h2 style={{marginBottom: '40px'}}>Registration</h2>
            <form onSubmit={ this.handleSubmit }>
                <div className="form-group">
                    <input
                    type="text"
                    placeholder="Name"
                    className={classnames('form-control form-control-lg', {
                        'is-invalid': errors.name
                    })}
                    name="name"
                    onChange={ this.handleInputChange }
                    value={ this.state.name }
                    />
                    {errors.name && (<div className="invalid-feedback">{errors.name}</div>)}
                </div>
                <div className="form-group">
                    <input
                    type="text"
                    placeholder="Last Name"
                    className={classnames('form-control form-control-lg', {
                        'is-invalid': errors.lastname
                    })}
                    name="lastname"
                    onChange={ this.handleInputChange }
                    value={ this.state.lastname }
                    />
                    {errors.lastname && (<div className="invalid-feedback">{errors.lastname}</div>)}
                </div>
                <div className="form-group">
                    <input
                    type="email"
                    placeholder="Email"
                    className={classnames('form-control form-control-lg', {
                        'is-invalid': errors.email
                    })}
                    name="email"
                    onChange={ this.handleInputChange }
                    value={ this.state.email }
                    />
                    {errors.email && (<div className="invalid-feedback">{errors.email}</div>)}
                </div>
                <div className="form-group">
                    <input
                    type="password"
                    placeholder="Password"
                    className={classnames('form-control form-control-lg', {
                        'is-invalid': errors.password
                    })}
                    name="password"
                    onChange={ this.handleInputChange }
                    value={ this.state.password }
                    />
                    {errors.password && (<div className="invalid-feedback">{errors.password}</div>)}
                </div>
                <div className="form-group">
                    <input
                    type="password"
                    placeholder="Confirm Password"
                    className={classnames('form-control form-control-lg', {
                        'is-invalid': errors.password_confirm
                    })}
                    name="password_confirm"
                    onChange={ this.handleInputChange }
                    value={ this.state.password_confirm }
                    />
                    {errors.password_confirm && (<div className="invalid-feedback">{errors.password_confirm}</div>)}
                </div>

                 <div className="form-group">
                    <input
                    type="text"
                    placeholder="Phone"
                    className={classnames('form-control form-control-lg', {
                        'is-invalid': errors.phone
                    })}
                    name="phone"
                    onChange={ this.handleInputChange }
                    value={ this.state.phone }
                    />
                    {errors.phone && (<div className="invalid-feedback">{errors.phone}</div>)}
                </div>

                 <div className="form-group">
                    <input
                    type="text"
                    placeholder="Adli Number"
                    className={classnames('form-control form-control-lg', {
                        'is-invalid': errors.number
                    })}
                    name="number"
                    onChange={ this.handleInputChange }
                    value={ this.state.number }
                    />
                    {errors.number && (<div className="invalid-feedback">{errors.number}</div>)}
                </div>

                 <div className="form-group">
                    <input
                    type="text"
                    placeholder="Address"
                    className={classnames('form-control form-control-lg', {
                        'is-invalid': errors.address
                    })}
                    name="address"
                    onChange={ this.handleInputChange }
                    value={ this.state.address }
                    />
                    {errors.address && (<div className="invalid-feedback">{errors.address}</div>)}
                </div>
                <div className="form-group">
                    <button type="submit" className="btn btn-primary">
                        Register User
                    </button>
                </div>
            </form>
        </div>
            </div>
        )
    }
}

Register.propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(mapStateToProps,{ registerUser })(withRouter(Register))