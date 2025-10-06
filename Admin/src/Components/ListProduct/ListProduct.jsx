import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import "./ListProduct.scss";
import cross_icon from "../../assets/cross_icon.png"

const ListProduct = () => {

  const [allproducts, setAllproducts] = useState([]);

  const fetchInfo = async () => {
    await fetch("http://localhost:4000/allproducts")
      .then((res) => res.json())
      .then((data) => {
        setAllproducts(data);
      });
    };

    useEffect(()=>{
      fetchInfo();
    }, []);

    const remove_product =async (id) => {
      await fetch("http://localhost:4000/removeproduct", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },        
        body: JSON.stringify({id:id})
      })
      await fetchInfo();
    }


    let a = allproducts.map((product)=>product.id)
    console.log(a[a.length-1]);              //this for counting the number of product


  return (
    <div className="listproduct">
      <h1>All Products List ({a[a.length-1]})</h1>
      <div className="listproduct-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Old Price</p>
        <p>New Price</p>
        <p>Category</p>
        <p>Remove</p>
      </div>
      <div className="listproduct-allproducts">
        <hr />
        {allproducts.map((product, index)=>{
          return <>
          <div key={index} className="listproduct-format-main listproduct-format">
            <img src={product.image} alt="" className="listproduct-product-icon" />
            <p>{product.name}</p>
            <p>${product.old_price}</p>
            <p>${product.new_price}</p>
            <p>{product.category}</p>
            <img onClick={()=>{remove_product(product.id)}} src={cross_icon} alt="" className="listproduct-remove-icon" />
          </div>
          <hr />
          </>
        })}
      </div>
    </div>
    
  );
};

export default ListProduct;
