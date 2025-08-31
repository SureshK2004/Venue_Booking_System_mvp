import { useState } from "react";
import { Venue, BookingResponse } from "../types/venue";
import { apiClient } from "../services/api";

export default function BookingModal({ venue, onClose }: { venue: Venue, onClose: () => void }) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    hallId: venue.halls[0]?.id || "",
    date: "",
    startTime: "",
    endTime: "",
    guestCount: 0,
    name: "",
    phone: "",
    email: "",
  });
  const [loading, setLoading] = useState(false);
  const [confirmation, setConfirmation] = useState<BookingResponse | null>(null);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await apiClient.post<BookingResponse>("/bookings", {
        venueId: venue.id,
        hallId: form.hallId,
        date: form.date,
        startTime: form.startTime,
        endTime: form.endTime,
        guestCount: form.guestCount,
        customerDetails: { name: form.name, phone: form.phone, email: form.email }
      });
      setConfirmation(res);
      setStep(3);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded p-6 w-full max-w-lg">
        {step === 1 && (
          <>
            <h2 className="text-xl font-bold mb-2">Select Date & Time</h2>
            <input type="date" className="border p-2 w-full mb-2" onChange={e => setForm({ ...form, date: e.target.value })} />
            <input type="time" className="border p-2 w-full mb-2" onChange={e => setForm({ ...form, startTime: e.target.value })} />
            <input type="time" className="border p-2 w-full mb-2" onChange={e => setForm({ ...form, endTime: e.target.value })} />
            <button className="bg-indigo-600 text-white px-4 py-2 rounded" onClick={() => setStep(2)}>Next</button>
          </>
        )}
        {step === 2 && (
          <>
            <h2 className="text-xl font-bold mb-2">Your Details</h2>
            <input type="text" placeholder="Name" className="border p-2 w-full mb-2" onChange={e => setForm({ ...form, name: e.target.value })} />
            <input type="text" placeholder="Phone" className="border p-2 w-full mb-2" onChange={e => setForm({ ...form, phone: e.target.value })} />
            <input type="email" placeholder="Email" className="border p-2 w-full mb-2" onChange={e => setForm({ ...form, email: e.target.value })} />
            <button className="bg-indigo-600 text-white px-4 py-2 rounded" onClick={handleSubmit} disabled={loading}>
              {loading ? "Booking..." : "Confirm Booking"}
            </button>
          </>
        )}
        {step === 3 && confirmation && (
          <>
            <h2 className="text-xl font-bold mb-2">Booking Confirmed!</h2>
            <p>Booking ID: {confirmation.id}</p>
            <p>Total: ₹{confirmation.totalAmount}</p>
            <button className="bg-green-600 text-white px-4 py-2 rounded mt-4" onClick={onClose}>Close</button>
          </>
        )}
      </div>
    </div>
  );
}
