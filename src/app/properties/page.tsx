'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/superbase'; 

type Property = {
  id: string;
  title: string;
  price: number;
  location: string;
  bedrooms?: number;
  bathrooms?: number;
  type?: string;
};

export default function PropertiesPage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(false);

  // Filters
  const [search, setSearch] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [bedrooms, setBedrooms] = useState('');
  const [bathrooms, setBathrooms] = useState('');
  const [propertyType, setPropertyType] = useState('');

  const fetchProperties = async () => {
    setLoading(true);

    let query = supabase.from('properties').select('*').order('created_at', { ascending: false });

    if (search) query = query.ilike('title', `%${search}%`);
    if (minPrice) query = query.gte('price', Number(minPrice));
    if (maxPrice) query = query.lte('price', Number(maxPrice));
    if (bedrooms) query = query.eq('bedrooms', Number(bedrooms));
    if (bathrooms) query = query.eq('bathrooms', Number(bathrooms));
    if (propertyType) query = query.eq('type', propertyType);

    const { data, error } = await query;
    if (!error) setProperties(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  const handleFilter = (e: React.FormEvent) => {
    e.preventDefault();
    fetchProperties();
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Find a Property</h1>

      <form onSubmit={handleFilter} className="grid gap-4 md:grid-cols-6 items-end">
        <input
          type="text"
          placeholder="Search title or location"
          className="border p-2 col-span-2"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <input
          type="number"
          placeholder="Min Price"
          className="border p-2"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
        />
        <input
          type="number"
          placeholder="Max Price"
          className="border p-2"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
        />
        <input
          type="number"
          placeholder="Bedrooms"
          className="border p-2"
          value={bedrooms}
          onChange={(e) => setBedrooms(e.target.value)}
        />
        <input
          type="number"
          placeholder="Bathrooms"
          className="border p-2"
          value={bathrooms}
          onChange={(e) => setBathrooms(e.target.value)}
        />
        <select
          className="border p-2 col-span-2"
          value={propertyType}
          onChange={(e) => setPropertyType(e.target.value)}
        >
          <option value="">All Types</option>
          <option value="house">House</option>
          <option value="apartment">Apartment</option>
          <option value="townhouse">Townhouse</option>
        </select>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded col-span-2 hover:bg-blue-700 transition"
        >
          Apply Filters
        </button>
      </form>

      {loading ? (
        <p>Loading properties...</p>
      ) : properties.length === 0 ? (
        <p>No properties found.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {properties.map((p) => (
            <div
              key={p.id}
              className="rounded-lg border bg-white p-5 shadow hover:shadow-md transition"
            >
              <h2 className="text-lg font-bold truncate">{p.title}</h2>
              <p className="text-sm text-gray-600">{p.location}</p>
              <p className="text-sm text-gray-700">R{p.price.toLocaleString()}</p>
              <div className="text-xs text-gray-500 mt-2">
                {p.bedrooms} bed • {p.bathrooms} bath • {p.type || 'Type unknown'}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
