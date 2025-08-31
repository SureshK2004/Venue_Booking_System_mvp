import Link from "next/link";
import { Venue } from "../types/venue";

export default function VenueCard({ venue }: { venue: Venue }) {
  return (
    <div className="border rounded-lg shadow hover:shadow-lg transition p-4">
      <img src={venue.images[0]} alt={venue.name} className="rounded-md h-48 w-full object-cover" />
      <h2 className="text-lg font-semibold mt-2">{venue.name}</h2>
      <p className="text-gray-600">{venue.city}</p>
      <p className="text-sm text-gray-500">₹{venue.priceRangeMin} - ₹{venue.priceRangeMax}/hr</p>
      <Link href={`/venues/${venue.id}`} className="text-indigo-600 mt-2 block">View Details</Link>
    </div>
  );
}
