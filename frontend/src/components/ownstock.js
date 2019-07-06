import React from 'react';
import Axios from 'axios';

export default class StocksOwned extends React.Component {
    state = {
        
    }

    render(){
        const {user, stocks} = this.props;
        
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