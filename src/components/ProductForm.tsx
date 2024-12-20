"use client";

import { addProduct } from "@/actions/products";
import { UploadButton } from "@/utils/uploadthing";
import React, { useActionState, useEffect, useState } from "react";
import { useFormStatus } from "react-dom";
// import { Categories } from "./Categories";

type ErrorList = {
  [key: string]: string[];
};

type Category = {
  id: number;
  name: string;
  description: string | null;
};

export default function ProductForm() {
  const [state, action, pending] = useActionState(addProduct, null);
  const [priceFormat, setPriceFormat] = useState<number | null>(null);
  const [errorList, setErrorList] = useState<ErrorList>({});
  const [categoriesL, setCategoriesL] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleCategoryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedCategory(event.target.value.toString());
    console.log(selectedCategory);
  };

  useEffect(() => {
    if (state?.errors) {
      setErrorList(state?.errors);
    }

    const getCategories = async () => {
      try {
        const res = await fetch("/api/categories");
        if (!res.ok) throw new Error("Error fetching categories");
        const categoryData = await res.json();
        setCategoriesL(categoryData);
      } catch (error) {
        console.error("Error fetching categories: ", error);
      }
    };

    getCategories();
  }, [state?.errors]);

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value ? parseFloat(e.target.value) : null;
    setPriceFormat(value);
  };
  return (
    <div className="form-section flex flex-col items-center py-4 gap-4">
      <h2>Adicionar Produto</h2>
      <div className="form-product flex flex-col">
        <form action={action} className="flex flex-col gap-6 p-4 h-fit">
          <div className="name-price flex gap-4">
            <div className="name  flex justify-between">
              <label htmlFor="name">Nome:</label>
              <input type="text" id="name" name="name" disabled={pending} />
            </div>
            <div className="price flex gap-2 items-center">
              <label htmlFor="price">Preco:</label>
              <input
                type="number"
                id="price"
                name="price"
                min={100}
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

          {/* <Categories onCategoryChange={handleCategoryChange} /> */}
          <div className="category flex justify-between">
            <h3>Categoria:</h3>
            <div className="radio-category flex gap-2">
              {categoriesL.map((category) => (
                <label key={category.id} className="radio">
                  <input
                    type="radio"
                    name="category"
                    value={category.id}
                    onChange={handleCategoryChange}
                  />
                  <span className="radio-option">{category.name}</span>
                </label>
              ))}
            </div>
          </div>
          <div className="bottom-section flex justify-between">
            <div className="left-section flex flex-col gap-4">
              <div className="color flex justify-between">
                <label htmlFor="color">Cor:</label>
                <input type="text" id="color" name="color" />
              </div>
              <div className="brand flex justify-between">
                <label htmlFor="brand">Marca:</label>
                <input type="text" id="brand" name="brand" />
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
          <div className="imagesUpload">
            <UploadButton
              endpoint="imageUploader"
              onClientUploadComplete={(res) => {
                console.log("Files: ", res);
                alert("Upload Completed");
              }}
            />
          </div>
          <SubmitButton />
        </form>
        {errorList && (
          <ul>
            {Object.entries(errorList).map(([key, value]) => (
              <li className="error" key={key}>
                {key}: {value}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

const SubmitButton = () => {
  const { pending } = useFormStatus();

  return (
    <input
      className={pending ? "sudmit-button" : ""}
      type="submit"
      name="submit"
      id="submit"
      value="Add"
      disabled={pending}
    />
  );
};
