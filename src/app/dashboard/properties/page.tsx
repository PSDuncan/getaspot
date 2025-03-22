'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/superbase';
import Link from 'next/link';

type Property = {
  id: string;
  title: string;
  price: number;
  location: string;
};

export default function UserPropertiesPage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserProperties = async () => {
      const { data: session } = await supabase.auth.getUser();
      const userId = session?.user?.id;
      if (!userId) return;
  
      // 1. Check if the user is an agent
      const { data: agentData } = await supabase
        .from('agents')
        .select('id')
        .eq('user_id', userId)
        .maybeSingle();
  
      const agentId = agentData?.id;
  
      // 2. Fetch properties where user_id = current user OR agent_id = current agent
      const { data: propertiesData, error } = await supabase
        .from('properties')
        .select('*')
        .or(`user_id.eq.${userId},agent_id.eq.${agentId}`);
  
      if (error) {
        console.error('Failed to fetch properties:', error.message);
        return;
      }
  
      setProperties(propertiesData || []);
      setLoading(false);
    };
  
    fetchUserProperties();
  }, []);
  
  const handleDelete = async (id: string) => {
    const confirmed = confirm('Are you sure you want to delete this property?');
    if (!confirmed) return;
  
    const { error } = await supabase.from('properties').delete().eq('id', id);
    if (error) {
      alert('Failed to delete: ' + error.message);
      return;
    }
  
    setProperties((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">My Properties</h1>
      {loading && <p>Loading...</p>}
      <ul className="space-y-2">
        {properties.map((p) => (
          <li key={p.id} className="border p-4 rounded">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-semibold">{p.title}</p>
                <p className="text-sm text-gray-600">R{p.price} — {p.location}</p>
              </div>
              <div className="flex gap-2">
                <Link href={`/dashboard/properties/${p.id}/edit`} className="text-blue-600 hover:underline">
                  Edit
                </Link>
                <button onClick={() => handleDelete(p.id)} className="text-red-600 hover:underline">
                  Delete
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
  
}
