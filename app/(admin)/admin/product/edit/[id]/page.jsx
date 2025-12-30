"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
// import { api } from "@/api/api";              // enable later when backend ready
// import { toast } from "react-toastify";
// import { useUploadThing } from "@/uploadthing"; // enable later for image upload
import Modal from "@/components/components-jsx/admin/Modal";
import ConfirmModal from "@/components/components-jsx/admin/ConfirmModal";
import "@/components/components-jsx/admin/modal.css";
import "@/components/components-jsx/admin/confirmModal.css";
export default function EditProductPage() {
  const router = useRouter();
  const { id } = useParams(); // dynamic id from URL

  // const { startUpload, isUploading } = useUploadThing("imageUploader", {
  //   onClientUploadComplete: (res) => setImageUrl(res[0].url),
  // });

  const [image, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const [categories, setCategories] = useState([]);

  // FORM FIELDS
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
    loadDummyProduct(); // replace later with real fetch from API
    loadDummyCategories(); // replace later
  }, []);

  // Temporary Dummy — will replace with API later
  const loadDummyProduct = () => {
    setTitle("Kanchipuram Saree");
    setDescription("Beautiful silk saree");
    setImageUrl("/dummy.jpg");
    setPrice("2499");
    setOldPrice("2999");
    setQuantity(10);
    setSizes("S,M,L");
    setColors("Red,Gold");
    setCategoryId("1");
    setSellingCategory("featured");
    setInStock(true);
    setLoading(false);
  };

  const loadDummyCategories = () => {
    setCategories([
      { _id: "1", name: "Silk Saree" },
      { _id: "2", name: "Cotton Saree" },
      { _id: "3", name: "Banarasi" },
    ]);
  };

  const updateProduct = () => {
    const payload = {
      id,
      title,
      description,
      images: [image],
      price,
      oldPrice,
      quantity,
      sizes: sizes.split(","),
      colors: colors.split(","),
      categoryId,
      sellingCategory,
      inStock,
    };

    console.log("UPDATED PRODUCT DATA → ", payload);
    router.push("/admin/product");
  };

  if (loading) return <div style={{ padding: 30 }}>Loading...</div>;

  return (
    <div>
      <h1 className="page-title">Edit Product</h1>

      <div className="create-prod-form">
        {/* IMAGE PREVIEW */}
        {image && (
          <div style={{ marginBottom: 10 }}>
            <img
              src={image}
              alt="preview"
              className="preview-img"
              style={{ width: 140, height: 140 }}
            />
          </div>
        )}

        <input
          className="modal-input"
          placeholder="Product Name"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          className="modal-input"
          rows={3}
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <select
          className="modal-input"
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
        >
          <option value="">Select Category</option>
          {categories.map((c) => (
            <option key={c._id} value={c._id}>
              {c.name}
            </option>
          ))}
        </select>

        <input
          type="file"
          accept="image/*"
          // disabled={isUploading}
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) setImageUrl(URL.createObjectURL(file));
            // startUpload([file]);  // enable later
          }}
        />

        <input
          className="modal-input"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <input
          className="modal-input"
          placeholder="Old Price"
          value={oldPrice}
          onChange={(e) => setOldPrice(e.target.value)}
        />

        <input
          className="modal-input"
          placeholder="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />

        <input
          className="modal-input"
          placeholder="Sizes (S,M,L...)"
          value={sizes}
          onChange={(e) => setSizes(e.target.value)}
        />

        <input
          className="modal-input"
          placeholder="Colors"
          value={colors}
          onChange={(e) => setColors(e.target.value)}
        />

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

        <div className="instock-row">
          <input
            type="checkbox"
            checked={inStock}
            onChange={(e) => setInStock(e.target.checked)}
          />
          <label>In Stock</label>
        </div>

        <button className="primary-btn create-btn" onClick={updateProduct}>
          Update Product
        </button>
      </div>
    </div>
  );
}
