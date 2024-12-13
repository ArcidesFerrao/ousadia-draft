"use client";
import React, { useState } from "react";
import Link from "next/link";

export default function ProductCard({ ...props }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div className="product-card flex flex-col my-4 overflow-hidden">
      <Link href={`/produtos/${props.key}`}>
        <div className="product-image ">
          <img
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
