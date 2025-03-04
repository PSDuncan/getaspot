"use client";

import { useState } from "react";
import { supabase } from "../../lib/supabase";

const AddPropertyPage = () => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState<number | string>("");
  const [location, setLocation] = useState("");
  const [bedrooms, setBedrooms] = useState<number | string>("");
  const [bathrooms, setBathrooms] = useState<number | string>("");
  const [imageUrl, setImageUrl] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate fields
    if (!title || !price || !location || !bedrooms || !bathrooms || !imageUrl) {
      setError("Please fill in all required fields.");
      return;
    }

    setLoading(true);

    try {
      // Insert new property into Supabase
      const { data, error } = await supabase.from("properties").insert([
        {
          title,
          price,
          location,
          bedrooms: Number(bedrooms),
          bathrooms: Number(bathrooms),
          image_url: imageUrl,
          description,
        },
      ]);

      if (error) throw error;

      // Reset form
      setTitle("");
      setPrice("");
      setLocation("");
      setBedrooms("");
      setBathrooms("");
      setImageUrl("");
      setDescription("");
      setError("");

      alert("Property added successfully!");
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold mb-4">Add a New Property</h1>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-lg">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label htmlFor="price" className="block text-lg">Price</label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label htmlFor="location" className="block text-lg">Location</label>
          <input
            type="text"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label htmlFor="bedrooms" className="block text-lg">Bedrooms</label>
          <input
            type="number"
            id="bedrooms"
            value={bedrooms}
            onChange={(e) => setBedrooms(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label htmlFor="bathrooms" className="block text-lg">Bathrooms</label>
          <input
            type="number"
            id="bathrooms"
            value={bathrooms}
            onChange={(e) => setBathrooms(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label htmlFor="imageUrl" className="block text-lg">Image URL</label>
          <input
            type="text"
            id="imageUrl"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-lg">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full p-3 bg-blue-600 text-white rounded ${loading ? "opacity-50" : ""}`}
        >
          {loading ? "Adding..." : "Add Property"}
        </button>
      </form>
    </main>
  );
};

export default AddPropertyPage;
