import React from 'react';
import Axios from 'axios';
import './styling/transactions.css';

export default class Transactions extends React.Component {
    state = {
        transactions: []
    }
    
    componentDidMount(){
        const {id} = this.props.user

        Axios.get(`http://localhost:5555/transaction/user/${id}`)
            .then(res =>{
                this.setState({transactions: res.data});
            })
            .catch(err =>{
                console.log(err.toString());
            })
    }

    render(){
        const {transactions} = this.state;

        return <>
            <h1 className='transaction-title'>Stock Purchase History</h1>
            <div className='transactions-container'>
                {transactions.map( (e,i) =>{
                    const {ticker, shares, transact_date, price, } = e;
                    const date = transact_date.split('T')[0];
                    const unitPrice = parseFloat(price).toFixed(2);
                    const total = (price * shares).toFixed(2);
                    let padding = '';
                    switch (e.ticker.length) {
                        case 1: padding = '--------'; break;
                        case 2: padding = '------'; break;
                        case 3: padding = '----'; break;
                        case 4: padding = '--'; break;
                        default: padding = '';
                    }
                    const line = ` ${padding}----- `;
                    const s = shares > 1 ? 's':'';

                    return (
                        <div className='transaction-row' key={i}>
                            <div>
                                <span>{`Bought (${ticker})`}</span>
                                <span>{line}</span>
                                <span className='emphasize-text'>{`${shares} share${s} `}</span>
                                <span>@</span>
                                <span className='emphasize-text'>{` $${unitPrice} `}</span>
                                <span><i className='fa fa-long-arrow-right'></i></span>
                                <span>{` $${total}`}</span>
                            </div>
                            <div>{date}</div>
                        </div>
                    );
                })}
            </div>
        </>
    }
}