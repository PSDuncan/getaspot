"use client"; // because we need form events

import { useState } from "react";

export default function SubmitPropertyPage() {
  const [form, setForm] = useState({
    title: "",
    price: "",
    location: "",
    bedrooms: 1,
    bathrooms: 1,
    image_url: "",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log("Property submitted:", form);
    alert("Property submitted! (check console)");
    // Later, this will save to Supabase
  }

  return (
    <main className="p-6 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">List Your Property</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Property Title"
          value={form.title}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="price"
          placeholder="Price (e.g., R1,500,000)"
          value={form.price}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="location"
          placeholder="Location (City, Suburb)"
          value={form.location}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="number"
          name="bedrooms"
          placeholder="Bedrooms"
          value={form.bedrooms}
          onChange={handleChange}
          required
          min="1"
          className="w-full p-2 border rounded"
        />
        <input
          type="number"
          name="bathrooms"
          placeholder="Bathrooms"
          value={form.bathrooms}
          onChange={handleChange}
          required
          min="1"
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="image_url"
          placeholder="Image URL"
          value={form.image_url}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Submit Property
        </button>
      </form>
    </main>
  );
}
