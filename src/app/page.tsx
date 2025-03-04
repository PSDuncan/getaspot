export default function Home() {
  return (
    <div>
    <main className="flex min-h-screen flex-col items-center justify-center text-center p-6 bg-gradient-to-br from-blue-500 to-blue-700 text-white">
      <h1 className="text-4xl md:text-6xl font-bold">Welcome to GetASpot</h1>
      <p className="mt-4 text-lg md:text-2xl">Find or List Properties Across South Africa</p>
      <div className="mt-6 flex space-x-4">
        <a
          href="/listings"
          className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg shadow hover:bg-gray-200 transition"
        >
          View Listings
        </a>
        <a
          href="/submit"
          className="px-6 py-3 bg-yellow-400 text-black font-semibold rounded-lg shadow hover:bg-yellow-500 transition"
        >
          List Your Property
        </a>
      </div>
    </main>
      </div>
  );
}

