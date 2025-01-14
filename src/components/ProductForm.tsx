"use client";

import { UploadDropzone } from "@/utils/uploadthing";
import Image from "next/image";
import React, { useActionState, useEffect, useState } from "react";
import { useForm } from "@conform-to/react";
// import { useFormStatus } from "react-dom";
import { parseWithZod } from "@conform-to/zod";
import { addSchema } from "@/schema/productSchema";
import { Product, ProductSize } from "@prisma/client";
import { updateProduct } from "@/actions/products";

type Category = {
  id: number;
  name: string;
  description: string | null;
};

export default function ProductForm({
  product,
  productSize,
}: {
  product?: Product | null;
  productSize?: ProductSize[] | null;
}) {
  const [state, action, pending] = useActionState<undefined | Product>(
    updateProduct,
    product
  );
  const [priceFormat, setPriceFormat] = useState<number | null>(
    product?.price || null
  );
  const [categoriesL, setCategoriesL] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [mainImage, setMainImage] = useState<string>();

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
  }, [state]);

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value ? parseFloat(e.target.value) : null;
    setPriceFormat(value);
  };

  return (
    <div className="form-product flex flex-col">
      <form
        id={form.id}
        // onSubmit={handleSubmit}
        onSubmit={form.onSubmit}
        action={action}
        className="flex flex-col gap-6 p-4 h-fit"
      >
        <div className="name-price flex gap-4">
          <div className="name  flex justify-between">
            <label htmlFor="name">Nome:</label>
            <input
              type="text"
              id="name"
              name="name"
              disabled={pending}
              defaultValue={product?.name}
            />
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
                  defaultChecked={product?.categoryId === category.id}
                />
                <span className="radio-option">{category.name}</span>
              </label>
            ))}
          </div>
        </div>

        <div></div>

        <div className="bottom-section flex justify-between gap-8">
          <div className="left-section flex flex-col gap-4 justify-between">
            <div className="color flex justify-between">
              <label htmlFor="color">Cor:</label>
              <input
                type="text"
                id="color"
                name="color"
                defaultValue={product?.color}
              />
            </div>
            <div className="brand flex justify-between">
              <label htmlFor="brand">Marca:</label>
              <input
                type="text"
                id="brand"
                name="brand"
                defaultValue={product?.brand}
              />
            </div>
          </div>
          <div className="size flex flex-col gap-4">
            <label>Tamanho:</label>
            <div className="sizeInput flex gap-4">
              {productSize &&
                ["s", "m", "l", "xl"].map((size) => {
                  const sizeData = productSize.find((ps) => ps.size === size);
                  const isZero = sizeData?.stock === 0;
                  return (
                    <label
                      key={size}
                      htmlFor={size.toLocaleLowerCase()}
                      className="flex flex-col"
                    >
                      <span>{size.toLocaleUpperCase()}</span>
                      <input
                        type="number"
                        min={0}
                        id={size.toLocaleLowerCase()}
                        name={size.toLocaleLowerCase()}
                        defaultValue={sizeData?.stock || 0}
                        className={isZero ? "sizeZero" : ""}
                      />
                    </label>
                  );
                })}
            </div>
          </div>
        </div>

        <div className="imagesUpload flex justify-center">
          <div className="main-image-upload flex flex-col gap-4">
            <h3>Main Image</h3>
            <input type="hidden" value={mainImage} name="imageUrl" />
            {mainImage || product?.imageUrl ? (
              <Image
                src={mainImage || product?.imageUrl || ""}
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
        </div>
        <SubmitButton pending={pending} />
      </form>
      {fields.name.errors && (
        <p className="errorsField">{fields.name.errors}</p>
      )}
      {fields.price.errors && (
        <p className="errorsField">{fields.price.errors}</p>
      )}
    </div>
  );
}

const SubmitButton = ({ pending }: { pending: boolean }) => {
  return (
    <input
      className={pending ? "sudmit-button" : ""}
      type="submit"
      name="submit"
      id="submit"
      value={pending ? "Updating..." : "Update"}
      disabled={pending}
    />
  );
};
