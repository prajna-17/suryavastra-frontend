"use client";

import Modal from "@/components/components-jsx/admin/Modal";
import ConfirmModal from "@/components/components-jsx/admin/ConfirmModal";
import "@/components/components-jsx/admin/modal.css";
import "@/components/components-jsx/admin/confirmModal.css";
import React, { useState, useEffect } from "react";
import { useUploadThing } from "@/utils/upload";

const API = process.env.NEXT_PUBLIC_API_URL;

export default function AdminCategory() {
  const [categories, setCategories] = useState([]);

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  useEffect(() => {
    fetch(`${API}/categories`)
      .then((r) => r.json())
      .then((d) => setCategories(Array.isArray(d) ? d : []))
      .catch(() => console.log("Fetch error ❌"));
  }, []);

  const [openModal, setOpenModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [preview, setPreview] = useState("");
  const [search, setSearch] = useState("");
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const { startUpload, isUploading } = useUploadThing("imageUploader", {
    onClientUploadComplete: (res) => {
      setImage(res[0].url);
    },
    onUploadError: () => alert("Upload failed ❌"),
  });

  const filtered = categories.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h1 className="page-title">Manage Categories</h1>

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
            setImage("");
            setPreview("");
            setOpenModal(true);
          }}
        >
          + Create Category
        </button>
      </div>

      <div className="category-grid">
        {filtered.map((cat) => (
          <div key={cat._id} className="category-card">
            <img
              src={cat.image || "/img/placeholder.jpg"}
              className="category-img"
            />
            <div className="category-title">{cat.name}</div>

            <div className="category-actions">
              <button
                className="edit-btn"
                onClick={() => {
                  setEditMode(true);
                  setCurrentId(cat._id);
                  setName(cat.name);
                  setImage(cat.image);
                  setPreview(cat.image);
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

      {/* MODAL */}
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
          disabled={isUploading}
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (!file) return;

            setPreview(URL.createObjectURL(file));
            startUpload([file]);
          }}
        />

        {preview && (
          <img
            src={preview}
            style={{
              width: 100,
              height: 100,
              borderRadius: 8,
              marginTop: 10,
            }}
          />
        )}

        <button
          className="primary-btn create-btn"
          disabled={isUploading}
          onClick={async () => {
            if (!name || !image) {
              return alert("Name required & image upload must finish");
            }

            const payload = { name, image };

            if (!editMode) {
              const r = await fetch(`${API}/categories`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(payload),
              });

              if (r.ok) {
                const newCat = await r.json();
                setCategories((p) => [...p, newCat]);
                alert("Created ✔");
              } else alert("Create failed ❌");
            } else {
              const r = await fetch(`${API}/categories/${currentId}`, {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(payload),
              });

              if (r.ok) {
                setCategories((p) =>
                  p.map((c) => (c._id === currentId ? { ...c, ...payload } : c))
                );
                alert("Updated ✔");
              } else alert("Update failed ❌");
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
        message="Category will be permanently deleted."
        onConfirm={async () => {
          const r = await fetch(`${API}/categories/${deleteId}`, {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (r.ok) {
            setCategories((p) => p.filter((c) => c._id !== deleteId));
            alert("Deleted ✔");
          } else alert("Delete failed ❌");

          setConfirmOpen(false);
        }}
      />
    </div>
  );
}
