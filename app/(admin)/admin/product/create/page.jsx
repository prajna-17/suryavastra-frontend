"use client";
import { API } from "@/utils/api";
import { useUploadThing } from "@/utils/upload";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
// import { api } from "@/api/api"; // enable later when backend ready
// import { toast } from "react-toastify";
// import { useUploadThing } from "@/uploadthing"; // enable later
import Modal from "@/components/components-jsx/admin/Modal";
import ConfirmModal from "@/components/components-jsx/admin/ConfirmModal";
import "@/components/components-jsx/admin/modal.css";
import "@/components/components-jsx/admin/confirmModal.css";
export default function AdminCreateProduct() {
  const { startUpload } = useUploadThing("imageUploader");

  const router = useRouter();

  // Upload disabled until backend ready
  // const { startUpload, isUploading } = useUploadThing("imageUploader", {
  //   onClientUploadComplete: (res) => setImageUrl(res[0].url),
  // });

  const [image, setImageUrl] = useState("");
  const [categories, setCategories] = useState([]);

  // FORM fields
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [oldPrice, setOldPrice] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [sizes, setSizes] = useState("");
  const [colors, setColors] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [sellingCategory, setSellingCategory] = useState("featured");
  const [inStock, setInStock] = useState(true);

  useEffect(() => {
    fetch(`${API}/categories`)
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.log(err));
  }, []);

  // Submit handler (backend unavailable now, so just console)
  const submitProduct = async () => {
    const payload = {
      id: "PID-" + Date.now(),
      title,
      description,
      images: [image],
      price: Number(price),
      oldPrice: oldPrice ? Number(oldPrice) : null,
      quantity: Number(quantity),
      sizes: sizes.split(",").map((s) => s.trim()),
      colors: colors.split(",").map((s) => s.trim()),
      category: categoryId,
      productSellingCategory: sellingCategory,
      inStock,
    };

    try {
      const res = await fetch(`${API}/products`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to create product");

      alert("Product Created Successfully 🎉");
      router.push("/admin/product");
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  return (
    <div>
      <h1 className="page-title">Create Product</h1>

      <div className="create-prod-form">
        {/* IMAGE PREVIEW */}
        <div className="image-preview-box">
          {image && <img src={image} alt="preview" className="preview-img" />}
        </div>

        {/* Product Name */}
        <label>Product Name</label>
        <input
          className="modal-input"
          placeholder="Product Name"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        {/* Description */}
        <label>Description</label>
        <textarea
          className="modal-input"
          placeholder="Description"
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        {/* Category */}
        <label>Category</label>
        <select
          className="modal-input"
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
        >
          <option value="">Select category</option>
          {categories.map((c) => (
            <option key={c._id} value={c._id}>
              {c.name}
            </option>
          ))}
        </select>

        {/* Image Upload */}
        {/* Image Upload */}
        <label>Product Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={async (e) => {
            const file = e.target.files[0];
            if (!file) return;

            setImageUrl(URL.createObjectURL(file)); // preview instantly

            // Upload to server
            const upload = await startUpload([file]);
            if (upload && upload[0]?.url) {
              setImageUrl(upload[0].url); // final cloud URL replaces preview
              console.log("Uploaded:", upload[0].url);
            }
          }}
        />

        {/* Price */}
        <label>Price</label>
        <input
          className="modal-input"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        {/* Old Price */}
        <label>Old Price</label>
        <input
          className="modal-input"
          value={oldPrice}
          onChange={(e) => setOldPrice(e.target.value)}
        />

        {/* Quantity */}
        <label>Quantity</label>
        <input
          className="modal-input"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />

        {/* Sizes */}
        <label>Sizes</label>
        <input
          className="modal-input"
          placeholder="S,M,L..."
          value={sizes}
          onChange={(e) => setSizes(e.target.value)}
        />

        {/* Colors */}
        <label>Colors</label>
        <input
          className="modal-input"
          placeholder="Red,Blue,Green..."
          value={colors}
          onChange={(e) => setColors(e.target.value)}
        />

        {/* Selling Category */}
        <label>Selling Category</label>
        <select
          className="modal-input"
          value={sellingCategory}
          onChange={(e) => setSellingCategory(e.target.value)}
        >
          <option value="featured">Featured</option>
          <option value="on-selling">On Selling</option>
          <option value="best-selling">Best Selling</option>
          <option value="top-rating">Top Rating</option>
        </select>

        {/* Stock */}
        <div className="instock-row">
          <input
            type="checkbox"
            checked={inStock}
            onChange={(e) => setInStock(e.target.checked)}
          />
          <label>In Stock</label>
        </div>

        <button className="primary-btn create-btn" onClick={submitProduct}>
          Create Product
        </button>
      </div>
    </div>
  );
}
