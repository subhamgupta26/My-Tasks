import React, { Component } from 'react';
import { GoogleLogin } from 'react-google-login';
import Home from './home';
import Signup from './signup';
import axios from 'axios';

class Login extends Component {

    constructor() {
        super();
        this.state = { isAuthenticated: false, user: null, token: '', email: '', password: '', signup: false};
    }

    logout = () => {
        this.setState({isAuthenticated: false, token: '', user: null})
    };

    
    login = () => {
        
            axios
                .post('http://localhost:3001/public/login', { email: this.state.email, password: this.state.password })
                .then(res => {
                    console.log(res);
                    const token=res.data.token;
                    console.log(token);
                       this.setState({isAuthenticated: true, token})
                    localStorage.setItem('token', token);
                })
                .catch(e => {
                    console.log(e);
                });
      
    };
    
    signup = () => {
        this.setState({signup: true})
    };

         handleEmailChange=(event)=> {
    this.setState({email: event.target.value});
  }

  handlePasswordChange=(event)=>{
  this.setState({password: event.target.value});
}

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
        let content='';
        if(this.state.signup){
            content=(
                <Signup/>
            )
        }
        else {
     content = !!this.state.isAuthenticated ?
            (
                <div>
                    <p>Authenticated</p>
                    <div>
                        {/*{this.state.user.email}*/}
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
                    <div>Login</div>
                    <div>
                    <input type="text" placeholder="email" value={this.state.email} onChange={ this.handleEmailChange }/>
                    <input type="text" placeholder="password" value={this.state.password} onChange={ this.handlePasswordChange }/>
                    <div>
                        <button onClick={this.login} className="button">
                            Log in
                        </button>
                        <button onClick={this.signup} className="button">
                            Sign up
                        </button>
                    </div>
                    </div>
                    <GoogleLogin
                        clientId='152284473109-e32t0vivneno2f4qq9hf9dpiko93bcrs.apps.googleusercontent.com'
                        buttonText="Login with Google"
                        onSuccess={this.googleResponse}
                        onFailure={this.onFailure}
                    />
                </div>
            );
        }

        return (
            <div className="App">
                {content}
            </div>
        );
    }
}


export default Login;