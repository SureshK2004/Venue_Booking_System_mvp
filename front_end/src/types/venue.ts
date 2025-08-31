export interface Venue {
  id: string;
  name: string;
  address: string;
  city: string;
  description: string;
  images: string[];
  rating: number;
  priceRangeMin: number;
  priceRangeMax: number;
  halls: Hall[];
}

export interface Hall {
  id: string;
  venueId: string;
  name: string;
  capacityMin: number;
  capacityMax: number;
  pricePerHour: number;
  amenities: string[];
}

export interface BookingResponse {
  id: string;
  totalAmount: string;
  status: string;
}
