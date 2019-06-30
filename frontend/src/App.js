import React, {Component} from 'react';
import { HashRouter, Route} from 'react-router-dom';
import firebase from './firebase';

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

  componentDidMount(){
    this.unsubscribe = firebase.auth().onAuthStateChanged( user =>{
      if(user) {
        console.log(user);
        // get email, auth-token from firebase
        // use auth-token to verify user identity via middleware
        // get user info from db
        // this.setState({user});
      }
    })
  }

  componentWillUnmount () {
    this.unsubscribe();
  }

  render(){
    const {user} = this.state;

    if(!user){
      return (
        <HashRouter>
          <Route path='/' component={ PublicHeader } />
          <Route path='/login' exact component={ Login } />
          <Route path='/signup' exact component={ Signup } />
        </HashRouter>
      );
    } else {
      return(
        <HashRouter>
          <Route path='/' component={ PrivateHeader } />
          <Route path='/logout' exact component={ Logout } />
          <Route path='/portfolio' exact component={ Portfolio } />
          <Route path='/transactions' exact component={ Transactions } />
        </HashRouter>
      );
    }
  }
}