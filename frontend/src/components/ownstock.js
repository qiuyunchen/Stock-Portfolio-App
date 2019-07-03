import React from 'react';
import Axios from 'axios';

export default class StocksOwned extends React.Component {
    state = {
        user: {},
        stocks: [],
    }

    componentDidMount(){
        const {user} = this.props;
        Axios.get(`http://localhost:5555/stock/user/${user.id}`)
            .then(res =>{
                this.setState({user, stocks: res.data});
            })
            .catch(err =>{
                console.log('Get stocks by user id error...', err.toString())
            })
    }

    render(){
        const {user, stocks} = this.state;
        
        if (!stocks.length){
            return <div>You don't own any stocks yet</div>
        } else {
            return <>
                {stocks.map(s =>{
                    // add component
                    return s.ticker + ' - ' + s.shares + ' shares'
                })}
            </>
        }
    }
}