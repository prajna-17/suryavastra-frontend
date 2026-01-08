"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { API } from "@/utils/api";
import "@/components/components-jsx/admin/modal.css";

export default function AdminOrderDetails() {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadOrder();
  }, []);

  const loadOrder = async () => {
    try {
      const res = await fetch(`${API}/orders/order-details/${orderId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await res.json();
      setOrder(data.data);
    } catch (err) {
      console.error("Failed to load order", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div style={{ padding: 30 }}>Loading...</div>;
  if (!order) return <div style={{ padding: 30 }}>Order not found</div>;

  return (
    <div>
      <h1 className="page-title">Order Details</h1>

      <div className="product-card">
        <div className="product-body">
          <div className="product-title">Order #{order._id}</div>

          <div className="product-sub">
            <span>Total: ₹{order.totalAmount}</span>
            <span>{order.paymentMethod}</span>
          </div>

          <div className="product-sub">
            <span>Status: {order.orderStatus}</span>
            <span>Payment: {order.paymentStatus}</span>
          </div>

          <hr style={{ margin: "12px 0" }} />

          <h4 style={{ fontSize: 14, marginBottom: 6 }}>Products</h4>
          {order.products.map((p, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                gap: 10,
                alignItems: "center",
                marginBottom: 8,
              }}
            >
              <img
                src={p.images?.[0]}
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 6,
                  objectFit: "cover",
                }}
              />
              <div style={{ fontSize: 13 }}>
                {p.title} × {p.quantity}
                <div style={{ opacity: 0.7 }}>₹{p.subtotal}</div>
              </div>
            </div>
          ))}

          <hr style={{ margin: "12px 0" }} />

          <h4 style={{ fontSize: 14, marginBottom: 6 }}>Shipping Address</h4>
          <div style={{ fontSize: 13, lineHeight: 1.5 }}>
            <div>{order.shippingAddress.fullName}</div>
            <div>{order.shippingAddress.phone}</div>
            <div>{order.shippingAddress.addressLine}</div>
            <div>
              {order.shippingAddress.city}, {order.shippingAddress.state}
            </div>
            <div>{order.shippingAddress.postalCode}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
