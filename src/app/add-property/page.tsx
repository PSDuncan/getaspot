'use client';

import { useState } from 'react';
import { supabase } from '@/lib/superbase';
import { useRouter } from 'next/navigation';

export default function AddPropertyPage() {
  const [form, setForm] = useState({
    title: '',
    price: '',
    location: '',
    type: '',
    bedrooms: '',
    bathrooms: '',
    has_garden: false,
    is_pet_friendly: false,
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('Submitting...');

    const { data: session } = await supabase.auth.getUser();
    const user = session?.user;
    if (!user) return setMessage('You must be logged in.');

    const { data: agentData } = await supabase
      .from('agents')
      .select('id, agency_id')
      .eq('user_id', user.id)
      .maybeSingle();

    const insertData: any = {
      title: form.title,
      price: parseFloat(form.price),
      location: form.location,
      type: form.type,
      bedrooms: Number(form.bedrooms),
      bathrooms: Number(form.bathrooms),
      has_garden: form.has_garden,
      is_pet_friendly: form.is_pet_friendly,
      user_id: user.id,
    };

    if (agentData?.id && agentData?.agency_id) {
      insertData.agent_id = agentData.id;
      insertData.agency_id = agentData.agency_id;
    }

    // ⬆️ Insert without image first
    const { data: newProperty, error } = await supabase
      .from('properties')
      .insert(insertData)
      .select()
      .single();

    if (error || !newProperty) {
      setMessage('Failed to create property: ' + error?.message);
      return;
    }

    // ⬆️ Upload image if selected
    if (imageFile) {
      const filePath = `${newProperty.id}-${Date.now()}.png`;
      const { error: uploadError } = await supabase.storage
        .from('property-images')
        .upload(filePath, imageFile);

      if (!uploadError) {
        const { data: imageUrlData } = supabase.storage
          .from('property-images')
          .getPublicUrl(filePath);

        await supabase
          .from('properties')
          .update({ image_url: imageUrlData.publicUrl })
          .eq('id', newProperty.id);
      }
    }

    setMessage('Property added!');
    setTimeout(() => router.push('/dashboard'), 1000);
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 max-w-xl mx-auto space-y-4">
      <h1 className="text-2xl font-bold">Add Property</h1>

      <input required placeholder="Title" className="w-full border p-2" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
      <input required placeholder="Price" type="number" className="w-full border p-2" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
      <input required placeholder="Location" className="w-full border p-2" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} />

      <select required className="w-full border p-2" value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>
        <option value="">Select Type</option>
        <option value="house">House</option>
        <option value="apartment">Apartment</option>
        <option value="townhouse">Townhouse</option>
      </select>

      <div className="grid grid-cols-2 gap-4">
        <input required type="number" placeholder="Bedrooms" className="border p-2" value={form.bedrooms} onChange={(e) => setForm({ ...form, bedrooms: e.target.value })} />
        <input required type="number" placeholder="Bathrooms" className="border p-2" value={form.bathrooms} onChange={(e) => setForm({ ...form, bathrooms: e.target.value })} />
      </div>

      <div className="flex gap-4">
        <label><input type="checkbox" checked={form.has_garden} onChange={(e) => setForm({ ...form, has_garden: e.target.checked })} /> Garden</label>
        <label><input type="checkbox" checked={form.is_pet_friendly} onChange={(e) => setForm({ ...form, is_pet_friendly: e.target.checked })} /> Pet Friendly</label>
      </div>

      <input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files?.[0] || null)} />

      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Submit</button>
      {message && <p>{message}</p>}
    </form>
  );
}
