"use client";

import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";

const ListingsPage = () => {
  const [properties, setProperties] = useState([]);
  const [search, setSearch] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  // Fetch properties from Supabase on load
  useEffect(() => {
    async function fetchProperties() {
      try {
        const { data, error } = await supabase
          .from("properties")
          .select("*");

        if (error) {
          throw error;  // If error occurs, throw and catch below
        }

        setProperties(data);
      } catch (error) {
        console.log("Fetched properties:", data);
        console.error("Error fetching properties:", error.message);
      }
    }

    fetchProperties();
  }, []);

  const filteredProperties = properties.filter((property) => {
    const matchesSearch =
      property.title.toLowerCase().includes(search.toLowerCase()) ||
      property.location.toLowerCase().includes(search.toLowerCase());
    const matchesMinPrice = minPrice ? property.price >= Number(minPrice) : true;
    const matchesMaxPrice = maxPrice ? property.price <= Number(maxPrice) : true;
    return matchesSearch && matchesMinPrice && matchesMaxPrice;
  });

  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold mb-4">Browse Properties</h1>

      {/* Filter bar */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
        <input
          type="text"
          placeholder="Search title or location"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-2 border rounded"
        />
        <input
          type="number"
          placeholder="Min Price"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          className="p-2 border rounded"
        />
        <input
          type="number"
          placeholder="Max Price"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          className="p-2 border rounded"
        />
      </div>

      {/* Property grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProperties.length === 0 ? (
          <p className="col-span-full text-center text-gray-500">No properties found matching your filters.</p>
        ) : (
          filteredProperties.map((property) => (
            <a
              key={property.id}
              href={`/listings/${property.id}`}
              className="border rounded-lg overflow-hidden shadow-lg block"
            >
              <img
                src={property.image_url}
                alt={property.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold">{property.title}</h2>
                <p className="text-gray-600">{property.location}</p>
                <p className="font-bold text-blue-600">
                  R{property.price.toLocaleString()}
                </p>
                <p>
                  {property.bedrooms} Beds • {property.bathrooms} Baths
                </p>
              </div>
            </a>
          ))
        )}
      </div>
    </main>
  );
};

export default ListingsPage;
