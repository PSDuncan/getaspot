"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation"; // useSearchParams for query parameters
import { supabase } from "@/app/lib/supabase";

const PropertyDetailPage = () => {
  const [property, setProperty] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const searchParams = useSearchParams();
  const id = searchParams.get("id"); // Get the 'id' query parameter from the URL

  useEffect(() => {
    if (!id) return; // If no id, do nothing

    const fetchProperty = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from("properties")
          .select("*")
          .eq("id", id)
          .single();

        if (error) throw error;

        setProperty(data);
      } catch (error: any) {
        setError("Could not load property details.");
        console.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]); // Trigger fetch when id changes

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (!property) {
    return <p className="text-gray-500">Property not found.</p>;
  }

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
