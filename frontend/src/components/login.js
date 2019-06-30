import React from 'react';
import firebase from '../firebase';
import './styling/login.css';

export default class Login extends React.Component {
    state = {
        email: '',
        password: '',
        error: '',
    }
    
    handleInput = e =>{
        this.setState({[e.target.name]: e.target.value});
    }

    handleSubmit = e =>{
        e.preventDefault();
        const {email, password} = this.state;

        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(yay =>{
                console.log('logged in...', yay);
            })
            .catch(err =>{
                console.log('log in error...', err.message);
            })
    }

    render(){
        const {email, password, error} = this.state;

        return (<>
        
        <form className='signup-login-form'>
            <h1 className='full-row text-center white'>Welcome back!</h1>

            <input 
                name='email'
                placeholder='Email'
                type='text'
                className='full-row space input' 
                value={email}
                onChange={this.handleInput}></input>
            <input
                name='password' 
                placeholder='Password'
                type='password'
                className='full-row space input' 
                value={password}
                onChange={this.handleInput}></input>

            {/* Submit button */}
            <button 
                type="submit"
                className='button' 
                onClick={this.handleSubmit}>
                Log In
            </button>
        </form>
        </>);
    }
}