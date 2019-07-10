import React from 'react';
import './styling/ownstock.css';

export default class StocksOwned extends React.Component {
    state = {
        
    }

    render(){
        const {user, stocks} = this.props;
        
        if (!stocks.length){
            return <div className='no-stock-msg'>No stocks in your portfolio yet.</div>
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