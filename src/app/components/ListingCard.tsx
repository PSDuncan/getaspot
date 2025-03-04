import Link from "next/link";

type Listing = {
  id: string;
  title: string;
  price: string;
  location: string;
  bedrooms: number;
  bathrooms: number;
  image: string;
};

export default function ListingCard({ listing }: { listing: Listing }) {
  return (
    <Link href={`/listings/${listing.id}`}>
      <div className="border rounded-lg overflow-hidden shadow-sm cursor-pointer hover:shadow-md transition">
        <img
          src={listing.image}
          alt={listing.title}
          className="w-full h-48 object-cover"
        />
        <div className="p-4">
          <h3 className="text-lg font-bold">{listing.title}</h3>
          <p>{listing.location}</p>
          <p className="text-green-600 font-semibold">{listing.price}</p>
          <p>
            {listing.bedrooms} Bed | {listing.bathrooms} Bath
          </p>
        </div>
      </div>
    </Link>
  );
}
