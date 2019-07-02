import React from 'react';
import {Link} from 'react-router-dom';
import {AuthContext} from '../contexts';
import './styling/private_header.css';

export default (props) =>{
    return (
        <AuthContext.Consumer>
            {user =>{
                return (
                    <nav className='private-nav'>
                        <div className='private-nav-container'>
                            <div className='app-title-container'>
                                <h1 style={{fontSize:'25pt'}}>Hello, {user.name}</h1>
                            </div>

                            <ul className='private-nav-list'>
                                <Link to='/' className='link'>
                                    <li className='list-item'>Portfolio</li>
                                </Link>

                                <li className='list-item pipe'>|</li>
                                
                                <Link to='/transactions' className='link'>
                                    <li className='list-item'>Transactions</li>
                                </Link>
                                
                                <li className='list-item pipe'>|</li>
                                
                                <Link to='/logout' className='link'>
                                    <li className='list-item'>Log Out</li>
                                </Link>
                            </ul>
                        </div>
                    </nav>
                )
            }}
        </AuthContext.Consumer>
    )
}