import React from 'react';
import Axios from 'axios';
import './styling/buystock.css';

export default class StockPurchase extends React.Component {
    state = {
        ticker: '',
        shares: null,
        error: '',
    }

    handleInput = e =>{
        let value = e.target.value;
        if(e.target.name === 'ticker') value = value.toUpperCase();
        this.setState({[e.target.name]: value});
    }

    handleSubmit = e =>{
        e.preventDefault();
        const {user, stocks, props, refreshState} = this.props;
        const {id, name, email, cash, uid} = user;
        const {ticker, shares, error} = this.state;

        const pubToken = 'pk_b162cbdbebdc4449bcd3dbe59b054079';
        const priceUrl = `https://cloud.iexapis.com/stable/stock/${ticker}/price?token=${pubToken}`;
        // `https://cloud.iexapis.com/stable/data-points/${ticker}/QUOTE-LATESTPRICE?token=${pubToken}`
        const openPriceUrl = `https://cloud.iexapis.com/stable/stock/${ticker}/ohlc?token=${pubToken}`;
        const statsUrl = `https://cloud.iexapis.com/stable/stock/${ticker}/stats?token=${pubToken}`;

        if(!ticker || !shares){
            this.setState({error: 'Please fill in all fields to purchase stock.'})
        } else { 
            // do axios call to ensure valid ticker & get current price
            // (price of ticker) * (qty) must be <= cash
            Axios.get(priceUrl)
                .then(res =>{
                    const price = res.data;
                    const totalCost = price * shares;
                    const leftoverCash = cash - totalCost;
                    // Error: not enough cash to make purchase
                    if (leftoverCash < 0){
                        const s = shares > 1 ? 's' : '';
                        this.setState({
                            error: `${shares} share${s} of ${ticker} stock @$${price} costs you $${totalCost.toFixed(2)}. You do not have enough cash.`,
                        })
                    } else {
                        /* 
                            If I want to be fancy, inform user of current stock price
                            let user confirm purchase or cancel purchase. 
                        */
                        /* Everything passes
                            1. check if user already possess stock
                                YES: update stock shares by id {user_id, ticker, shares}
                                NO: post stock {user_id, ticker, shares}
                            2. post transaction {user_id, ticker, shares, price}
                            3. update user by id {name, email, *cash, uid}
                            4. refresh render by doing a get request
                        */
                        
                        const postTransaction = Axios.post(`http://localhost:5555/transaction`, {user_id: id, ticker, shares, price});
                        const updateUserCash = Axios.put(`http://localhost:5555/user/${id}`, {name, email, uid, cash: leftoverCash.toFixed(2)});

                        // Check if user already possess stock to be purchased
                        const match = stocks.filter(stock => stock.ticker === ticker);
                        if(match.length){
                            const newShares = match[0].shares + parseInt(shares);
                            const updateStock = Axios.put(`http://localhost:5555/stock/${match[0].id}`, {user_id: id, ticker, shares: newShares})
                            return Promise.all([updateStock, postTransaction, updateUserCash])
                        } else {
                            const postStock = Axios.post(`http://localhost:5555/stock`, {user_id: id, ticker, shares});
                            return Promise.all([postStock, postTransaction, updateUserCash])
                        }
                    }
                })
                .then(([stockRes, transactionRes, userRes]) =>{
                    const user = userRes.data.updated;
                    // let user know transaction went through
                    refreshState(user);
                })
                .catch(err =>{
                    if(err.toString() === 'Error: Request failed with status code 404'){
                        this.setState({error: 'Ticker is invalid. Try again.', ticker: '', shares: ''});
                    }
                })

        }
    }

    render(){
        const {ticker, shares, error} = this.state;
        const {user} = this.props;

        return (
            <form className='purchase-form'>
                <div className="alert alert-danger"> {error} </div>

                <h1 className='full-row text-center'>Cash - ${user.cash}</h1>

                <input 
                    name='ticker'
                    placeholder='Ticker'
                    type='text'
                    className='full-row space input' 
                    value={ticker}
                    onChange={this.handleInput}></input>
                <input
                    name='shares' 
                    placeholder='Qty'
                    type='number'
                    step='1'
                    min='1'
                    className='full-row space input' 
                    value={shares}
                    onChange={this.handleInput}></input>

                {/* Submit button */}
                <button 
                    type='submit'
                    className='button'
                    style={{margin:'auto',marginTop:'30px'}}
                    onClick={this.handleSubmit}>
                    BUY
                </button>
            </form>
        );
    }
}