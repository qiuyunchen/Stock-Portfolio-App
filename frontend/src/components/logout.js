import React from 'react';
import firebase from '../firebase';

export default (props) =>{
    firebase.auth().signOut();
    return <div>log out</div>
}