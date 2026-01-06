"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getAddressKey } from "@/utils/address";

import { ArrowLeft } from "lucide-react";
import { roboto } from "@/app/fonts";

export default function NewAddressPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    country: "IN",
    pincode: "",
    phone: "",
    code: "+91",
    city: "",
    state: "",
    details: "",
    locality: "",
    type: "Home",
    default: false,
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: false });
  };

  const saveAddress = () => {
    const newErrors = {};

    Object.keys(form).forEach((key) => {
      if (key === "default" || key === "type") return;

      if (typeof form[key] === "string" && !form[key].trim()) {
        newErrors[key] = true;
      }
    });

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;
    const shippingAddress = {
      fullName: form.name,
      phone: form.phone,
      addressLine: form.details,
      landmark: form.locality,
      city: form.city,
      state: form.state,
      postalCode: form.pincode,
    };

    localStorage.setItem(getAddressKey(), JSON.stringify(form));

    const fromCart = window.location.search.includes("from=cart");

    if (fromCart) {
      router.push("/cart"); // come back to cart page
    } else {
      router.push("/order"); // continue normal flow
    }
  };
  // Load previous saved address if exists
  useEffect(() => {
    const saved = localStorage.getItem("userAddress");
    if (saved) setForm(JSON.parse(saved));
  }, []);

  const inputClass = (field) =>
    `border rounded border-[#6b3430] p-3 w-full text-sm 
  focus:outline-none focus:border-[#591b16] 
  ${errors[field] ? "border-red-500 placeholder:text-red-400" : ""}`;

  return (
    <div
      className={`min-h-screen bg-white px-4 py-5 space-y-6 ${roboto.className}`}
    >
      {/* Back + Title */}
      <div className="flex items-center gap-3">
        <ArrowLeft
          size={22}
          color="#6b3430"
          onClick={() => router.back()}
          className="cursor-pointer"
        />
        <h1 className="text-[#6b3430] font-semibold text-lg">
          Add Shipping Details
        </h1>
      </div>

      {/* CONTACT DETAILS */}
      <h2 className="font-medium text-[#050505] text-base mt-7 text-sm">
        Contact Details
      </h2>

      <div className="space-y-4">
        <label className="text-sm font-medium text-gray-700 ">Name *</label>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Enter your name"
          className={inputClass("name")}
        />

        <label className="text-sm font-medium text-gray-700 ">Email ID *</label>
        <input
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Enter your email id"
          className={inputClass("email")}
        />

        <div className="flex gap-3">
          {/* Code */}
          <div className="w-[30%]">
            <label className="text-sm font-medium text-gray-700">Code *</label>
            <select
              name="code"
              value={form.code}
              onChange={handleChange}
              className={`border border-[#6b3430] rounded p-3 w-full text-sm ${
                errors.code ? "border-red-500" : ""
              }`}
            >
              <option>🇮🇳 +91</option>
            </select>
          </div>

          {/* Contact Number */}
          <div className="w-[70%]">
            <label className="text-sm font-medium text-gray-700">
              Contact Number *
            </label>
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="Enter Mobile Number"
              className={inputClass("phone")}
            />
          </div>
        </div>
      </div>

      {/* ADDRESS DETAILS */}
      <h2 className="font-medium text-[#050505] text-base text-sm mt-6">
        Address Details
      </h2>

      <div className="space-y-4">
        <div className="flex gap-2">
          {/* Country */}
          <div className="flex gap-3">
            <div className="w-[30%]">
              <label className="text-sm font-medium text-gray-700">
                Country *
              </label>
              <select
                name="country"
                value={form.country}
                onChange={handleChange}
                className={`border border-[#6b3430] rounded p-3 w-full text-sm ${
                  errors.country ? "border-red-500" : ""
                }`}
              >
                <option value="IN">🇮🇳 India</option>
                <option value="US">🇺🇸 USA</option>
                <option value="UK">🇬🇧 UK</option>
              </select>
            </div>

            <div className="w-[70%]">
              <label className="text-sm font-medium text-gray-700">
                Pincode *
              </label>
              <input
                name="pincode"
                value={form.pincode}
                onChange={handleChange}
                placeholder="Enter your pincode"
                className={inputClass("pincode")}
              />
            </div>
          </div>
        </div>

        <label className="text-sm font-medium text-gray-700">City *</label>
        <input
          name="city"
          value={form.city}
          onChange={handleChange}
          placeholder="Enter your city"
          className={inputClass("city")}
        />

        <label className="text-sm font-medium text-gray-700">State *</label>
        <input
          name="state"
          value={form.state}
          onChange={handleChange}
          placeholder="Enter your state"
          className={inputClass("state")}
        />

        <label className="text-sm font-medium text-gray-700">Details *</label>
        <input
          name="details"
          value={form.details}
          onChange={handleChange}
          placeholder="Address (House No., Building, Street, Area)"
          className={inputClass("details")}
        />

        <input
          name="locality"
          value={form.locality}
          onChange={handleChange}
          placeholder="Locality / Town"
          className={inputClass("locality")}
        />
      </div>

      {/* SAVE ADDRESS AS */}
      <h2 className="font-medium text-[#050505] text-base text-sm mt-10">
        Save Address As
      </h2>

      <div className="flex gap-3 font-medium text-[##6b3430]">
        {["Home", "Work", "Other"].map((label) => (
          <button
            key={label}
            onClick={() => setForm({ ...form, type: label })}
            className={`px-5 py-2 rounded-full text-sm transition ${
              form.type === label
                ? "border border-[#6b3430] text-[#6b3430]"
                : "border border-gray-300 text-gray-500"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Checkbox */}
      <label className="flex items-center gap-2 text-sm mt-2">
        <input
          type="checkbox"
          checked={form.default}
          onChange={(e) => setForm({ ...form, default: e.target.checked })}
          className="accent-[#6b3430]"
        />
        Make this default address
      </label>

      {/* SUBMIT */}
      <button
        onClick={saveAddress}
        className="bg-[#6b3430] text-white w-full py-2 rounded-md font-medium mt-4 active:scale-95"
      >
        Use This Address
      </button>
    </div>
  );
}
