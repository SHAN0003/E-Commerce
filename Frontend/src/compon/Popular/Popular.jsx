import React, { useState } from 'react'
import "./Popular.scss"
// import data_product from "../Assets/data"
import Item from '../Items/Item'
import { useEffect } from 'react';

const Popular = () => {

  const [popularProducts, setPopularProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/popularinwomen")
    .then((response)=>response.json())
    .then((data)=>setPopularProducts(data));
  }, []);


  return (
    <div className='popular'>
      <h1>POPULAR IN WOMEN</h1>
      <hr />
      <div className="popular-item">
        {popularProducts.map((item, i) => {
            return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} high_light={item.high_light}/>
        })}
      </div>
    </div>
  )
}

export default Popular
