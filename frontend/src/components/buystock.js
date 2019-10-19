import React from 'react';
import Axios from 'axios';
import './styling/buystock.css';

export default class StockPurchase extends React.Component {
    state = {
        ticker: '',
        shares: 0,
        error: '',
        success: '',
    }

    handleInput = e =>{
        let value = e.target.value;
        if(e.target.name === 'ticker') value = value.toUpperCase();
        this.setState({[e.target.name]: value});
    }

    handleSubmit = e =>{
        e.preventDefault();
        const {user, stocks} = this.props;
        const {id, name, email, cash, uid} = user;
        const {ticker, shares} = this.state;

        // The requested data is not available to free tier accounts. Please upgrade for access to this data.
        // const pubToken = 'pk_b162cbdbebdc4449bcd3dbe59b054079';
        // const priceUrl = `https://cloud.iexapis.com/stable/stock/${ticker}/price?token=${pubToken}`;

        const APIKey = 'OjE0N2JkZjlmYWMxYmI4YzMzZGUxN2RjMjkxMDY2OGI2'
        const priceUrl = `https://api-v2.intrinio.com/securities/${ticker}/prices/realtime?api_key=${APIKey}`
        
        if(!ticker){
            this.setState({error: 'Please enter the stock symbol.', success:''})
        } else if (!shares){
            this.setState({error: 'Please enter the quantity of shares.', success:''})
        } else { 
            // Get current stock price
            Axios.get(priceUrl)
                .then(res =>{
                    const price = res.data.last_price;
                    const totalCost = (price * shares).toFixed(2);
                    const leftoverCash = (cash - totalCost).toFixed(2);
                    // Error: not enough cash to make purchase
                    if (leftoverCash < 0){
                        const s = shares > 1 ? 's' : '';
                        const s2 = !s ? 's' : '';
                        this.setState({
                            error: `YOU DON'T HAVE ENOUGH CASH. (${ticker}: $${price}) ${shares} share${s} cost${s2} $${totalCost}`,
                            success: '',
                        })
                    } else {
                        /*  
                            Everything passes
                            1. check if user already own shares of this stock
                                YES: update stock shares by id {user_id, ticker, shares}
                                NO: post stock {user_id, ticker, shares}
                            2. post transaction {user_id, ticker, shares, price}
                            3. update user cash by id {name, email, *cash, uid}
                            4. refresh render by doing a get request
                        */
                        const postTransaction = Axios.post(`http://localhost:5555/transaction`, {user_id: id, ticker, shares, price});
                        const updateUserCash = Axios.put(`http://localhost:5555/user/${id}`, {name, email, uid, cash: leftoverCash});
                        const match = stocks.filter(stock => stock.ticker === ticker);
                        if (match.length){
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
                    const {ticker, shares} = transactionRes.data.created;
                    const user = userRes.data.updated;
                    const s = shares > 1 ? 's':'';
                    const msg = `Yay! ${shares} share${s} of (${ticker}) purchased!`;
                    this.setState({success: msg, error:''})
                    this.props.refreshState(user);
                })
                // Error: invalid ticker
                .catch(err =>{
                    if(err.toString() === 'Error: Request failed with status code 404'){
                        this.setState({error: 'Ticker is invalid.', success: '', ticker: '', shares: ''});
                    }
                })
        }
    } // <--------------- Handle submit logic

    render(){
        const {ticker, shares, error, success} = this.state;
        const {user} = this.props;

        return (
            <form className='purchase-form'>
                {/* ----- Notifications ----- */}
                {error ? <div className='error-alert'> {error} </div> : ''}
                {success ? 
                    <div className='success-alert'>
                        <i className='fa fa-star'></i>
                        &nbsp; {success}
                    </div> : ''
                }

                <h1 className='full-row cash-remain'>
                    Cash: <b>&nbsp;${user.cash}</b>
                </h1>

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