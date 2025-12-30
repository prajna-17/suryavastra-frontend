"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function AdminLayout({ children }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="admin-main">
      {/* HEADER */}
      <header className="admin-header">
        <div className="header-left">
          <button className="sidebar-btn" onClick={() => setOpen(!open)}>
            ☰
          </button>

          {/* <img
            src="/a2.png" // your logo
            alt="logo"
            className="admin-logo"
          /> */}

          <span className="admin-app-name">SuryaVastra</span>
        </div>
      </header>

      {/* SIDEBAR */}
      <aside className={`admin-sidebar ${open ? "open" : ""}`}>
        <Link href="/admin/" className="admin-link">
          Dashboard
        </Link>

        <Link href="/admin/category" className="admin-link">
          Categories
        </Link>

        <Link href="/admin/product" className="admin-link">
          Products
        </Link>
      </aside>

      {/* MAIN CONTENT */}
      <main className="admin-content">{children}</main>
    </div>
  );
}
