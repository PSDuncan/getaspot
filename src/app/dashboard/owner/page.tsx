'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/superbase'; 
import Link from 'next/link';

export default function OwnerDashboard() {
  const [properties, setProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const { data: session } = await supabase.auth.getUser();
      const userId = session?.user?.id;
      if (!userId) return;

      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .eq('user_id', userId);

      if (!error) setProperties(data || []);
      setLoading(false);
    };

    load();
  }, []);

  const handleDelete = async (id: string) => {
    const confirm = window.confirm('Delete this property?');
    if (!confirm) return;

    const { error } = await supabase.from('properties').delete().eq('id', id);
    if (!error) {
      setProperties((prev) => prev.filter((p) => p.id !== id));
    } else {
      alert('Failed to delete: ' + error.message);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Owner Dashboard</h1>
        <Link href="/add-property" className="bg-blue-600 text-white px-4 py-2 rounded">
          Add Property
        </Link>
      </div>

      {loading ? (
        <p>Loading your properties...</p>
      ) : properties.length === 0 ? (
        <p>No listings yet.</p>
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {properties.map((p) => (
            <li key={p.id} className="border rounded p-4 shadow bg-white">
              {p.image_url && <img src={p.image_url} className="h-40 w-full object-cover rounded mb-2" />}
              <h2 className="text-lg font-bold">{p.title}</h2>
              <p className="text-sm text-gray-600">R{p.price?.toLocaleString()} - {p.location}</p>
              <div className="text-xs text-gray-500">{p.bedrooms} bed • {p.bathrooms} bath • {p.type}</div>
              <div className="flex justify-between mt-4 text-sm">
                <Link href={`/dashboard/properties/${p.id}/edit`} className="text-blue-600 hover:underline">Edit</Link>
                <button onClick={() => handleDelete(p.id)} className="text-red-600 hover:underline">Delete</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
