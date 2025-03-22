'use client';

import { useRouter, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/superbase'; 

export default function EditPropertyPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;

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
  const [existingImage, setExistingImage] = useState<string | null>(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const load = async () => {
      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .eq('id', id)
        .single();

      if (error || !data) {
        setMessage('Failed to load property: ' + error?.message);
        return;
      }

      setForm({
        title: data.title || '',
        price: String(data.price || ''),
        location: data.location || '',
        type: data.type || '',
        bedrooms: String(data.bedrooms || ''),
        bathrooms: String(data.bathrooms || ''),
        has_garden: data.has_garden || false,
        is_pet_friendly: data.is_pet_friendly || false,
      });

      setExistingImage(data.image_url || null);
    };

    if (id) load();
  }, [id]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('Updating...');

    const updates: any = {
      ...form,
      price: parseFloat(form.price),
      bedrooms: Number(form.bedrooms),
      bathrooms: Number(form.bathrooms),
    };

    // Upload new image if one is selected
    if (imageFile) {
      const filePath = `${id}-${Date.now()}.png`;
      const { error: uploadError } = await supabase.storage
        .from('property-images')
        .upload(filePath, imageFile, { upsert: true });

      if (!uploadError) {
        const { data: imageUrlData } = supabase.storage
          .from('property-images')
          .getPublicUrl(filePath);

        updates.image_url = imageUrlData.publicUrl;
      }
    }

    const { error } = await supabase.from('properties').update(updates).eq('id', id);

    if (error) {
      setMessage('Update failed: ' + error.message);
    } else {
      setMessage('Property updated!');
      setTimeout(() => router.push('/dashboard/properties'), 1000);
    }
  };

  return (
    <form onSubmit={handleUpdate} className="p-6 max-w-xl mx-auto space-y-4">
      <h1 className="text-2xl font-bold">Edit Property</h1>

      <input className="w-full border p-2" placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
      <input className="w-full border p-2" placeholder="Price" type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} required />
      <input className="w-full border p-2" placeholder="Location" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} required />

      <select className="w-full border p-2" value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>
        <option value="">Select Type</option>
        <option value="house">House</option>
        <option value="apartment">Apartment</option>
        <option value="townhouse">Townhouse</option>
      </select>

      <div className="grid grid-cols-2 gap-4">
        <input type="number" placeholder="Bedrooms" className="border p-2" value={form.bedrooms} onChange={(e) => setForm({ ...form, bedrooms: e.target.value })} />
        <input type="number" placeholder="Bathrooms" className="border p-2" value={form.bathrooms} onChange={(e) => setForm({ ...form, bathrooms: e.target.value })} />
      </div>

      <div className="flex gap-4">
        <label>
          <input type="checkbox" checked={form.has_garden} onChange={(e) => setForm({ ...form, has_garden: e.target.checked })} /> Garden
        </label>
        <label>
          <input type="checkbox" checked={form.is_pet_friendly} onChange={(e) => setForm({ ...form, is_pet_friendly: e.target.checked })} /> Pet Friendly
        </label>
      </div>

      {existingImage && (
        <div>
          <img src={existingImage} alt="Current Image" className="h-40 w-full object-cover rounded mb-2" />
        </div>
      )}

      <input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files?.[0] || null)} />

      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Save</button>
      {message && <p>{message}</p>}
    </form>
  );
}
