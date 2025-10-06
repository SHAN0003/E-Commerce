import React from 'react'
import "./NewCollection.scss"
// import new_collection from "../Assets/new_collections"
import Item from "../Items/Item"
import { useState } from 'react'
import { useEffect } from 'react'

const NewCollection = () => {
  
  const [new_collections, setNew_collections] = useState([]);
  
  useEffect(()=>{
    fetch("http://localhost:4000/newcollections")
    .then((response)=>response.json())
    .then((data)=>setNew_collections(data));
  }, []);

  return (
    <div className='new-collection'>
      <h1>NEW COLLECTIONS</h1>
      <hr />
      <div className="collections">
        {new_collections.map((item, i) => {
            return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} high_light={item.high_light}/>
        })}
      </div>
    </div>
  )
}

export default NewCollection
