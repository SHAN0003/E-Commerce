import React from 'react'
import "./RelatedProducts.scss"
import data_product from "../Assets/data"
import Item from "../Items/Item"


const RelatedProducts = () => {
  return (
    <div className='relatedproducts'>
      <h1>Related Products</h1>
      <hr />
      <div className="relatedproduct-item">
        {data_product.map((item, i) => {
            return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} high_light={item.high_light}/>
        })}
      </div>
    </div>
  )
}

export default RelatedProducts
