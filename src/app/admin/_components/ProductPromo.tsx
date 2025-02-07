import React from "react";

export default function ProductPromo({
  data,
}: {
  data: {
    id: string;
    name: string;
    discountAmount: number | null;
  }[];
}) {
  return (
    <div className="dash-card-most flex flex-col w-full max-w-fit rounded-lg py-6 px-8 gap-4 ">
      <div className="promo-title">
        <h3>Promo</h3>
      </div>
      {data &&
        data.map((product) => (
          <div key={product.id} className="promotions">
            <span>
              {product.discountAmount}% de disconto - &quot;{product.name}&quot;
            </span>
          </div>
        ))}
    </div>
  );
}
