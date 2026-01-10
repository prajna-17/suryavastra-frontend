"use client";

import { useEffect, useState } from "react";
import { roboto } from "@/app/fonts";
import { useRouter } from "next/navigation";
import { FiEdit2 } from "react-icons/fi";

export default function ProfilePage() {
  const router = useRouter();

  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(true);

  // 🔐 Auth check + load user
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.replace("/auth");
      return;
    }

    try {
      const payload = JSON.parse(atob(token.split(".")[1]));

      const storedUser = JSON.parse(localStorage.getItem("user")) || {};

      setUser({
        name: storedUser.name || payload.name || "",
        email:
          storedUser.email ||
          payload.email ||
          localStorage.getItem("email") ||
          "",
        phone: storedUser.phone || "",
      });
    } catch (err) {
      localStorage.removeItem("token");
      router.replace("/auth");
    }

    const isComplete = localStorage.getItem("isProfileComplete") === "true";

    // first time → editable, returning user → read-only
    setIsEditing(!isComplete);

    setLoading(false);
  }, [router]);

  if (loading) return null;

  return (
    <div className={`min-h-screen bg-white px-4 ${roboto.className}`}>
      {/* TOP BAR */}
      <div className="flex items-center justify-between mt-6 mb-8">
        <h1 className="text-2xl font-semibold text-[#6b3430]">My Profile</h1>

        <button
          onClick={() => setIsEditing((prev) => !prev)}
          className="p-2 rounded-full border text-[#6b3430]"
        >
          <FiEdit2 size={18} />
        </button>
      </div>

      {/* FORM */}
      <div className="space-y-5">
        {/* NAME */}
        <div>
          <label className="text-sm font-medium text-gray-700">Full Name</label>
          <input
            value={user.name}
            disabled={!isEditing}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
            className={`w-full border rounded-md p-3 mt-1 ${
              isEditing ? "bg-white" : "bg-gray-100"
            }`}
          />
        </div>

        {/* EMAIL */}
        <div>
          <label className="text-sm font-medium text-gray-700">Email</label>
          <input
            value={user.email}
            disabled
            className="w-full border rounded-md p-3 mt-1 bg-gray-100"
          />
        </div>

        {/* PHONE */}
        <div>
          <label className="text-sm font-medium text-gray-700">
            Phone Number
          </label>
          <input
            value={user.phone}
            disabled={!isEditing}
            onChange={(e) => setUser({ ...user, phone: e.target.value })}
            placeholder="Enter phone number"
            className={`w-full border rounded-md p-3 mt-1 ${
              isEditing ? "bg-white" : "bg-gray-100"
            }`}
          />
        </div>

        {/* SAVE BUTTON */}
        <button
          disabled={!isEditing}
          onClick={() => {
            localStorage.setItem("user", JSON.stringify(user));
            localStorage.setItem("isProfileComplete", "true");
            setIsEditing(false); // 🔒 lock after save

            const intent = localStorage.getItem("auth_intent");
            localStorage.removeItem("auth_intent");

            router.replace(intent === "CHECKOUT" ? "/order" : "/");
          }}
          className={`w-full mt-6 py-3 rounded-md font-semibold ${
            isEditing ? "bg-[#6b3430] text-white" : "bg-gray-300 text-gray-600"
          }`}
        >
          Save
        </button>
      </div>
    </div>
  );
}
