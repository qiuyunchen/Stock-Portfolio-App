import React from 'react';
import { AuthContext } from '../contexts';
import StocksOwned from '../components/ownstock';
import StockPurchase from '../components/buystock';
import './portfolio.css';


export default class Portfolio extends React.Component {
    state = {

    }

    render(){

        return (
            <AuthContext.Consumer>
                {user =>{
                    return <>
                        <h1>Portfolio ( ${user.cash} )</h1>
                        <div className='portfolio-container'>

                            <div className='stock-list-container'>
                                <StocksOwned user={user} />
                            </div>

                            <div className='stock-purchase-container'>
                                <StockPurchase user={user} />
                            </div>

                        </div>
                    </>
                }}
            </AuthContext.Consumer>
        );
    }
}