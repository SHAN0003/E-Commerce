import DescriptionBox from "../compon/DescriptionBox/DescriptionBox";
import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import Breadcrum from "../compon/Breadcrums/Breadcrum";
import ProductDisplay from "../compon/ProductDisplay/ProductDisplay";
import { ShopContext } from "../Context/ShopContext";
import RelatedProducts from "../compon/RelatedProducts/RelatedProducts";

const Product = () => {
  const { all_product } = useContext(ShopContext);
  const { productId } = useParams();
  const product = all_product.find((e) => e.id === Number(productId));

  return (
    <div>
      <Breadcrum product={product} />
      <ProductDisplay product={product} />
      <DescriptionBox />
      <RelatedProducts />
    </div>
  );
};

export default Product;
