import React, { Component } from 'react';
import { GoogleLogin } from 'react-google-login';
import Home from './home';

class Login extends Component {

    constructor() {
        super();
        this.state = { isAuthenticated: false, user: null, token: ''};
    }

    logout = () => {
        this.setState({isAuthenticated: false, token: '', user: null})
    };

    onFailure = (error) => {
        console.log('error',error);
        alert(error);
    };


    googleResponse = (response) => {
        console.log('response',response);
        const tokenBlob = new Blob([JSON.stringify({access_token: response.accessToken}, null, 2)], {type : 'application/json'});
        const options = {
            method: 'POST',
            body: tokenBlob,
            mode: 'cors',
            cache: 'default'
        };
        fetch('http://localhost:3001/public/auth/google', options).then(r => {
            console.log(r.headers);
            const token = r.headers.get('authorization');
            console.log('token',token);
            r.json().then(user => {
                if (token) {
                    console.log('inside then login');
                    this.setState({isAuthenticated: true, user, token})
                    localStorage.setItem('token', token);
                   
                }
            });
        })
    };

    render() {
    let content = !!this.state.isAuthenticated ?
            (
                <div>
                    <p>Authenticated</p>
                    <div>
                        {this.state.user.email}
                    </div>
                    <div>
                    <Home url='http://localhost:3001/' /> 
                    </div>
                    <div>
                        <button onClick={this.logout} className="button">
                            Log out
                        </button>
                    </div>
                </div>
            ) :
            (
                <div>
                    <GoogleLogin
                        clientId='152284473109-e32t0vivneno2f4qq9hf9dpiko93bcrs.apps.googleusercontent.com'
                        buttonText="Login"
                        onSuccess={this.googleResponse}
                        onFailure={this.onFailure}
                    />
                </div>
            );

        return (
            <div className="App">
                {content}
            </div>
        );
    }
}


export default Login;