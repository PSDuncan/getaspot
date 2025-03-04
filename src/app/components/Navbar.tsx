import Link from "next/link";

export default function NavBar() {
  return (
    <nav className="w-full bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          GetASpot
        </Link>

        <div className="flex gap-4">
          <Link href="/listings">Browse Listings</Link>
          <Link href="/listings/add">Add Property</Link>
        </div>
      </div>
    </nav>
  );
}
