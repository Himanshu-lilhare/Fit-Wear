"use client";
import { useEffect, useState } from "react";
import "./create-product.css";
import { useForm } from "react-hook-form";
import axios from "axios";
import { serverLink } from "../ServerLink";

interface CreateProductFormFields {
  name: string;
  description: string;
  price: number;
  images: FileList;
  category: "t-shirts" | "jeans";
  seller: string;
  stock: number;
}

export const CreateProduct = () => {
  const form = useForm<CreateProductFormFields>();
  const { register, handleSubmit, formState, watch, getValues, setValue } =
    form;
  const { errors } = formState;
  const [selectedImagesUrls, setSelectedeImagesUrls] = useState<any>();
  const selectedImages = watch("images");

  async function createCourse(data: CreateProductFormFields) {
    console.log(getValues());
    try {
      const { data: response } = await axios.post(
        `${serverLink}/createProduct`,
        {
          name: data.name,
          description: data.description,
          category: data.category,
          seller: data.seller,
          stock: data.stock,
          images: data.images,
          price: data.price,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      console.log(response?.createdProduct);
    } catch (error: any) {
      alert(`${error?.response?.data?.message}`);
    }
  }

  useEffect(() => {
    let urlArray = [];

    if (selectedImages) {
      for (let i = 0; i < selectedImages.length; i++) {
        urlArray.push(URL.createObjectURL(selectedImages[i]));
      }
      setSelectedeImagesUrls(urlArray);
      console.log(selectedImagesUrls)
    }
  }, [selectedImages]);

  return (
    <form
      noValidate
      className="create-product-form"
      onSubmit={handleSubmit(createCourse)}
    >
      <input
        type="text"
        placeholder="Name"
        {...register("name", {
          required: "Name is Required",
          minLength: {
            message: "Min Length should be 3",
            value: 3,
          },
          maxLength: {
            value: 40,
            message: "Max Limit is 40 Characters",
          },
        })}
      />
      <p style={{ color: "red", fontSize: "2rem" }}>{errors.name?.message}</p>

      <input
        type="text"
        placeholder="Description"
        {...register("description", {
          required: "Description is required",
          minLength: {
            message: "Min Length should be 3",
            value: 3,
          },
          maxLength: {
            value: 100,
            message: "Max Limit is 100 Characters",
          },
        })}
      />
      <p style={{ color: "red", fontSize: "2rem" }}>
        {errors.description?.message}
      </p>
      <input
        type="number"
        placeholder="Price"
        {...register("price", {
          required: "Price is Required",
        })}
      />
      <p style={{ color: "red", fontSize: "2rem" }}>{errors.price?.message}</p>
      <select
        id="products"
        {...register("category", {
          required: "Category is Required",
        })}
      >
        <option value="t-shirts">T-shirt</option>
        <option value="jeans">Jeans</option>
      </select>
      <p style={{ color: "red", fontSize: "2rem" }}>
        {errors.category?.message}
      </p>

      <input
        type="number"
        placeholder="Stock"
        {...register("stock", {
          required: "Stock is Required",
        })}
      />
      <p style={{ color: "red", fontSize: "2rem" }}>{errors.stock?.message}</p>
      <input
        type="text"
        placeholder="Seller"
        {...register("seller", {
          required: "Seller is Required",
          maxLength: {
            value: 40,
            message: "Max Limit is 40 Characters",
          },
        })}
      />
      <p style={{ color: "red", fontSize: "2rem" }}>{errors.seller?.message}</p>

      <input
        type="file"
        placeholder="Choose Product Images"
        multiple
        {...register("images")}
      />
      <div className="selected-images-div">
        {selectedImagesUrls &&
          selectedImagesUrls.map((imageUrl: string, index: number) => {
            return (
              <img src={imageUrl} alt="selectedProductImage" key={index} />
            );
          })}
      </div>

      <button type="submit">Create Course</button>
    </form>
  );
};
