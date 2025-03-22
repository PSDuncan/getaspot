'use client';

import { useRouter, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/superbase';

export default function EditPropertyPage() {
    const router = useRouter();
    const params = useParams();
    const id = params?.id as string;

    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [location, setLocation] = useState('');
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

            setTitle(data.title);
            setPrice(String(data.price));
            setLocation(data.location);
        };

        if (id) load();
    }, [id]);


    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage('Updating...');

        const { error } = await supabase
            .from('properties')
            .update({ title, price: parseFloat(price), location })
            .eq('id', id);

        if (error) {
            setMessage('Update failed: ' + error.message);
        } else {
            setMessage('Property updated!');
            setTimeout(() => router.push('/dashboard/properties'), 1000);
        }
    };

    return (
        <form onSubmit={handleUpdate} className="p-6 max-w-md mx-auto space-y-4">
            <h1 className="text-2xl font-bold">Edit Property</h1>
            <input className="w-full border p-2" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" required />
            <input className="w-full border p-2" type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Price" required />
            <input className="w-full border p-2" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Location" required />
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Save</button>
            {message && <p>{message}</p>}
        </form>
    );
}
