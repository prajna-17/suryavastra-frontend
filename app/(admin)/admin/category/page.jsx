"use client";
import Modal from "@/components/components-jsx/admin/Modal";
import ConfirmModal from "@/components/components-jsx/admin/ConfirmModal";
import "@/components/components-jsx/admin/modal.css";
import "@/components/components-jsx/admin/confirmModal.css";
import React, { useState, useEffect } from "react";
// import Modal from "@/components/components-jsx/admin/Modal"; // create later
// import { api } from "@/api/api";                           // enable when backend ready
// import { useUploadThing } from "@/uploadthing";            // enable later for upload

export default function AdminCategory() {
  // Commenting upload for now (backend not ready)
  // const { startUpload, isUploading } = useUploadThing("imageUploader", {
  //   onClientUploadComplete: (res) => setImageUrl(res[0].url),
  // });

  const [categories, setCategories] = useState([
    // Temporary dummy data (will replace with API later)
    { _id: 1, name: "Silk Saree", image: "/dummy.jpg" },
    { _id: 2, name: "Cotton Saree", image: "/dummy.jpg" },
    { _id: 3, name: "Banarasi", image: "/dummy.jpg" },
  ]);

  const [openModal, setOpenModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [name, setName] = useState("");
  const [image, setImageUrl] = useState("");
  const [search, setSearch] = useState("");
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const filtered = categories.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h1 className="page-title">Manage Categories</h1>

      {/* Search + Create */}
      <div className="cat-top-row">
        <input
          type="text"
          placeholder="Search categories..."
          className="search-input"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button
          className="primary-btn"
          onClick={() => {
            setEditMode(false);
            setName("");
            setOpenModal(true);
          }}
        >
          + Create Category
        </button>
      </div>

      {/* Category Cards */}
      <div className="category-grid">
        {filtered.map((cat) => (
          <div key={cat._id} className="category-card">
            <img src={cat.image} className="category-img" />

            <div className="category-title">{cat.name}</div>

            <div className="category-actions">
              <button
                className="edit-btn"
                onClick={() => {
                  setEditMode(true);
                  setName(cat.name);
                  setCurrentId(cat._id);
                  setOpenModal(true);
                }}
              >
                Edit
              </button>

              <button
                className="delete-btn"
                onClick={() => {
                  setDeleteId(cat._id);
                  setConfirmOpen(true);
                }}
              >
                Delete
              </button>
              <button className="inactive-btn">Activate</button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal UI will be added if you want now */}
      <Modal
        open={openModal}
        title={editMode ? "Edit Category" : "Create Category"}
        onClose={() => setOpenModal(false)}
      >
        <input
          type="text"
          className="modal-input"
          placeholder="Category Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="file"
          accept="image/*"
          className="modal-input"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) setImageUrl(URL.createObjectURL(file));
          }}
        />

        {image && (
          <img
            src={image}
            alt="Preview"
            style={{ width: 100, height: 100, borderRadius: 8, marginTop: 10 }}
          />
        )}

        <button
          className="primary-btn create-btn"
          onClick={() => {
            if (editMode) {
              // update logic later
              console.log("Update category:", name);
            } else {
              // create logic later
              console.log("Create category:", name);
            }
            setOpenModal(false);
          }}
        >
          {editMode ? "Update" : "Create"}
        </button>
      </Modal>
      <ConfirmModal
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={() => {
          console.log("Deleting Category:", deleteId);

          // later when backend ready👇
          // setCategories(categories.filter(c => c._id !== deleteId));

          setConfirmOpen(false);
        }}
        message="Category will be permanently deleted."
      />
    </div>
  );
}
