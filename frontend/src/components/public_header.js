import React from 'react';
import {Link} from 'react-router-dom';
import firebase from '../firebase';
import './styling/public_header.css';

export default (props) =>{
    return (
        <nav className='nav'>
            <h1 className='app-title'>Your Stock Portfolio App</h1>
            <ul className='nav-list'>
                <Link to='/' className='link'>
                    <li className='list-item'>Login</li>
                </Link>
                <Link to='/signup' className='link'>
                    <li className='list-item'>Signup</li>
                </Link>
            </ul>
        </nav>
    )
}