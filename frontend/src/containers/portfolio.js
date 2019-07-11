import React from 'react';
import Axios from 'axios';
import PortfolioValue from '../components/portfolio_value';
import StocksOwned from '../components/ownstock';
import StockPurchase from '../components/buystock';
import './portfolio.css';


export default class Portfolio extends React.Component {
    state = {
        user: {},
        stocks: [],
    }

    refreshState = (user) =>{
        Axios.get(`http://localhost:5555/stock/user/${user.id}`)
            .then(res =>{
                this.setState({user, stocks: res.data});
            })
            .catch(err =>{
                console.log('Get stocks by user id error...', err.toString())
            })
    }

    componentDidMount(){
        Axios.get(`http://localhost:5555/user/id/${this.props.user.id}`)
            .then(res =>{
                const user = res.data;
                this.refreshState(user);
            })
            .catch(err => console.log(err.toString()) )
    }

    render(){
        const {user, stocks} = this.state;
        const {props} = this.props;
        
        return (
            <>
                <PortfolioValue {...{user, stocks, props}}/>
                <div className='portfolio-container'>

                    <div className='stock-list-container'>
                        <StocksOwned {...{user, stocks, props}}/>
                    </div>

                    <div className='stock-purchase-container'>
                        <StockPurchase {...{user, stocks, props}} refreshState={this.refreshState}/>
                    </div>

                </div>
            </>       
        );
    }
}