"use client";
import Modal from "@/components/components-jsx/admin/Modal";
import ConfirmModal from "@/components/components-jsx/admin/ConfirmModal";
import "@/components/components-jsx/admin/modal.css";
import "@/components/components-jsx/admin/confirmModal.css";
import React, { useState, useEffect } from "react";

const API = process.env.NEXT_PUBLIC_API_URL; // http://localhost:5000/api

export default function AdminCategory() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch(`${API}/categories`)
      .then((r) => r.json())
      .then((d) => setCategories(d))
      .catch(() => console.log("Fetch error ❌"));
  }, []);

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
            setImageUrl("");
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
                  setImageUrl(cat.image);
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

      {/* Create + Edit Modal */}
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
            const f = e.target.files?.[0];
            if (f) setImageUrl(URL.createObjectURL(f)); // upload later
          }}
        />

        {image && (
          <img
            src={image}
            style={{ width: 100, height: 100, borderRadius: 8, marginTop: 10 }}
          />
        )}

        <button
          className="primary-btn create-btn"
          onClick={async () => {
            if (!name.trim()) return alert("Enter category name");

            // 🔥 CREATE
            if (!editMode) {
              const r = await fetch(`${API}/categories`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, image }), // upload later
              });

              if (r.ok) {
                const newCat = await r.json();
                setCategories([...categories, newCat]);
                alert("Created ✔");
              } else alert("Failed ❌");
            }

            // 🔥 UPDATE
            else {
              const r = await fetch(`${API}/categories/${currentId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, image }),
              });

              if (r.ok) {
                alert("Updated ✔");
                setCategories(
                  categories.map((c) =>
                    c._id === currentId ? { ...c, name, image } : c
                  )
                );
              } else alert("Update failed ❌");
            }

            setOpenModal(false);
          }}
        >
          {editMode ? "Update" : "Create"}
        </button>
      </Modal>

      {/* DELETE CONFIRM */}
      <ConfirmModal
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        message="Category will be permanently deleted."
        onConfirm={async () => {
          const r = await fetch(`${API}/categories/${deleteId}`, {
            method: "DELETE",
          });

          if (r.ok) {
            alert("Deleted ✔");
            setCategories(categories.filter((c) => c._id !== deleteId));
          } else alert("Delete failed ❌");

          setConfirmOpen(false);
        }}
      />
    </div>
  );
}
