import React from 'react';
import firebase from '../firebase';
import Axios from 'axios';
import './styling/signup.css';


export default class Signup extends React.Component {
    state = {
        name: '',
        email: '',
        password: '',
        error: '',
    }

    handleInput = e =>{
        this.setState({[e.target.name]: e.target.value});
    }

    handleSubmit = e =>{
        e.preventDefault();
        const {name, email, password, error} = this.state;
        const {handleNewUser} = this.props;

        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(res =>{
                const {uid} = res.user;
                const user = {name, email, uid};
                console.log(user);
                return Axios.post('http://localhost:5555/user', user)
            })
            .then(res =>{
                const user = res.data.created;
                handleNewUser(user); // updates global state with user
                // which automatically redirects to private portfolio page
            })
            .catch(err =>{
                console.log(err.toString());
            })
    }

    render(){
        const {name, email, password, error} = this.state;

        return (<>
        
        <form className='signup-login-form'>
            <h1 className='full-row text-center white'>
                Ready for your next financial milestone?
            </h1>

            <input 
                name='name'
                placeholder='Name'
                type='text'
                className='full-row space input' 
                value={name}
                onChange={this.handleInput}></input>
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
                Create Account
            </button>
        </form>

        </>);
    }
}