import React from 'react';
import Axios from 'axios';

export default class PortfolioValue extends React.Component {
    state = {
        value: 0,
    }

    componentDidMount(){
        const {stocks} = this.props;
        this.updatePortfolioValue(stocks);
    }

    componentWillReceiveProps(newProps){
        const {stocks} = newProps;
        this.updatePortfolioValue(stocks);
    }

    updatePortfolioValue = stocks =>{
        if(!stocks.length){
            this.setState({value: ' - '})
        } else {
            const getPricePromises = stocks.map( e =>{
                // const pubToken = 'pk_b162cbdbebdc4449bcd3dbe59b054079';
                // const priceUrl = `https://cloud.iexapis.com/stable/stock/${e.ticker}/price?token=${pubToken}`;
                const APIKey = 'OjE0N2JkZjlmYWMxYmI4YzMzZGUxN2RjMjkxMDY2OGI2'
                const priceUrl = `https://api-v2.intrinio.com/securities/${e.ticker}/prices/realtime?api_key=${APIKey}`
                const pending = Axios.get(priceUrl);
                return pending;
            })
            Promise.all(getPricePromises)
                .then(prices =>{
                    return prices.reduce( (acc, res, i) =>{
                        console.log(res)
                        const price = res.data.last_price;
                        const {shares} = stocks[i];
                        const stockValue = price * shares;
                        return acc + stockValue;
                    }, 0)
                })
                .then(sum =>{
                    this.setState({value: sum.toFixed(2)})
                })
                .catch(err => console.log(err.toString()))
        }
    }

    render(){
        const {value} = this.state;
        return <h1>Portfolio ( <b>${value}</b> )</h1>
    }
}