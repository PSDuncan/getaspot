'use client';

import { useEffect, useState } from 'react';

export default function UpgradePage() {
  const [payfastUrl, setPayfastUrl] = useState('');

  useEffect(() => {
    const merchant_id = process.env.NEXT_PUBLIC_PAYFAST_MERCHANT_ID!;
    const return_url = process.env.NEXT_PUBLIC_PAYFAST_RETURN_URL!;
    const cancel_url = process.env.NEXT_PUBLIC_PAYFAST_CANCEL_URL!;

    const paymentData = {
      merchant_id,
      merchant_key: process.env.NEXT_PUBLIC_PAYFAST_MERCHANT_KEY!,
      amount: '199.00',
      item_name: 'Pro Agency Plan',
      return_url,
      cancel_url,
      email_confirmation: '1',
      confirmation_address: 'your@email.com',
    };

    const formBody = Object.entries(paymentData)
      .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
      .join('&');

    const fullUrl = `https://sandbox.payfast.co.za/eng/process?${formBody}`;
    setPayfastUrl(fullUrl);
  }, []);

  return (
    <div className="p-6 max-w-lg mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Upgrade Your Account</h1>
      <p className="text-gray-700">Unlock all features by upgrading to the Pro plan.</p>
      <a href={payfastUrl} className="bg-green-600 text-white px-4 py-2 rounded" target="_blank" rel="noopener noreferrer">
        Pay R199 with PayFast
      </a>
    </div>
  );
}
