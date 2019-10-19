import React from 'react';
import EachStock from './each_stock';
import './styling/ownstock.css';

export default (props) => {
    const {stocks} = props;
    
    if (!stocks.length){
        return <div className='no-stock-msg'>No stocks in your portfolio yet.</div>
    } else {
        return <div className='stock-list-container-inner'>
            {stocks.map((s,i) =>{
                return <EachStock stock={s} key={i}/>
            })}
        </div>
    }
}