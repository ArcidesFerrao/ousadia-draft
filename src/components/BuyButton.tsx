"use client";

import React, { useState } from "react";

const OptionButton = () => {
  const [visa, setVisa] = useState(false);
  return (
    <div className="payment flex flex-col gap-4 p-4">
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
      </div>
      {!visa ? (
        <div className="payment-details flex flex-col rounded-lg p-4 gap-4">
          <label htmlFor="numero">Numero de telefone</label>
          <input
            className="w-full rounded-sm p-1"
            type="tel"
            name="numero"
            id="numero"
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
        }}
        className="button-quero p-4 rounded-lg"
      >
        COMPRAR
      </button>
    </div>
  );
};

export default function BuyButton() {
  const [showOption, setShowOption] = useState(false);
  return (
    <div className="w-full flex flex-col gap-4">
      {showOption ? (
        <OptionButton />
      ) : (
        <button
          onClick={(e) => {
            e.preventDefault();
            setShowOption(!showOption);
          }}
          className="button-quero p-4 rounded-lg"
        >
          Eu Quero
        </button>
      )}
    </div>
  );
}
