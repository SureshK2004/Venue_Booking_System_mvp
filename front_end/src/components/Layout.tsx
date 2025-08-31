import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow p-4">
        <div className="container mx-auto text-2xl font-bold">VenueBooking</div>
      </header>
      <main className="container mx-auto p-4">{children}</main>
    </div>
  );
}
