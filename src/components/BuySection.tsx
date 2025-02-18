"use client";
import { useEffect, useState } from "react";

export const BuySection = ({
  //   productId,
  imageUrl,
  price,
  productSize,
  discounted,
  discountAmount,
}: {
  //   productId: string;

  imageUrl: string;
  price: number;
  productSize: { id: string; size: string; stock: number }[];
  discounted: boolean;
  discountAmount?: number;
}) => {
  //   const [showOption, setShowOption] = useState<boolean>(false);
  const [quantityValue, setQuantityValue] = useState<number>(1);
  const [selectedSize, setSelectedSize] = useState<{
    size: string;
    stock: number;
  } | null>(null);
  const [unavalilableProduct, setUnavalilableProduct] = useState(false);

  useEffect(() => {
    if (productSize.every((size) => size.stock <= 1)) {
      setUnavalilableProduct(true);
    }
    if (productSize.length > 0) {
      setSelectedSize(productSize[0]);
    }
  }, [productSize]);

  const handleSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = productSize.find((size) => size.size === e.target.value);
    if (selected) {
      setSelectedSize(selected);
      setQuantityValue(1);
    }
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10) || 1;

    if (selectedSize && value <= selectedSize.stock) {
      setQuantityValue(value);
    } else {
      setQuantityValue(selectedSize?.stock || 1);
    }
  };

  return (
    <div className="buy-with-size w-full flex flex-col gap-4 ">
      <div className="info-size flex justify-between gap-4 h-fit">
        {!unavalilableProduct && <h4>Tamanho:</h4>}

        <div className="product-sizes flex gap-4">
          {unavalilableProduct ? (
            <p>Out of stock</p>
          ) : (
            productSize
              .filter((size) => size.stock > 1)
              .map((size) => (
                <div key={size.id} className="product-size flex gap-2">
                  <label className="radio">
                    <input
                      type="radio"
                      name="size"
                      id={size.size}
                      value={size.size}
                      checked={selectedSize?.size === size.size}
                      onChange={handleSizeChange}
                    />
                    <span className="radio-option">
                      {size.size.toLocaleUpperCase()}
                    </span>
                  </label>
                </div>
              ))
          )}
        </div>
      </div>
      {!unavalilableProduct && (
        <div className="quantity-buy flex justify-between ">
          <label htmlFor="quantity">Quantidade:</label>
          <input
            className="w-10 px-1 "
            type="number"
            value={quantityValue}
            min={1}
            max={selectedSize?.stock || 1}
            onChange={handleQuantityChange}
          />
        </div>
      )}
      {discounted && (
        <div className="discounted flex justify-between">
          <h4>Desconto:</h4>
          <h5>{discountAmount}%</h5>
        </div>
      )}
      {!unavalilableProduct && (
        <div className="flex flex-col gap-4">
          {discounted ? (
            <div className="total-price flex justify-between text-gray-500">
              <h4>Total a pagar:</h4>
              {discountAmount ? (
                <h5>{price * (1 - discountAmount / 100) * quantityValue}</h5>
              ) : (
                <h5>{price * quantityValue}.00 MZN</h5>
              )}
            </div>
          ) : (
            <div className="total-price flex justify-between text-gray-500">
              <h4>Total a pagar:</h4>
              <h5>{price * quantityValue}.00 MZN</h5>
            </div>
          )}
          <button
            onClick={(e) => {
              e.preventDefault();
              //   setShowOption(!showOption);
              const phoneN = "258845398661";
              const message = encodeURIComponent("I want this t-shirt");
              const whatsappUrl = `https://wa.me/${phoneN}?text=${message}%0A${imageUrl}`;

              window.open(whatsappUrl, "_blank");
            }}
            className="button-quero p-4 rounded-lg"
          >
            Eu Quero
          </button>
        </div>
      )}
    </div>
  );
};
