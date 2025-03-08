"use client"; // Ensure this is a client-side component

import { useState, useEffect } from "react";
import { supabase } from "@/app/lib/supabase"; // Import supabase instance
import { useRouter } from 'next/navigation';


const PropertyDetailPage = () => {
  const [property, setProperty] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const id = 2;

  console.log(`[MyComp render] id=${id}`);

  useEffect(() => {
    // Fetch a property using a default condition (like first property)
    const fetchProperty = async () => {
      setLoading(true);
      setError(null); // Reset any previous error

      try {
        // Query Supabase to get the first property (replace with your specific query as needed)
        const { data, error } = await supabase
          .from("properties")
          .select("*")
          .eq("id", id) // Use the dynamic 'id' to query for the specific property
          .single() // Single result for simplicity

        console.log("Supabase response data:", data); // Log the data fetched from Supabase

        if (error) throw error; // Handle errors

        setProperty(data); // Set property data in state
      } catch (error: any) {
        setError("Could not load property details.");
        console.error(error.message);
      } finally {
        setLoading(false); // Stop loading once data is fetched
      }
    };

    fetchProperty(); // Fetch property when component mounts
  }, []); // Empty dependency array so it only runs once when component mounts

  // Loading state
  if (loading) {
    return <p>Loading...</p>;
  }

  // Error handling
  if (error) {
    return (
      <div>
        <p className="text-red-500">{error}</p>
        <button
          onClick={() => window.location.reload()} // Retry fetching
          className="text-blue-500 mt-4"
        >
          Try Again
        </button>
      </div>
    );
  }

  // Property not found state
  if (!property) {
    return <p className="text-gray-500">Property not found.</p>;
  }

  // Render property details
  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold mb-4">{property.title}</h1>
      <img
        src={property.image_url}
        alt={property.title}
        className="w-full h-64 object-cover mb-4"
      />
      <div className="mb-4">
        <span className="text-xl font-semibold">Price: </span>
        <span className="text-blue-600">
          R{property.price.toLocaleString()}
        </span>
      </div>
      <div className="mb-4">
        <span className="font-semibold">Location: </span>
        <span>{property.location}</span>
      </div>
      <div className="mb-4">
        <span className="font-semibold">Bedrooms: </span>
        <span>{property.bedrooms}</span>
        <span className="ml-4 font-semibold">Bathrooms: </span>
        <span>{property.bathrooms}</span>
      </div>
      {property.description && (
        <div className="mb-4">
          <span className="font-semibold">Description: </span>
          <p>{property.description}</p>
        </div>
      )}
    </main>
  );
};

export default PropertyDetailPage;
