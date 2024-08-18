import { Link } from "react-router-dom";
import React from "react";
import "./Item.scss";
// import new_collections from "../Assets/new_collections";
// import data from "../Assets/data"
// import all_product from "../Assets/all_product"

const Item = (props) => {
  if (props.high_light) {
    return (
      <div className="item">
        <Link to={`/product/${props.id}`}>
          <img onClick={window.scrollTo(0, 0)} src={props.image} alt="" />
        </Link>
        <p>{props.name}</p>
        <div className="item-prices">
          <div className="item-price-new">${props.new_price}</div>
          <div className="item-price-old">${props.old_price}</div>
          <div className="item-price-old no-line">{props.high_light}</div>

          {/* {Object.keys(new_collections[0]).length===5 ? <div className="high_light">⭐</div> : <></>} */}
        </div>
      </div>
    );
  } else {
    return (
      <div className="item">
        <Link to={`/product/${props.id}`}>
          <img onClick={window.scrollTo(0, 0)} src={props.image} alt="" />
        </Link>
        <p>{props.name}</p>
        <div className="item-prices">
          <div className="item-price-new">${props.new_price}</div>
          <div className="item-price-old">${props.old_price}</div>
          {/* {Object.keys(new_collections[0]).length===5 ? <div className="high_light">⭐</div> : <></>} */}
        </div>
      </div>
    );
  }

  // return (
  //   <div className="item">

  //     <Link to={`/product/${props.id}`}>

  //       <img onClick={window.scrollTo(0,0)} src={props.image} alt="" />
  //     </Link>
  //     <p>{props.name}</p>
  //     <div className="item-prices">
  //       <div className="item-price-new">${props.new_price}</div>
  //       <div className="item-price-old">${props.old_price}</div>
  //       {/* {Object.keys(new_collections[0]).length===5 ? <div className="high_light">⭐</div> : <></>} */}
  //     </div>
  //   </div>
  // );
};

export default Item;
