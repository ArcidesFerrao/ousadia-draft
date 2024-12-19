"use client";
import React, { useState } from "react";
import { useFormState } from "react-dom";

export default function ProductForm() {
  const [error, action] = useFormState(addProduct, {});
  const [priceFormat, setPriceFormat] = useState<number | null>(null);

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value ? parseFloat(e.target.value) : null;
    setPriceFormat(value);
  };
  return (
    <div className="form-section flex flex-col items-center py-4 gap-4">
      <h2>Adicionar Produto</h2>
      <div className="form-product">
        <form action="" className="flex flex-col gap-6 p-4 h-fit">
          <div className="name-price flex gap-4">
            <div className="name  flex justify-between">
              <label htmlFor="name">Nome:</label>
              <input type="text" id="name" name="name" />
            </div>
            <div className="price flex gap-2 items-center">
              <label htmlFor="price">Preco:</label>
              <input
                type="number"
                id="price"
                name="price"
                value={priceFormat !== null ? priceFormat.toString() : ""}
                onChange={handlePriceChange}
              />
              <span>
                <p>
                  {priceFormat !== null
                    ? `${priceFormat.toFixed(2)} MZN`
                    : "0.00 MZN"}
                </p>
              </span>
            </div>
          </div>
          <div className="category flex justify-between">
            <h3>Categoria:</h3>
            <div className="radio-category flex gap-2">
              <label className="radio">
                <input
                  type="radio"
                  name="category"
                  id="shirts"
                  value="T-shirts"
                />
                <span className="radio-option">T-Shirts</span>
              </label>
              <label className="radio">
                <input type="radio" name="category" id="bones" value="bones" />
                <span className="radio-option">Bones</span>
              </label>
              <label className="radio">
                <input
                  type="radio"
                  name="category"
                  id="collabs"
                  value="collabs"
                />
                <span className="radio-option">Collabs</span>
              </label>
              <label className="radio">
                <input
                  type="radio"
                  name="category"
                  id="marcas"
                  value="marcas"
                />
                <span className="radio-option">Marcas</span>
              </label>
            </div>
          </div>
          <div className="bottom-section flex justify-between">
            <div className="left-section flex flex-col gap-4">
              <div className="color flex justify-between">
                <label htmlFor="color">Cor:</label>
                <input type="text" id="color" name="color" />
              </div>
              <div className="marca flex justify-between">
                <label htmlFor="marca">Marca:</label>
                <input type="text" id="marca" name="marca" />
              </div>
              <div className="quantidade flex justify-between">
                <label htmlFor="stock">Quantidade:</label>
                <input type="number" id="stock" name="stock" />
              </div>
            </div>
            <div className="right-section">
              <div className="size flex flex-col gap-4">
                <h3>Tamanho:</h3>
                <div className="radio-sizes flex gap-2">
                  <label className="radio">
                    <input type="radio" name="size" id="S" value="small" />
                    <span className="radio-option">S</span>
                  </label>
                  <label className="radio">
                    <input type="radio" name="size" id="M" value="medium" />
                    <span className="radio-option">M</span>
                  </label>
                  <label className="radio">
                    <input type="radio" name="size" id="L" value="large" />
                    <span className="radio-option">L</span>
                  </label>
                  <label className="radio">
                    <input
                      type="radio"
                      name="size"
                      id="XL"
                      value="extra-large"
                    />
                    <span className="radio-option">XL</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="images-section">
            <div className="image flex justify-between">
              <div className="sideImage flex flex-col gap-2">
                <h3>Main Image</h3>
                <label htmlFor="mainImage">+</label>
                <input
                  type="file"
                  id="mainImage"
                  name="mainImage"
                  accept="image/jpeg"
                />
              </div>
              <div className="sideImage flex flex-col gap-2">
                <h3>Side Image</h3>

                <label htmlFor="sideImage">+</label>
                <input
                  type="file"
                  id="sideImage"
                  name="sideImage"
                  accept="image/jpeg"
                />
              </div>
              <div className="sideImage flex flex-col gap-2">
                <h3>Side Image</h3>

                <label htmlFor="sideImage">+</label>
                <input
                  type="file"
                  id="sideImage"
                  name="sideImage"
                  accept="image/jpeg"
                />
              </div>
              <div className="sideImage flex flex-col gap-2">
                <h3>Back Image</h3>

                <label htmlFor="backImage">+</label>
                <input
                  type="file"
                  id="backImage"
                  name="backImage"
                  accept="image/jpeg"
                />
              </div>
            </div>
          </div>
          <input type="submit" name="submit" id="submit" value="Add" />
        </form>
      </div>
    </div>
  );
}
