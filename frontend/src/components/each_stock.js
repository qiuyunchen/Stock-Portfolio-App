import React from 'react';
import Axios from 'axios';
import './styling/each_stock.css';

export default class EachStock extends React.Component {
    state = {
        ticker: '',
        shares: 0,
        value: 0,
        color: 'grey',
    }

    componentDidMount(){
        const {stock} = this.props;
        this.getStockPerformance(stock);
    }

    componentWillReceiveProps(newProps){
        const {stock} = newProps;
        this.getStockPerformance(stock);
    }

    getStockPerformance = (stock) =>{
        const {ticker, shares} = stock;
        const pubToken = 'pk_b162cbdbebdc4449bcd3dbe59b054079';
        const getCurrPrice = Axios.get(`https://cloud.iexapis.com/stable/stock/${ticker}/price?token=${pubToken}`);
        const getOpenPrice = Axios.get(`https://cloud.iexapis.com/stable/stock/${ticker}/ohlc?token=${pubToken}`);
        
        Promise.all([getOpenPrice,getCurrPrice])
            .then( ([res1, res2]) =>{
                const openPrice = res1.data.open.price;
                const currPrice = res2.data;
                const value = (currPrice * shares).toFixed(2);
                let color = 'grey';
                if(currPrice > openPrice){
                    color = 'green';
                } else if(currPrice < openPrice){
                    color = 'red';
                }
                return {value, color};
            })
            .then(({value, color}) =>{
                this.setState({ticker, shares, value, color})
            })
            .catch(err => console.log(err.toString()) )
    }

    render(){
        const {ticker, shares, value, color} = this.state;

        return <div className='stock-row' style={{color:color}}>
            <div>{`${ticker} - ${shares} shares`}</div>
            <div>{`$${value}`}</div>
        </div>
    }
}