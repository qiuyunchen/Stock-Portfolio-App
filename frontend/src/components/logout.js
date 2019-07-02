import React from 'react';
import {Redirect, withRouter} from 'react-router-dom';
import firebase from '../firebase';

export default (props) =>{
    firebase.auth().signOut();
    // props.history.push('/');
    return <><Redirect to='/' /></>
}