'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/superbase'; 
import Link from 'next/link';

export default function ManagePropertiesPage() {
  const [properties, setProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProperties = async () => {
      const { data: session } = await supabase.auth.getUser();
      const user = session?.user;
      if (!user) return;

      const { data: agentData } = await supabase
        .from('agents')
        .select('id')
        .eq('user_id', user.id)
        .maybeSingle();

      const userId = user.id;
      const agentId = agentData?.id;

      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .or(`user_id.eq.${userId},agent_id.eq.${agentId}`)
        .order('created_at', { ascending: false });

      if (!error) setProperties(data || []);
      setLoading(false);
    };

    loadProperties();
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
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">My Properties</h1>
        <Link href="/add-property" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Add Property
        </Link>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : properties.length === 0 ? (
        <p>No properties found.</p>
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {properties.map((p) => (
            <li key={p.id} className="border rounded-lg p-4 bg-white shadow">
              {p.image_url && (
                <img src={p.image_url} alt={p.title} className="h-40 w-full object-cover rounded mb-2" />
              )}
              <h2 className="font-bold text-lg">{p.title}</h2>
              <p className="text-sm text-gray-600">{p.location}</p>
              <p className="text-sm text-gray-700">R{p.price?.toLocaleString()}</p>
              <div className="text-xs text-gray-500 mt-2">
                {p.bedrooms} bed • {p.bathrooms} bath • {p.type}
              </div>

              <div className="flex justify-between mt-4">
                <Link
                  href={`/dashboard/properties/${p.id}/edit`}
                  className="text-blue-600 hover:underline"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(p.id)}
                  className="text-red-600 hover:underline"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
