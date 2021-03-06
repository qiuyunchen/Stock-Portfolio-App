// Frameworks
import React, {Component} from 'react';
import Axios from 'axios';
import { HashRouter, Route} from 'react-router-dom';
import {AuthContext} from './contexts';
import firebase from './firebase';
import './App.css';

// Containers & Components
import Login from './components/login';
import Logout from './components/logout';
import Portfolio from './containers/portfolio';
import PrivateHeader from './components/private_header';
import PublicHeader from './components/public_header';
import Signup from './components/signup';
import Transactions from './components/transactions';


export default class App extends Component {
  state = {
    user: null,
  }

  handleNewUser = (user) =>{
    this.setState({user});
  }

  componentDidMount(){
    this.unsubscribe = firebase.auth().onAuthStateChanged( user =>{
      if(user) {
        Axios.get(`http://localhost:5555/user/email/${user.email}`)
          .then(res =>{
            this.setState({user: res.data})
          })
          .catch(err =>{
            console.log(err.toString())
          })
        // get email, auth-token from firebase
        // use auth-token to verify user identity via middleware
        // get user info from db
      } else {
        this.setState({user: null});
      }
    })
  }

  componentWillUnmount () {
    this.unsubscribe();
  }

  render(){
    const {user} = this.state;
    const handleNewUser = this.handleNewUser;

    if(!user){
      return (
        <HashRouter>

          <Route path='/' component={ PublicHeader } />

          <div className='body'>
            <Route path='/' exact component={ Login } />   
            <Route path='/signup' exact
              render={ props => <Signup {...{handleNewUser, props}} /> } 
              />
          </div>

        </HashRouter>
      );

    } else {
      return (
        <HashRouter>
        <AuthContext.Provider value={user}>

          <Route path='/' component={ PrivateHeader } />

          <div className='body'>
            <Route path='/' exact
              render={ props => <Portfolio {...{props, user}} /> } 
              />
            <Route path='/transactions' exact
              render={ props => <Transactions {...{props, user}} /> }
              />
            <Route path='/logout' exact component={ Logout } />
          </div>

        </AuthContext.Provider>
        </HashRouter>
      );
    }
  }
}