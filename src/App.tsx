import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { DestinationsSection } from './components/DestinationsSection';
import { HotelBookingSection } from './components/HotelBookingSection';
import { FlightBookingSection } from './components/FlightBookingSection';
import { CarRentalSection } from './components/CarRentalSection';
import { MapDirectionsSection } from './components/MapDirectionsSection';
import { AiTravelPlannerSection } from './components/AiTravelPlannerSection';
import { MyBookingsDrawer } from './components/MyBookingsDrawer';
import { Footer } from './components/Footer';
import { BookingRecord, Destination } from './types';

export function App() {
  const [activeTab, setActiveTab] = useState<string>('destinations');
  const [isBookingsDrawerOpen, setIsBookingsDrawerOpen] = useState(false);
  const [savedDestIds, setSavedDestIds] = useState<string[]>(['halong', 'hoian']);

  // Pre-seed with sample active bookings so users can immediately test the E-Ticket & QR code voucher feature
  const [bookings, setBookings] = useState<BookingRecord[]>([
    {
      id: 'HT-882194',
      type: 'hotel',
      createdAt: '18/08/2026',
      customerName: 'Trần Minh Tuấn',
      customerPhone: '0988 776 655',
      customerEmail: 'minhtuan@gmail.com',
      totalPrice: 6400000,
      status: 'confirmed',
      paymentMethod: 'VNPAY-QR',
      details: {
        hotelName: 'Vinpearl Resort & Spa Hạ Long',
        roomName: 'Deluxe Hướng Biển 5 Sao',
        checkIn: '2026-08-22',
        checkOut: '2026-08-24',
        nights: 2,
        guests: 2
      }
    },
    {
      id: 'FL-491023',
      type: 'flight',
      createdAt: '18/08/2026',
      customerName: 'TRAN MINH TUAN',
      customerPhone: '0988 776 655',
      customerEmail: 'minhtuan@gmail.com',
      totalPrice: 1650000,
      status: 'confirmed',
      paymentMethod: 'VNPAY-ONLINE',
      details: {
        flightNumber: 'VN123',
        airline: 'Vietnam Airlines',
        route: 'Hà Nội (HAN) → TP. Hồ Chí Minh (SGN)',
        flightDate: '2026-08-25',
        departureTime: '08:00',
        seatNumber: '15A',
        passengerClass: 'Hạng Phổ Thông (Economy)'
      }
    }
  ]);

  // Contextual filters when navigating between components
  const [hotelFilterCity, setHotelFilterCity] = useState<string>('Tất cả');
  const [flightFrom, setFlightFrom] = useState<string>('HAN');
  const [flightTo, setFlightTo] = useState<string>('SGN');
  const [vehicleLocation, setVehicleLocation] = useState<string>('all');
  const [mapOriginName, setMapOriginName] = useState<string>('Thủ Đô Hà Nội');
  const [mapDestName, setMapDestName] = useState<string>('Vịnh Hạ Long');

  const handleToggleSave = (destId: string) => {
    setSavedDestIds((prev) =>
      prev.includes(destId) ? prev.filter((id) => id !== destId) : [...prev, destId]
    );
  };

  const handleAddBooking = (newBooking: BookingRecord) => {
    setBookings((prev) => [newBooking, ...prev]);
  };

  const handleRemoveBooking = (bookingId: string) => {
    setBookings((prev) => prev.filter((b) => b.id !== bookingId));
  };

  // When user clicks "Xem trên bản đồ" from Destination cards
  const handleViewOnMap = (dest: Destination) => {
    setMapDestName(dest.name);
    setActiveTab('map');
    const mapEl = document.getElementById('map');
    if (mapEl) mapEl.scrollIntoView({ behavior: 'smooth' });
  };

  // When user clicks "Đặt dịch vụ cho điểm đến này"
  const handleBookServiceForDest = (dest: Destination) => {
    setHotelFilterCity(dest.name);
    setActiveTab('hotels');
    const hotelEl = document.getElementById('hotels');
    if (hotelEl) hotelEl.scrollIntoView({ behavior: 'smooth' });
  };

  // Hero Search Handlers
  const handleHeroSearchHotels = (city: string) => {
    setHotelFilterCity(city);
    setActiveTab('hotels');
  };

  const handleHeroSearchFlights = (from: string, to: string) => {
    setFlightFrom(from);
    setFlightTo(to);
    setActiveTab('flights');
  };

  const handleHeroSearchVehicles = (city: string, _type: string) => {
    setVehicleLocation(city);
    setActiveTab('vehicles');
  };

  const handleHeroSelectRoute = (from: string, to: string) => {
    setMapOriginName(from);
    setMapDestName(to);
    setActiveTab('map');
  };

  const handleNavigateToTab = (tabId: string) => {
    setActiveTab(tabId);
    const element = document.getElementById(tabId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFCFB] text-[#1A1A1A] font-sans selection:bg-[#1A1A1A] selection:text-white">
      
      {/* Primary Top Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={handleNavigateToTab}
        bookings={bookings}
        onOpenBookings={() => setIsBookingsDrawerOpen(true)}
        savedCount={savedDestIds.length}
      />

      {/* Main Content Sections */}
      <main>
        {/* Hero Section with Live Search Switcher */}
        <HeroBanner
          onSearchHotels={handleHeroSearchHotels}
          onSearchFlights={handleHeroSearchFlights}
          onSearchVehicles={handleHeroSearchVehicles}
          onNavigateToTab={handleNavigateToTab}
          onSelectRouteFromHero={handleHeroSelectRoute}
        />

        {/* 1. Destinations Showcase (Khám phá danh thắng 3 miền) */}
        <DestinationsSection
          onViewOnMap={handleViewOnMap}
          onBookServiceForDest={handleBookServiceForDest}
          savedDestIds={savedDestIds}
          onToggleSave={handleToggleSave}
        />

        {/* 2. Interactive Map & Route Directions (Bản đồ chỉ đường & tính khoảng cách) */}
        <MapDirectionsSection
          initialOriginName={mapOriginName}
          initialDestName={mapDestName}
          onSelectDestinationForBooking={handleBookServiceForDest}
        />

        {/* 3. Hotel & Resort Booking Section */}
        <HotelBookingSection
          onAddBooking={handleAddBooking}
          targetCityFilter={hotelFilterCity}
        />

        {/* 4. Flight Tickets Online Booking Section */}
        <FlightBookingSection
          onAddBooking={handleAddBooking}
          defaultFrom={flightFrom}
          defaultTo={flightTo}
        />

        {/* 5. Vehicle Rental Section (Thuê xe tự lái & Limousine) */}
        <CarRentalSection
          onAddBooking={handleAddBooking}
          targetLocationFilter={vehicleLocation}
        />

        {/* 6. AI Travel Assistant (Lập lịch trình tour & Chatbot) */}
        <AiTravelPlannerSection
          onNavigateToBooking={(service, city) => {
            if (service === 'hotel') {
              setHotelFilterCity(city);
              handleNavigateToTab('hotels');
            } else if (service === 'flight') {
              handleNavigateToTab('flights');
            } else {
              handleNavigateToTab('vehicles');
            }
          }}
        />
      </main>

      {/* Slide-over My Bookings Drawer & QR Code E-Tickets */}
      <MyBookingsDrawer
        isOpen={isBookingsDrawerOpen}
        onClose={() => setIsBookingsDrawerOpen(false)}
        bookings={bookings}
        onRemoveBooking={handleRemoveBooking}
        onNavigateToTab={handleNavigateToTab}
      />

      {/* Global Footer */}
      <Footer onNavigateToTab={handleNavigateToTab} />

    </div>
  );
}

export default App;
