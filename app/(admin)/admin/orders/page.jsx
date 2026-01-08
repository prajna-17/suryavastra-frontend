"use client";

import React, { useEffect, useState } from "react";
import { API } from "@/utils/api";
import "@/components/components-jsx/admin/modal.css";
import Link from "next/link";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      const res = await fetch(`${API}/orders`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const data = await res.json();
      setOrders(data.data || []);
    } catch (err) {
      console.error("Failed to load orders", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div style={{ padding: 30 }}>Loading orders...</div>;
  }

  const markAsDelivered = async (orderId) => {
    try {
      const res = await fetch(`${API}/orders/${orderId}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!res.ok) {
        alert("Failed to update order ❌");
        return;
      }

      // update UI locally
      setOrders((prev) =>
        prev.map((o) =>
          o._id === orderId
            ? { ...o, isCompleted: true, orderStatus: "DELIVERED" }
            : o
        )
      );

      alert("Order marked as Delivered ✔");
    } catch (err) {
      console.error(err);
      alert("Something went wrong ❌");
    }
  };

  const updateOrderStatus = async (orderId, status) => {
    try {
      const res = await fetch(`${API}/orders/${orderId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ orderStatus: status }),
      });

      if (!res.ok) {
        alert("Failed to update status ❌");
        return;
      }

      setOrders((prev) =>
        prev.map((o) =>
          o._id === orderId
            ? {
                ...o,
                orderStatus: status,
                isCompleted: status === "DELIVERED",
              }
            : o
        )
      );
    } catch (err) {
      console.error(err);
      alert("Error updating status ❌");
    }
  };

  return (
    <div>
      <h1 className="page-title">Manage Orders</h1>

      <div className="product-grid">
        {orders.map((order) => (
          <div key={order._id} className="product-card">
            <div className="product-body">
              <div className="product-title">Order #{order._id.slice(-6)}</div>

              <div className="product-sub">
                <span>Total: ₹{order.totalAmount}</span>
                <span>{order.paymentMethod}</span>
              </div>

              <div className="product-sub">
                <span>Status: {order.orderStatus}</span>
                <span>Payment: {order.paymentStatus}</span>
              </div>

              <div style={{ marginTop: 8 }}>
                {order.products.map((p, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      marginBottom: 6,
                    }}
                  >
                    <img
                      src={p.images?.[0]}
                      style={{
                        width: 40,
                        height: 40,
                        objectFit: "cover",
                        borderRadius: 4,
                      }}
                    />
                    <div style={{ fontSize: 13 }}>
                      {p.title} × {p.quantity}
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ fontSize: 12, marginTop: 6, opacity: 0.8 }}>
                {new Date(order.createdAt).toLocaleString()}
              </div>

              <div style={{ marginTop: 10 }}>
                <select
                  className="search-input"
                  value={order.orderStatus}
                  onChange={(e) => updateOrderStatus(order._id, e.target.value)}
                >
                  <option value="PLACED">PLACED</option>
                  <option value="SHIPPED">SHIPPED</option>
                  <option value="DELIVERED">DELIVERED</option>
                </select>
              </div>
              <div className="mt-6">
                <Link href={`/admin/orders/${order._id}`}>
                  <button className="primary-btn small">View Details</button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
