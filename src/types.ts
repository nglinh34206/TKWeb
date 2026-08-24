export type Region = 'all' | 'north' | 'central' | 'south';

export type Category = 'all' | 'heritage' | 'beach' | 'mountain' | 'city' | 'nature' | 'food';

export interface Destination {
  id: string;
  name: string;
  province: string;
  region: 'north' | 'central' | 'south';
  category: Category;
  tagline: string;
  description: string;
  image: string;
  gallery: string[];
  rating: number;
  reviewsCount: number;
  lat: number;
  lng: number;
  bestTimeToVisit: string;
  idealStayDays: string;
  avgBudget: string;
  highlights: string[];
  specialties: string[];
  tips: string[];
  popularNearbySpots: string[];
}

export interface HotelRoom {
  id: string;
  name: string;
  bedType: string;
  capacity: number;
  sizeM2: number;
  pricePerNight: number;
  originalPrice?: number;
  amenities: string[];
  image: string;
}

export interface Hotel {
  id: string;
  name: string;
  location: string;
  city: string;
  region: 'north' | 'central' | 'south';
  address: string;
  starRating: number;
  userRating: number;
  reviewsCount: number;
  images: string[];
  coverImage: string;
  priceStartFrom: number;
  amenities: string[];
  lat: number;
  lng: number;
  description: string;
  rooms: HotelRoom[];
  popularTag?: string;
}

export interface Flight {
  id: string;
  flightNumber: string;
  airline: 'Vietnam Airlines' | 'Vietjet Air' | 'Bamboo Airways' | 'Vietravel Airlines';
  airlineLogoColor: string;
  fromCity: string;
  fromCode: string;
  fromAirport: string;
  toCity: string;
  toCode: string;
  toAirport: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  priceEconomy: number;
  priceBusiness: number;
  baggageIncluded: string;
  aircraft: string;
  stops: number;
}

export interface Vehicle {
  id: string;
  name: string;
  type: 'self_drive' | 'limousine' | 'airport_transfer' | 'motorbike';
  seats: number;
  transmission: 'Tự động' | 'Số sàn';
  fuelType: 'Xăng' | 'Điện' | 'Dầu';
  pricePerDay: number;
  image: string;
  features: string[];
  locationAvailable: string[];
  rating: number;
  reviewsCount: number;
  provider: string;
}

export type BookingType = 'hotel' | 'flight' | 'vehicle';

export interface BookingRecord {
  id: string;
  type: BookingType;
  createdAt: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  totalPrice: number;
  status: 'confirmed' | 'pending' | 'cancelled';
  paymentMethod: string;
  details: {
    // Hotel
    hotelName?: string;
    roomName?: string;
    checkIn?: string;
    checkOut?: string;
    nights?: number;
    guests?: number;
    // Flight
    flightNumber?: string;
    airline?: string;
    route?: string;
    flightDate?: string;
    departureTime?: string;
    seatNumber?: string;
    passengerClass?: string;
    // Vehicle
    vehicleName?: string;
    pickupDate?: string;
    returnDate?: string;
    pickupLocation?: string;
  };
}

export interface MapRoutePoint {
  id: string;
  name: string;
  lat: number;
  lng: number;
  type: 'destination' | 'hotel' | 'airport' | 'current';
  description?: string;
}

export interface DayItinerary {
  day: number;
  theme: string;
  morning: string;
  afternoon: string;
  evening: string;
  food: string[];
  tips: string;
}

export interface AITravelPlan {
  title: string;
  summary: string;
  destination: string;
  duration: string;
  totalEstimatedCost: string;
  bestTimeToVisit: string;
  days: DayItinerary[];
  highlights: string[];
  culinaryRecommendations: string[];
  essentialNotes: string[];
  recommendedHotels: string[];
  recommendedTransportation: string[];
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp?: string;
}
