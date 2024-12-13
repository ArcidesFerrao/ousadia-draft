import React from "react";

export default function ProductCard({ ...props }) {
  return (
    <div className="product-card flex flex-col my-4 overflow-hidden">
      <div className="product-image ">
        <img
          src={props.imageUrl}
          alt="Maningue Cenas"
          width={220}
          height={220}
        />
      </div>
      <div className="product-sell flex justify-between py-4 ">
        <div className="product-name">{props.name}</div>
        <div className="product-price font-medium">{props.price} MZN</div>
      </div>
    </div>
  );
}
