'use client';

import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="space-y-12">
      <section className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-blue-600">Welcome to GetASpot</h1>
        <p className="text-gray-600 max-w-xl mx-auto">
          Find your dream property or list your space with ease. Whether you're buying, renting, or selling — we've got you covered.
        </p>
        <div className="flex justify-center gap-4">
          <Link href="/properties" className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition">
            Browse Properties
          </Link>
          <Link href="/add-property" className="bg-gray-200 text-gray-800 px-6 py-3 rounded hover:bg-gray-300 transition">
            List a Property
          </Link>
        </div>
      </section>

      <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[
          { title: 'Buy', icon: '🏠', href: '/properties?type=house' },
          { title: 'Rent', icon: '📅', href: '/properties?type=apartment' },
          { title: 'Sell', icon: '💼', href: '/add-property' },
        ].map((item) => (
          <Link
            key={item.title}
            href={item.href}
            className="border rounded-lg bg-white p-6 text-center shadow hover:shadow-md transition"
          >
            <div className="text-4xl mb-2">{item.icon}</div>
            <h3 className="text-lg font-bold">{item.title}</h3>
          </Link>
        ))}
      </section>

      <section className="text-center bg-white rounded-lg p-8 shadow mt-12">
        <h2 className="text-2xl font-semibold mb-2">Are you an agency?</h2>
        <p className="text-gray-600 mb-4">Register your agency and manage all your agents, properties, and subscriptions in one place.</p>
        <Link href="/register-agency" className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700 transition">
          Register Agency
        </Link>
      </section>
    </div>
  );
}
