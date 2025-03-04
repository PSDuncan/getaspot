"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/router";  // Use router for dynamic parameters
import { supabase } from "@/app/lib/supabase";

const PropertyDetailPage = () => {
  const [property, setProperty] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { id } = router.query; // Access dynamic route parameter `id`

  useEffect(() => {
    if (!id) return; // Exit early if id isn't available

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
  }, [id]); // Trigger when `id` changes

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
    <div>
      <h1>{property.title}</h1>
      <img src={property.image_url} alt={property.title} />
      <p>{property.description}</p>
    </div>
  );
};

export default PropertyDetailPage;
