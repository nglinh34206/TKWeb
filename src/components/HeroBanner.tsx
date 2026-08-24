import React, { useState } from 'react';
import { 
  Hotel, 
  Plane, 
  Car, 
  MapPin, 
  Sparkles, 
  Search, 
  Calendar, 
  Users, 
  ArrowRight,
  ShieldCheck,
  CreditCard,
  Headphones
} from 'lucide-react';
import { AIRPORTS } from '../data/flights';

interface HeroBannerProps {
  onSearchHotels: (destination: string) => void;
  onSearchFlights: (from: string, to: string) => void;
  onSearchVehicles: (location: string, type: string) => void;
  onNavigateToTab: (tabId: string) => void;
  onSelectRouteFromHero: (from: string, to: string) => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  onSearchHotels,
  onSearchFlights,
  onSearchVehicles,
  onNavigateToTab,
  onSelectRouteFromHero
}) => {
  const [activeSearchTab, setActiveSearchTab] = useState<'hotel' | 'flight' | 'car' | 'route' | 'ai'>('hotel');

  // Hotel search state
  const [hotelCity, setHotelCity] = useState('Vịnh Hạ Long');
  const [hotelGuests, setHotelGuests] = useState('2 người lớn, 1 phòng');

  // Flight search state
  const [flightFrom, setFlightFrom] = useState('HAN');
  const [flightTo, setFlightTo] = useState('SGN');
  const [tripType, setTripType] = useState<'roundtrip' | 'oneway'>('oneway');

  // Car search state
  const [carCity, setCarCity] = useState('Hà Nội');
  const [carType, setCarType] = useState('self_drive');

  // Route map search
  const [routeFrom, setRouteFrom] = useState('Hà Nội');
  const [routeTo, setRouteTo] = useState('Vịnh Hạ Long');

  const handleHotelSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearchHotels(hotelCity);
    onNavigateToTab('hotels');
  };

  const handleFlightSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearchFlights(flightFrom, flightTo);
    onNavigateToTab('flights');
  };

  const handleCarSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearchVehicles(carCity, carType);
    onNavigateToTab('vehicles');
  };

  const handleRouteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSelectRouteFromHero(routeFrom, routeTo);
    onNavigateToTab('map');
  };

  return (
    <div className="relative min-h-[640px] md:min-h-[720px] bg-[#1A1A1A] flex flex-col justify-center pt-28 pb-16 overflow-hidden">
      
      {/* Background Image with Editorial Cinematic Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-all duration-1000 transform scale-105 opacity-40"
        style={{ 
          backgroundImage: `url('https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=2000&q=85')` 
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] via-[#1A1A1A]/70 to-[#1A1A1A]/90" />
      </div>

      {/* Editorial Decorative Watermark text */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white/[0.03] text-8xl md:text-[14rem] font-serif font-black italic select-none pointer-events-none whitespace-nowrap">
        VIETNAM
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        
        {/* Hero Top Content */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 border border-white/20 bg-white/5 text-[#E5E2D9] text-[10px] font-sans uppercase tracking-[0.3em] font-medium backdrop-blur-sm">
            <Sparkles className="w-3 h-3 text-[#C5A059]" />
            <span>Grand Tourism & Travel Concierge</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif text-white tracking-tight leading-[1.05]">
            Khám Phá Việt Nam <br />
            <span className="font-light italic text-[#E5E2D9] font-serif">
              Tuyệt Tác Thiên Nhiên
            </span>
          </h1>

          <p className="text-stone-300 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto font-sans font-light">
            Trải nghiệm đặt phòng khách sạn & resort danh tiếng, vé máy bay nội địa, thuê xe du lịch cao cấp cùng bản đồ tương tác và trợ lý AI thông minh khắp 3 miền.
          </p>
        </div>

        {/* Multi-Service Search Engine Card - Editorial Parchment Style */}
        <div className="bg-[#FDFCFB] border border-[#1A1A1A]/10 shadow-2xl p-5 sm:p-7 max-w-5xl mx-auto text-[#1A1A1A]">
          
          {/* Service Selector Tabs */}
          <div className="flex items-center gap-1 sm:gap-2 pb-4 mb-5 border-b border-[#1A1A1A]/10 overflow-x-auto no-scrollbar">
            
            <button
              id="hero-tab-hotel"
              onClick={() => setActiveSearchTab('hotel')}
              className={`flex items-center gap-2 px-4 py-2.5 text-xs font-sans uppercase tracking-[0.15em] font-bold transition-all whitespace-nowrap border ${
                activeSearchTab === 'hotel'
                  ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]'
                  : 'bg-[#F9F7F2] text-[#1A1A1A]/80 border-transparent hover:border-[#1A1A1A]/20'
              }`}
            >
              <Hotel className="w-3.5 h-3.5" />
              <span>Khách Sạn & Resort</span>
            </button>

            <button
              id="hero-tab-flight"
              onClick={() => setActiveSearchTab('flight')}
              className={`flex items-center gap-2 px-4 py-2.5 text-xs font-sans uppercase tracking-[0.15em] font-bold transition-all whitespace-nowrap border ${
                activeSearchTab === 'flight'
                  ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]'
                  : 'bg-[#F9F7F2] text-[#1A1A1A]/80 border-transparent hover:border-[#1A1A1A]/20'
              }`}
            >
              <Plane className="w-3.5 h-3.5" />
              <span>Vé Máy Bay</span>
            </button>

            <button
              id="hero-tab-car"
              onClick={() => setActiveSearchTab('car')}
              className={`flex items-center gap-2 px-4 py-2.5 text-xs font-sans uppercase tracking-[0.15em] font-bold transition-all whitespace-nowrap border ${
                activeSearchTab === 'car'
                  ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]'
                  : 'bg-[#F9F7F2] text-[#1A1A1A]/80 border-transparent hover:border-[#1A1A1A]/20'
              }`}
            >
              <Car className="w-3.5 h-3.5" />
              <span>Thuê Xe Du Lịch</span>
            </button>

            <button
              id="hero-tab-route"
              onClick={() => setActiveSearchTab('route')}
              className={`flex items-center gap-2 px-4 py-2.5 text-xs font-sans uppercase tracking-[0.15em] font-bold transition-all whitespace-nowrap border ${
                activeSearchTab === 'route'
                  ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]'
                  : 'bg-[#F9F7F2] text-[#1A1A1A]/80 border-transparent hover:border-[#1A1A1A]/20'
              }`}
            >
              <MapPin className="w-3.5 h-3.5" />
              <span>Chỉ Đường Bản Đồ</span>
            </button>

            <button
              id="hero-tab-ai"
              onClick={() => {
                setActiveSearchTab('ai');
                onNavigateToTab('ai-planner');
              }}
              className="flex items-center gap-2 px-4 py-2.5 text-xs font-sans uppercase tracking-[0.15em] font-bold transition-all whitespace-nowrap bg-[#F9F7F2] text-[#C5A059] hover:bg-[#EBE7DE] border border-[#C5A059]/40"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>Trợ Lý AI Tour</span>
            </button>

          </div>

          {/* Form Content: Hotel Search */}
          {activeSearchTab === 'hotel' && (
            <form onSubmit={handleHotelSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
              <div className="space-y-1.5 md:col-span-1">
                <label className="text-[10px] font-sans font-bold uppercase tracking-wider text-[#1A1A1A]/60 flex items-center gap-1.5">
                  <MapPin className="w-3 h-3 text-[#C5A059]" />
                  <span>Điểm Đến / Thành Phố</span>
                </label>
                <select
                  id="hero-hotel-destination-select"
                  value={hotelCity}
                  onChange={(e) => setHotelCity(e.target.value)}
                  className="w-full px-3.5 py-3 bg-white border border-[#1A1A1A]/20 text-sm font-sans italic focus:border-[#1A1A1A] focus:outline-none"
                >
                  <option value="Tất cả">Tất cả địa điểm Việt Nam</option>
                  <option value="Vịnh Hạ Long">Vịnh Hạ Long (Quảng Ninh)</option>
                  <option value="Phố Cổ Hội An">Phố Cổ Hội An (Quảng Nam)</option>
                  <option value="Đảo Ngọc Phú Quốc">Phú Quốc (Kiên Giang)</option>
                  <option value="Sa Pa & Đỉnh Fansipan">Sa Pa (Lào Cai)</option>
                  <option value="Đà Nẵng - Thành Phố Đáng Sống">Đà Nẵng</option>
                  <option value="TP. Hồ Chí Minh (Sài Gòn)">TP. Hồ Chí Minh</option>
                  <option value="Thủ Đô Hà Nội">Hà Nội</option>
                  <option value="Đà Lạt - Thành Phố Ngàn Hoa">Đà Lạt (Lâm Đồng)</option>
                  <option value="Nha Trang - Vịnh Biển Xanh">Nha Trang (Khánh Hòa)</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-sans font-bold uppercase tracking-wider text-[#1A1A1A]/60 flex items-center gap-1.5">
                  <Calendar className="w-3 h-3 text-[#C5A059]" />
                  <span>Ngày Nhận & Trả Phòng</span>
                </label>
                <input
                  type="text"
                  defaultValue="Hôm nay - 3 ngày tới"
                  className="w-full px-3.5 py-3 bg-white border border-[#1A1A1A]/20 text-sm font-sans italic focus:border-[#1A1A1A] focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-sans font-bold uppercase tracking-wider text-[#1A1A1A]/60 flex items-center gap-1.5">
                  <Users className="w-3 h-3 text-[#C5A059]" />
                  <span>Số Khách & Phòng</span>
                </label>
                <select
                  value={hotelGuests}
                  onChange={(e) => setHotelGuests(e.target.value)}
                  className="w-full px-3.5 py-3 bg-white border border-[#1A1A1A]/20 text-sm font-sans italic focus:border-[#1A1A1A] focus:outline-none"
                >
                  <option value="1 người lớn, 1 phòng">1 người lớn, 1 phòng</option>
                  <option value="2 người lớn, 1 phòng">2 người lớn, 1 phòng</option>
                  <option value="2 người lớn, 2 trẻ em, 1 phòng">Gia đình (2 lớn, 2 bé)</option>
                  <option value="4 người lớn, 2 phòng">Nhóm bạn (4 lớn, 2 phòng)</option>
                </select>
              </div>

              <button
                type="submit"
                id="hero-btn-search-hotel"
                className="w-full bg-[#1A1A1A] hover:bg-[#333] text-white font-sans uppercase tracking-[0.2em] font-semibold py-3.5 px-6 text-xs flex items-center justify-center gap-2 transition-all shadow-sm"
              >
                <Search className="w-3.5 h-3.5" />
                <span>Tìm Khách Sạn</span>
              </button>
            </form>
          )}

          {/* Form Content: Flight Search */}
          {activeSearchTab === 'flight' && (
            <form onSubmit={handleFlightSubmit} className="space-y-4">
              <div className="flex items-center gap-6 text-[11px] font-sans uppercase tracking-wider font-semibold text-[#1A1A1A]/80 pb-1">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="tripType"
                    checked={tripType === 'oneway'}
                    onChange={() => setTripType('oneway')}
                    className="accent-[#1A1A1A]"
                  />
                  <span>Một Chiều</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="tripType"
                    checked={tripType === 'roundtrip'}
                    onChange={() => setTripType('roundtrip')}
                    className="accent-[#1A1A1A]"
                  />
                  <span>Khứ Hồi</span>
                </label>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-sans font-bold uppercase tracking-wider text-[#1A1A1A]/60 flex items-center gap-1.5">
                    <Plane className="w-3 h-3 text-[#C5A059] rotate-45" />
                    <span>Nơi Khởi Hành</span>
                  </label>
                  <select
                    value={flightFrom}
                    onChange={(e) => setFlightFrom(e.target.value)}
                    className="w-full px-3.5 py-3 bg-white border border-[#1A1A1A]/20 text-sm font-sans italic focus:border-[#1A1A1A] focus:outline-none"
                  >
                    {AIRPORTS.map((airport) => (
                      <option key={airport.code} value={airport.code}>
                        {airport.city} ({airport.code})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-sans font-bold uppercase tracking-wider text-[#1A1A1A]/60 flex items-center gap-1.5">
                    <Plane className="w-3 h-3 text-[#C5A059] rotate-135" />
                    <span>Nơi Đến</span>
                  </label>
                  <select
                    value={flightTo}
                    onChange={(e) => setFlightTo(e.target.value)}
                    className="w-full px-3.5 py-3 bg-white border border-[#1A1A1A]/20 text-sm font-sans italic focus:border-[#1A1A1A] focus:outline-none"
                  >
                    {AIRPORTS.map((airport) => (
                      <option key={airport.code} value={airport.code}>
                        {airport.city} ({airport.code})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-sans font-bold uppercase tracking-wider text-[#1A1A1A]/60 flex items-center gap-1.5">
                    <Calendar className="w-3 h-3 text-[#C5A059]" />
                    <span>Ngày Bay</span>
                  </label>
                  <input
                    type="date"
                    defaultValue="2026-08-20"
                    className="w-full px-3.5 py-3 bg-white border border-[#1A1A1A]/20 text-sm font-sans focus:border-[#1A1A1A] focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  id="hero-btn-search-flight"
                  className="w-full bg-[#1A1A1A] hover:bg-[#333] text-white font-sans uppercase tracking-[0.2em] font-semibold py-3.5 px-6 text-xs flex items-center justify-center gap-2 transition-all shadow-sm"
                >
                  <Search className="w-3.5 h-3.5" />
                  <span>Tìm Chuyến Bay</span>
                </button>
              </div>
            </form>
          )}

          {/* Form Content: Car Search */}
          {activeSearchTab === 'car' && (
            <form onSubmit={handleCarSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
              <div className="space-y-1.5">
                <label className="text-[10px] font-sans font-bold uppercase tracking-wider text-[#1A1A1A]/60 flex items-center gap-1.5">
                  <MapPin className="w-3 h-3 text-[#C5A059]" />
                  <span>Khu Vực Nhận Xe</span>
                </label>
                <select
                  value={carCity}
                  onChange={(e) => setCarCity(e.target.value)}
                  className="w-full px-3.5 py-3 bg-white border border-[#1A1A1A]/20 text-sm font-sans italic focus:border-[#1A1A1A] focus:outline-none"
                >
                  <option value="Hà Nội">Hà Nội & Miền Bắc</option>
                  <option value="Đà Nẵng">Đà Nẵng & Hội An</option>
                  <option value="TP. Hồ Chí Minh">TP. Hồ Chí Minh & Miền Nam</option>
                  <option value="Phú Quốc">Đảo Phú Quốc</option>
                  <option value="Đà Lạt">Đà Lạt & Tây Nguyên</option>
                  <option value="Nha Trang">Nha Trang (Khánh Hòa)</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-sans font-bold uppercase tracking-wider text-[#1A1A1A]/60 flex items-center gap-1.5">
                  <Car className="w-3 h-3 text-[#C5A059]" />
                  <span>Loại Phương Tiện</span>
                </label>
                <select
                  value={carType}
                  onChange={(e) => setCarType(e.target.value)}
                  className="w-full px-3.5 py-3 bg-white border border-[#1A1A1A]/20 text-sm font-sans italic focus:border-[#1A1A1A] focus:outline-none"
                >
                  <option value="self_drive">Ô tô tự lái (4 - 7 chỗ / Xe Điện)</option>
                  <option value="limousine">Vé xe Limousine VIP liên tỉnh</option>
                  <option value="airport_transfer">Xe đưa đón sân bay riêng</option>
                  <option value="motorbike">Thuê xe máy phượt</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-sans font-bold uppercase tracking-wider text-[#1A1A1A]/60 flex items-center gap-1.5">
                  <Calendar className="w-3 h-3 text-[#C5A059]" />
                  <span>Thời Gian Thuê</span>
                </label>
                <input
                  type="text"
                  defaultValue="2 ngày (Nhận 08:00 - Trả 18:00)"
                  className="w-full px-3.5 py-3 bg-white border border-[#1A1A1A]/20 text-sm font-sans italic focus:border-[#1A1A1A] focus:outline-none"
                />
              </div>

              <button
                type="submit"
                id="hero-btn-search-car"
                className="w-full bg-[#1A1A1A] hover:bg-[#333] text-white font-sans uppercase tracking-[0.2em] font-semibold py-3.5 px-6 text-xs flex items-center justify-center gap-2 transition-all shadow-sm"
              >
                <Search className="w-3.5 h-3.5" />
                <span>Tìm Phương Tiện</span>
              </button>
            </form>
          )}

          {/* Form Content: Route Map Search */}
          {activeSearchTab === 'route' && (
            <form onSubmit={handleRouteSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
              <div className="space-y-1.5">
                <label className="text-[10px] font-sans font-bold uppercase tracking-wider text-[#1A1A1A]/60 flex items-center gap-1.5">
                  <MapPin className="w-3 h-3 text-[#1A1A1A]" />
                  <span>Điểm Khởi Hành (A)</span>
                </label>
                <select
                  value={routeFrom}
                  onChange={(e) => setRouteFrom(e.target.value)}
                  className="w-full px-3.5 py-3 bg-white border border-[#1A1A1A]/20 text-sm font-sans italic focus:border-[#1A1A1A] focus:outline-none"
                >
                  <option value="Hà Nội">Thủ Đô Hà Nội</option>
                  <option value="TP. Hồ Chí Minh">TP. Hồ Chí Minh</option>
                  <option value="Đà Nẵng">Đà Nẵng</option>
                  <option value="Vịnh Hạ Long">Vịnh Hạ Long</option>
                  <option value="Sa Pa">Sa Pa</option>
                  <option value="Ninh Bình">Ninh Bình</option>
                  <option value="Huế">Cố Đô Huế</option>
                  <option value="Hội An">Phố Cổ Hội An</option>
                  <option value="Nha Trang">Nha Trang</option>
                  <option value="Đà Lạt">Đà Lạt</option>
                  <option value="Phú Quốc">Đảo Phú Quốc</option>
                  <option value="Cần Thơ">Cần Thơ</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-sans font-bold uppercase tracking-wider text-[#1A1A1A]/60 flex items-center gap-1.5">
                  <MapPin className="w-3 h-3 text-[#C5A059]" />
                  <span>Điểm Đến (B)</span>
                </label>
                <select
                  value={routeTo}
                  onChange={(e) => setRouteTo(e.target.value)}
                  className="w-full px-3.5 py-3 bg-white border border-[#1A1A1A]/20 text-sm font-sans italic focus:border-[#1A1A1A] focus:outline-none"
                >
                  <option value="Vịnh Hạ Long">Vịnh Hạ Long (Quảng Ninh)</option>
                  <option value="Hội An">Phố Cổ Hội An (Quảng Nam)</option>
                  <option value="Đà Nẵng">Đà Nẵng (Bà Nà Hills & Mỹ Khê)</option>
                  <option value="Sa Pa">Sa Pa & Fansipan</option>
                  <option value="Ninh Bình">Ninh Bình (Tràng An)</option>
                  <option value="Huế">Cố Đô Huế</option>
                  <option value="Đà Lạt">Đà Lạt (Lâm Đồng)</option>
                  <option value="Nha Trang">Nha Trang (Khánh Hòa)</option>
                  <option value="Phú Quốc">Đảo Ngọc Phú Quốc</option>
                  <option value="Cần Thơ">Cần Thơ (Chợ Nổi)</option>
                  <option value="Hà Nội">Thủ Đô Hà Nội</option>
                  <option value="TP. Hồ Chí Minh">TP. Hồ Chí Minh</option>
                </select>
              </div>

              <button
                type="submit"
                id="hero-btn-search-route"
                className="w-full bg-[#1A1A1A] hover:bg-[#333] text-white font-sans uppercase tracking-[0.2em] font-semibold py-3.5 px-6 text-xs flex items-center justify-center gap-2 transition-all shadow-sm"
              >
                <span>Xem Lộ Trình Bản Đồ</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>
          )}

        </div>

        {/* Editorial Trust & Quality Badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-5xl mx-auto mt-8">
          <div className="flex items-center gap-3 bg-[#1A1A1A]/60 backdrop-blur-md p-3.5 border border-white/10">
            <div className="p-2 border border-[#C5A059]/40 text-[#C5A059] font-serif font-bold text-xs">
              01
            </div>
            <div>
              <p className="text-xs font-sans uppercase tracking-wider font-bold text-white">Xác Nhận Tức Thì</p>
              <p className="text-[10px] text-stone-300 font-sans">E-Ticket & Thẻ QR trực tuyến</p>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-[#1A1A1A]/60 backdrop-blur-md p-3.5 border border-white/10">
            <div className="p-2 border border-[#C5A059]/40 text-[#C5A059] font-serif font-bold text-xs">
              02
            </div>
            <div>
              <p className="text-xs font-sans uppercase tracking-wider font-bold text-white">Thanh Toán An Toàn</p>
              <p className="text-[10px] text-stone-300 font-sans">VNPAY, MoMo, Visa/Master</p>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-[#1A1A1A]/60 backdrop-blur-md p-3.5 border border-white/10">
            <div className="p-2 border border-[#C5A059]/40 text-[#C5A059] font-serif font-bold text-xs">
              03
            </div>
            <div>
              <p className="text-xs font-sans uppercase tracking-wider font-bold text-white">Trợ Lý AI 24/7</p>
              <p className="text-[10px] text-stone-300 font-sans">Lập tour & giải đáp thắc mắc</p>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-[#1A1A1A]/60 backdrop-blur-md p-3.5 border border-white/10">
            <div className="p-2 border border-[#C5A059]/40 text-[#C5A059] font-serif font-bold text-xs">
              04
            </div>
            <div>
              <p className="text-xs font-sans uppercase tracking-wider font-bold text-white">Cam Kết Chất Lượng</p>
              <p className="text-[10px] text-stone-300 font-sans">Dịch vụ thẩm định uy tín</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
