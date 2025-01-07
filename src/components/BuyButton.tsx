"use client";

import { buyProduct } from "@/actions/products";
import Image from "next/image";
import React, { Dispatch, SetStateAction, useState } from "react";
import toast from "react-hot-toast";

const OptionButton = ({
  productId,
  value,
  setShowOption,
}: {
  productId: string;
  value: number;
  setShowOption: Dispatch<SetStateAction<boolean>>;
}) => {
  const [visa, setVisa] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState<string>("");

  const handleBuy = () => {
    if (phoneNumber === "841234567") {
      buyProduct(productId, value);
      toast.success("Success");
    } else {
      toast.error("Error");
    }
  };

  return (
    <div className="payment  rounded-lg flex flex-col gap-4 p-4">
      <div className="options flex justify-between">
        <h4>Pagar via: </h4>
        <div className="choose flex border rounded-sm">
          <button
            className={!visa ? "bg-zinc-100 px-1" : " px-1"}
            onClick={() => {
              setVisa(false);
            }}
          >
            m-pesa
          </button>
          <div className="h-full w-1 bg-zinc-100"></div>
          <button
            className={visa ? "bg-zinc-100 px-1" : " px-1"}
            onClick={() => {
              setVisa(true);
            }}
          >
            visa
          </button>
        </div>
        <button
          className="close-options"
          onClick={(e) => {
            e.preventDefault();
            setShowOption(false);
          }}
        >
          <Image
            src="/assets/jam-close.png"
            width={32}
            height={32}
            alt="close"
          />
        </button>
      </div>
      {!visa ? (
        <div className="payment-details flex flex-col rounded-lg p-4 gap-4">
          <label htmlFor="numero">Numero de telefone</label>
          <input
            className="w-full h-8 rounded-sm px-2 p-1"
            type="tel"
            placeholder="841234567"
            pattern="[0-9]{2} [0-9]{2} [0-9]{2} [0-9]{3}"
            maxLength={9}
            name="numero"
            id="numero"
            value={phoneNumber}
            onChange={(e) => {
              e.preventDefault();
              setPhoneNumber(e.target.value);
            }}
            required
          />
        </div>
      ) : (
        <div className="visa-option">
          <span>Temporariamente invalida </span>
        </div>
      )}

      <button
        onClick={(e) => {
          e.preventDefault();
          handleBuy();
        }}
        className="button-quero p-4 rounded-lg"
      >
        COMPRAR
      </button>
    </div>
  );
};

export default function BuyButton({
  productId,
  price,
}: {
  productId: string;
  price: number;
}) {
  const [showOption, setShowOption] = useState<boolean>(false);
  const [quantityValue, setQuantityValue] = useState<number>(1);
  return (
    <div className="w-full flex flex-col gap-4 ">
      <div className="quantity-buy flex justify-between ">
        <label htmlFor="quantity">Quantidade:</label>
        <input
          className="w-10 px-1 "
          type="number"
          value={quantityValue}
          onChange={(e) => {
            const value = parseInt(e.target.value);
            setQuantityValue(value);
          }}
        />
      </div>

      {showOption ? (
        <OptionButton
          productId={productId}
          value={quantityValue}
          setShowOption={setShowOption}
        />
      ) : (
        <div className="">
          {quantityValue > 1 && (
            <div className="total-price flex justify-between">
              <h4>Total a pagar:</h4>
              <h5>{price * quantityValue}.00 MZN</h5>
            </div>
          )}
          <button
            onClick={(e) => {
              e.preventDefault();
              setShowOption(!showOption);
            }}
            className="button-quero p-4 rounded-lg"
          >
            Eu Quero
          </button>
        </div>
      )}
    </div>
  );
}
