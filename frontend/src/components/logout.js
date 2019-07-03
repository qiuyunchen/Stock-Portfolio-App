import React from 'react';
import {Redirect} from 'react-router-dom';
import firebase from '../firebase';

export default (props) =>{
    firebase.auth().signOut();
    return <><Redirect to='/' /></>
}