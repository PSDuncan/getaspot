'use client';

import { useState } from 'react';
import { supabase } from '@/lib/superbase'; 

export default function AddPropertyPage() {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [location, setLocation] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('Submitting...');

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      setMessage('You must be logged in');
      return;
    }

    const userId = user.id;

    // 🔍 Check if the user is an agent
    const { data: agentData, error: agentError } = await supabase
      .from('agents')
      .select('id, agency_id')
      .eq('user_id', userId)
      .maybeSingle();

    const insertData: any = {
      title,
      price: parseFloat(price),
      location,
      user_id: userId,
    };

    if (agentData?.id && agentData?.agency_id) {
      insertData.agent_id = agentData.id;
      insertData.agency_id = agentData.agency_id;
    }

    const { error } = await supabase.from('properties').insert(insertData);

    if (error) {
      setMessage('Failed to add property: ' + error.message);
    } else {
      setTitle('');
      setPrice('');
      setLocation('');
      setMessage('Property added!');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 max-w-md mx-auto space-y-4">
      <h1 className="text-2xl font-bold">Add Property</h1>
      <input className="w-full border p-2" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
      <input className="w-full border p-2" placeholder="Price" type="number" value={price} onChange={(e) => setPrice(e.target.value)} required />
      <input className="w-full border p-2" placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} required />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Submit</button>
      {message && <p>{message}</p>}
    </form>
  );
}
