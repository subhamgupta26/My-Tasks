import React, { Component } from 'react';
import { GoogleLogin } from 'react-google-login';
import Home from './home';
import Login from './login';
import axios from 'axios';

class Signup extends Component {
    constructor() {
        super();
        this.state = { isAuthenticated: false, user: null, token: '', email: '', password: '', signup: true, username: '',confirmPassword: '' };
    }

    signup = () => {
        // this.setState({isAuthenticated: false, token: '', user: null})
        if (this.validate()) {
            axios
                .post('http://localhost:3001/public/signup', { name: this.state.username, email: this.state.email, password: this.state.password })
                .then(res => {
                    this.setState({ signup: false });
                })
                .catch(e => {
                    console.log(e);
                });
        }


    };
    validate=()=> {
        if (this.state.username.trim() === '' || this.state.email.trim() === '' || this.state.password.trim() === '') {
            // this.toastr.error('Mandatory fields cannot be empty');
            alert('Mandatory fields cannot be empty');
            return false;
        }
        if (!this.validateEmail(this.state.email)) {
            // this.toastr.error('Please enter a valid email address');
            alert('Please enter a valid email address');
            return false;
        }
        if (this.state.password != this.state.confirmPassword) {
            // this.toastr.error('Password and Confirm password doesnot match');
            alert('Password and Confirm password doesnot match');
            return false;
        }

        return true;
    }
    validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    login = () => {
        this.setState({ signup: false })
    };

    handleNameChange=(event)=> {
    this.setState({username: event.target.value});
  }
     handleEmailChange=(event)=> {
    this.setState({email: event.target.value});
  }

  handlePasswordChange=(event)=>{
  this.setState({password: event.target.value});
}

  handleConfirmPasswordChange=(event)=>{
  this.setState({confirmPassword: event.target.value});
  }

    render() {
        let content = this.state.signup ? (
            <div className="App">
                <div>Signup</div>
                <div>
                    <input type="text" placeholder="username" value={this.state.username} onChange={ this.handleNameChange }/>
                    <input type="text" placeholder="email" value={this.state.email} onChange={ this.handleEmailChange }/>
                    <input type="text" placeholder="password" value={this.state.password} onChange={ this.handlePasswordChange }/>
                    <input type="text" placeholder="confirm password" value={this.state.confirmPassword} onChange={ this.handleConfirmPasswordChange }/>
                    <div>
                        <button onClick={this.login} className="button">
                            Log in
                        </button>
                        <button onClick={this.signup} className="button">
                            Sign up
                        </button>
                    </div>
                </div>
            </div>
        ) : (

                <Login />
            );
        return (
            <div className="App">
                {content}
            </div>
        );
    }
}


export default Signup;