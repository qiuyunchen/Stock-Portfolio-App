import React from 'react';
import {Link} from 'react-router-dom';
import './styling/public_header.css';

export default (props) =>{
    return (
        <nav className='nav'>
            <div className='nav-container'>
                <div className='app-title-container'>
                    <h1 style={{fontSize:'25pt'}}>Your Stock Portfolio App</h1>
                </div>

                <ul className='nav-list'>
                    <Link to='/' className='link'>
                        <li className='list-item'>Login</li>
                    </Link>
                    <Link to='/signup' className='link'>
                        <li className='list-item'>Signup</li>
                    </Link>
                </ul>
            </div>
        </nav>
    )
}