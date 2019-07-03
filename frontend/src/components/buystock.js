import React from 'react';
import './styling/buystock.css';

export default class StockPurchase extends React.Component {
    state = {
        ticker: '',
        shares: null,
    }

    handleSubmit = e =>{
        e.preventDefault();
        
    }

    render(){
        const {ticker, shares} = this.state;
        const {user} = this.props;
        console.log(this.props)

        return (
            <form className='purchase-form'>
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