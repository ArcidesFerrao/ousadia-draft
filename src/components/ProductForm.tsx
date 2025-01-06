"use client";

import { addProduct } from "@/actions/products";
import { UploadDropzone } from "@/utils/uploadthing";
import Image from "next/image";
import React, { useActionState, useEffect, useState } from "react";
import { useForm } from "@conform-to/react";
import { useFormStatus } from "react-dom";
import { parseWithZod } from "@conform-to/zod";
import { addSchema } from "@/schema/productSchema";

type Category = {
  id: number;
  name: string;
  description: string | null;
};

export default function ProductForm() {
  const [state, action, pending] = useActionState(addProduct, undefined);
  const [priceFormat, setPriceFormat] = useState<number | null>(null);
  const [categoriesL, setCategoriesL] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [mainImage, setMainImage] = useState<string>();
  const [backImage, setBackImage] = useState<string>();

  const [form, fields] = useForm({
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: addSchema });
    },
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });

  const handleCategoryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedCategory(event.target.value.toString());
    console.log(selectedCategory);
  };

  useEffect(() => {
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
  }, []);

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value ? parseFloat(e.target.value) : null;
    setPriceFormat(value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();

    // formData.append("name", form.value?.name || "");
    // formData.append("color", form.value?.color || "");
    // formData.append("brand", form.value?.brand || "");
    // formData.append("price", form.value?.price || "");
    // formData.append("size", form.value?.size || "");
    // formData.append("category", form.value?.category || "");
    // formData.append("stock", form.value?.stock || "");
    // formData.append("imageUrl", mainImage || "");

    // const formData = {
    //   name: form.value?.name,
    //   color: form.value?.color,
    //   brand: form.value?.brand,
    //   price: form.value?.price,
    //   size: form.value?.size,
    //   category: form.value?.category,
    //   stock: form.value?.stock,
    //   imageUrl: mainImage,
    // };

    console.log("Form Data: ", formData);

    // try {
    //   action(formData);
    // } catch (error) {
    //   console.error("Error: ", error);
    // }

    form.onSubmit(e);
  };

  return (
    <div className="form-section flex flex-col items-center py-4 gap-4">
      <h2>Adicionar Produto</h2>
      <div className="form-product flex flex-col">
        <form
          id={form.id}
          onSubmit={handleSubmit}
          action={action}
          className="flex flex-col gap-6 p-4 h-fit"
        >
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

          <div className="imagesUpload flex  gap-4">
            <div className="main-image-upload flex flex-col gap-4">
              <h3>Main Image</h3>
              {mainImage ? (
                <Image
                  src={mainImage}
                  width={300}
                  height={300}
                  alt="main image"
                />
              ) : (
                <UploadDropzone
                  className="ut-labe:text-md ut-allowed-content:ut-uploading:text-red-200"
                  endpoint="imageUploader"
                  onClientUploadComplete={(resMain) => {
                    console.log("Files: ", resMain);
                    setMainImage(resMain[0].url);
                    alert("Upload Completed");
                  }}
                  onUploadError={() => {
                    alert("something went wrong");
                  }}
                />
              )}
            </div>
            <div className="back-image-upload  flex flex-col gap-4">
              <h3>Back Image</h3>
              {backImage ? (
                <Image
                  src={backImage}
                  alt="back image"
                  width={300}
                  height={300}
                />
              ) : (
                <UploadDropzone
                  endpoint="imageUploader"
                  onClientUploadComplete={(resBack) => {
                    console.log("Files: ", resBack);
                    setBackImage(resBack[0].url);

                    alert("Upload Completed");
                  }}
                  onUploadError={() => {
                    alert("something went wrong");
                  }}
                />
              )}
            </div>
          </div>
          <SubmitButton />
        </form>
        {/* {errorList && (
          <ul>
            {Object.entries(errorList).map(([key, value]) => (
              <li className="error" key={key}>
                {key}: {value}
              </li>
            ))}
          </ul>
        )} */}
        {fields.name.errors && (
          <p className="errorsField">{fields.name.errors}</p>
        )}
        {fields.price.errors && (
          <p className="errorsField">{fields.price.errors}</p>
        )}
        {fields.stock.errors && (
          <p className="errorsField">{fields.stock.errors}</p>
        )}
        {state?.message}
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
