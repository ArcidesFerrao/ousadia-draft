"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function ProductCard({ ...props }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div className="product-card flex flex-col my-4 overflow-hidden w-52">
      <Link href={`/produtos/${props.id}`}>
        <div className="product-image ">
          <Image
            src={props.imageUrl}
            alt="Maningue Cenas"
            width={220}
            height={220}
          />
        </div>
        <div className="product-sell flex justify-between items-center">
          <div className="product-name">{props.name}</div>
          <div
            className={
              hovered
                ? "buy product-price font-medium"
                : "product-price font-medium"
            }
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            <h4 className={!hovered ? "hidden" : ""}>Eu Quero</h4>
            <h4>{props.price} MZN</h4>
          </div>
        </div>
      </Link>
    </div>
  );
}

export const DashProductCard = ({ ...props }) => {
  return (
    <div className="dash-product-card flex gap-4 p-4 rounded-lg">
      <div className="product-image ">
        <Image
          src={props.imageUrl}
          alt="Maningue Cenas"
          width={80}
          height={80}
        />
      </div>
      <div className="product-card-detail flex flex-col justify-between ">
        <div className="detail-head">
          <div className="product-name">
            <h3>{props.name}</h3>
          </div>
          <div className="product-name">
            <h2>{props.price}</h2>
          </div>
        </div>
        <div className="detail-footer flex gap-2">
          <h3>{props.quantity}</h3>
          <p>Pedidos</p>
        </div>
      </div>
    </div>
  );
};
