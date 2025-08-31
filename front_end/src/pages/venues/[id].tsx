import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { Venue } from "../../types/venue";
import { apiClient } from "../../services/api";
import BookingModal from "../../components/BookingModel";

export default function VenueDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [venue, setVenue] = useState<Venue | null>(null);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    if (id) apiClient.get<Venue>(`/venues/${id}`).then(setVenue);
  }, [id]);

  if (!venue) return <Layout><p>Loading...</p></Layout>;

  return (
    <Layout>
      <div className="space-y-4">
        <h1 className="text-3xl font-bold">{venue.name}</h1>
        <div className="grid md:grid-cols-3 gap-2">
          {venue.images.map((img, idx) => (
            <img key={idx} src={img} alt="" className="rounded-md object-cover h-48 w-full" />
          ))}
        </div>
        <p>{venue.description}</p>
        <button 
          onClick={() => setOpenModal(true)}
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
        >
          Book Now
        </button>
      </div>
      {openModal && <BookingModal venue={venue} onClose={() => setOpenModal(false)} />}
    </Layout>
  );
}
