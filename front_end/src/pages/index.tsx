import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import VenueCard from "../components/VenueCard";
import { Venue } from "../types/venue";
import { apiClient } from "../services/api";

export default function Home() {
  const [venues, setVenues] = useState<Venue[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiClient.get<Venue[]>("/venues")
      .then(setVenues)
      .finally(() => setLoading(false));
  }, []);

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">Available Venues</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-4">
          {venues.map(v => <VenueCard key={v.id} venue={v} />)}
        </div>
      )}
    </Layout>
  );
}
