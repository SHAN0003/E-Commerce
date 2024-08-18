import React from 'react'
import "./NewCollection.scss"
import new_collection from "../Assets/new_collections"
import Item from "../Items/Item"

const NewCollection = () => {
  // let obj = new_collection[2]
  // console.log(Object.keys(obj).length);

  // console.log(Object.keys(new_collection[0])[5]);

  // for(let ele in new_collection){
  //   console.log(Object.keys(new_collection[ele]).length);
  // }
  
  
  return (
    <div className='new-collection'>
      <h1>NEW COLLECTIONS</h1>
      <hr />
      <div className="collections">
        {new_collection.map((item, i) => {
            return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} high_light={item.high_light}/>
        })}
      </div>
    </div>
  )
}

export default NewCollection
