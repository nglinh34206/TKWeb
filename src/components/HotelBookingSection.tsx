import React, { useState } from 'react';
import { 
  Hotel as HotelIcon, 
  Star, 
  MapPin, 
  Check, 
  Search, 
  Filter, 
  X, 
  CreditCard, 
  Calendar, 
  Users, 
  Sparkles,
  QrCode,
  Tag
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { HOTELS } from '../data/hotels';
import { Hotel, HotelRoom, BookingRecord } from '../types';
import { formatVND } from '../utils/formatters';

interface HotelBookingSectionProps {
  onAddBooking: (booking: BookingRecord) => void;
  targetCityFilter?: string;
}

export const HotelBookingSection: React.FC<HotelBookingSectionProps> = ({
  onAddBooking,
  targetCityFilter
}) => {
  const [searchCity, setSearchCity] = useState(targetCityFilter || 'Tất cả');
  const [selectedStar, setSelectedStar] = useState<number | 'all'>('all');
  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null);
  const [selectedRoom, setSelectedRoom] = useState<HotelRoom | null>(null);
  
  // Checkout modal state
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [checkInDate, setCheckInDate] = useState('2026-08-22');
  const [checkOutDate, setCheckOutDate] = useState('2026-08-24');
  const [nightsCount] = useState(2);
  const [paymentMethod, setPaymentMethod] = useState<'vnpay' | 'momo' | 'card' | 'qr'>('vnpay');
  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoSuccessMsg, setPromoSuccessMsg] = useState('');
  const [bookingSuccessModal, setBookingSuccessModal] = useState<BookingRecord | null>(null);

  // Sync if prop changed
  React.useEffect(() => {
    if (targetCityFilter) {
      setSearchCity(targetCityFilter);
    }
  }, [targetCityFilter]);

  const filteredHotels = HOTELS.filter((hotel) => {
    const matchesCity = searchCity === 'Tất cả' || hotel.city.toLowerCase().includes(searchCity.toLowerCase()) || hotel.location.toLowerCase().includes(searchCity.toLowerCase());
    const matchesStar = selectedStar === 'all' || hotel.starRating === selectedStar;
    return matchesCity && matchesStar;
  });

  const handleApplyPromo = () => {
    const code = promoCode.trim().toUpperCase();
    if (code === 'VIETNAM2026' || code === 'SUMMER' || code === 'TRAVEL') {
      setDiscountPercent(15);
      setPromoSuccessMsg('Áp dụng mã giảm giá 15% thành công!');
    } else {
      setDiscountPercent(0);
      setPromoSuccessMsg('Mã giảm giá không hợp lệ. Hãy thử: VIETNAM2026');
    }
  };

  const handleStartBooking = (hotel: Hotel, room: HotelRoom) => {
    setSelectedHotel(hotel);
    setSelectedRoom(room);
    setIsCheckoutOpen(true);
  };

  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedHotel || !selectedRoom) return;

    const basePrice = selectedRoom.pricePerNight * nightsCount;
    const finalPrice = Math.round(basePrice * (1 - discountPercent / 100));

    const newBooking: BookingRecord = {
      id: `HT-${Date.now().toString().slice(-6)}`,
      type: 'hotel',
      createdAt: new Date().toLocaleDateString('vi-VN'),
      customerName: customerName || 'Nguyễn Văn A',
      customerPhone: customerPhone || '0912 345 678',
      customerEmail: customerEmail || 'guest@vietnamtravel.vn',
      totalPrice: finalPrice,
      status: 'confirmed',
      paymentMethod: paymentMethod.toUpperCase(),
      details: {
        hotelName: selectedHotel.name,
        roomName: selectedRoom.name,
        checkIn: checkInDate,
        checkOut: checkOutDate,
        nights: nightsCount,
        guests: selectedRoom.capacity
      }
    };

    onAddBooking(newBooking);
    setIsCheckoutOpen(false);
    setBookingSuccessModal(newBooking);

    // Trigger celebration confetti
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  return (
    <section id="hotels" className="py-16 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-2">
              <HotelIcon className="w-3.5 h-3.5" />
              <span>Khách Sạn & Resort Cao Cấp</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
              Nghỉ Dưỡng Thượng Lưu Khắp Việt Nam
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-1">
              Cam kết giá tốt nhất, kèm buffet sáng hảo hạng, view biển và tiện ích 5 sao đẳng cấp quốc tế.
            </p>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Destination Selector */}
          <div className="flex items-center gap-3 w-full md:w-auto">
            <MapPin className="w-5 h-5 text-emerald-600 shrink-0" />
            <div className="flex-1">
              <label className="text-[11px] font-bold text-slate-500 uppercase">Điểm đến:</label>
              <select
                id="hotel-section-city-select"
                value={searchCity}
                onChange={(e) => setSearchCity(e.target.value)}
                className="w-full bg-transparent font-bold text-sm text-slate-800 focus:outline-none cursor-pointer"
              >
                <option value="Tất cả">Tất cả các tỉnh thành (Việt Nam)</option>
                <option value="Vịnh Hạ Long">Vịnh Hạ Long (Quảng Ninh)</option>
                <option value="Phố Cổ Hội An">Hội An (Quảng Nam)</option>
                <option value="Đảo Ngọc Phú Quốc">Phú Quốc (Kiên Giang)</option>
                <option value="Sa Pa & Đỉnh Fansipan">Sa Pa (Lào Cai)</option>
                <option value="Đà Nẵng - Thành Phố Đáng Sống">Đà Nẵng</option>
                <option value="Thủ Đô Hà Nội">Hà Nội</option>
                <option value="TP. Hồ Chí Minh (Sài Gòn)">TP. Hồ Chí Minh</option>
                <option value="Đà Lạt - Thành Phố Ngàn Hoa">Đà Lạt</option>
              </select>
            </div>
          </div>

          {/* Star Filter */}
          <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto no-scrollbar">
            <span className="text-xs font-bold text-slate-500 whitespace-nowrap">Hạng sao:</span>
            <button
              onClick={() => setSelectedStar('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedStar === 'all' ? 'bg-slate-900 text-white' : 'bg-white border border-slate-200 text-slate-700'
              }`}
            >
              Tất cả
            </button>
            {[5, 4].map((stars) => (
              <button
                key={stars}
                onClick={() => setSelectedStar(stars)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1 transition-all ${
                  selectedStar === stars ? 'bg-emerald-600 text-white' : 'bg-white border border-slate-200 text-slate-700'
                }`}
              >
                <span>{stars}</span>
                <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              </button>
            ))}
          </div>

        </div>

        {/* Hotels Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredHotels.map((hotel) => (
            <div
              key={hotel.id}
              id={`hotel-card-${hotel.id}`}
              className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col sm:flex-row group"
            >
              {/* Hotel Image */}
              <div className="relative sm:w-2/5 h-56 sm:h-auto overflow-hidden">
                <img
                  src={hotel.coverImage}
                  alt={hotel.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {hotel.popularTag && (
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-amber-400 text-slate-950 uppercase shadow">
                    {hotel.popularTag}
                  </span>
                )}
                <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-lg flex items-center gap-1 text-white text-xs font-bold">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>{hotel.userRating}</span>
                  <span className="text-[10px] text-slate-300 font-normal">({hotel.reviewsCount})</span>
                </div>
              </div>

              {/* Hotel Info & Rooms */}
              <div className="p-5 sm:w-3/5 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center gap-1 text-amber-400 mb-1">
                    {Array.from({ length: hotel.starRating }).map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                  </div>

                  <h3 className="font-bold text-lg text-slate-900 leading-tight">
                    {hotel.name}
                  </h3>

                  <p className="text-xs text-slate-500 flex items-center gap-1 mt-1 line-clamp-1">
                    <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>{hotel.location}</span>
                  </p>

                  <p className="text-xs text-slate-600 mt-2 line-clamp-2 leading-relaxed">
                    {hotel.description}
                  </p>

                  {/* Amenities Pills */}
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {hotel.amenities.slice(0, 3).map((amenity, i) => (
                      <span key={i} className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 text-[10px] font-medium">
                        ✓ {amenity}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Pricing & Booking Room Action */}
                <div className="pt-3 border-t border-slate-100 flex items-end justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 font-semibold uppercase">Giá từ</span>
                    <div className="text-lg font-extrabold text-emerald-600 leading-none">
                      {formatVND(hotel.priceStartFrom)}
                    </div>
                    <span className="text-[10px] text-slate-500">/ đêm • Đã gồm thuế & phí</span>
                  </div>

                  <button
                    onClick={() => {
                      setSelectedHotel(hotel);
                      setSelectedRoom(hotel.rooms[0]);
                      setIsCheckoutOpen(true);
                    }}
                    id={`btn-select-room-${hotel.id}`}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white text-xs font-bold shadow-md shadow-emerald-600/20 transition-all"
                  >
                    Chọn Phòng Ngay
                  </button>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Hotel Checkout Booking Modal */}
      {isCheckoutOpen && selectedHotel && selectedRoom && (
        <div 
          id="hotel-checkout-modal"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm overflow-y-auto"
        >
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 relative animate-in fade-in zoom-in duration-200">
            
            {/* Modal Header */}
            <div className="p-5 sm:p-6 bg-slate-900 text-white rounded-t-3xl flex items-center justify-between">
              <div>
                <span className="text-xs text-emerald-400 font-bold uppercase tracking-wider">Xác nhận đặt phòng</span>
                <h3 className="text-xl font-extrabold text-white mt-0.5">{selectedHotel.name}</h3>
              </div>
              <button
                onClick={() => setIsCheckoutOpen(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Room selection summary */}
            <form onSubmit={handleConfirmBooking} className="p-6 space-y-5 text-slate-800">
              
              {/* Room Card inside Modal */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                  <h4 className="font-bold text-sm text-slate-900">{selectedRoom.name}</h4>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {selectedRoom.bedType} • {selectedRoom.sizeM2}m² • Tối đa {selectedRoom.capacity} khách
                  </p>
                  <p className="text-xs text-emerald-700 font-semibold mt-1">
                    ✓ Miễn phí bữa sáng Buffet hàng ngày & Trà chiều
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-xs text-slate-400 line-through">
                    {selectedRoom.originalPrice && formatVND(selectedRoom.originalPrice)}
                  </span>
                  <div className="text-base font-extrabold text-emerald-600">
                    {formatVND(selectedRoom.pricePerNight)} / đêm
                  </div>
                </div>
              </div>

              {/* Guest Form Fields */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Thông tin người đại diện đặt phòng</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-slate-600">Họ và tên khách hàng *</label>
                    <input
                      type="text"
                      required
                      placeholder="Nguyễn Văn A"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none mt-1"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-600">Số điện thoại liên hệ *</label>
                    <input
                      type="tel"
                      required
                      placeholder="0912 345 678"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none mt-1"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-600">Email nhận vé điện tử E-Voucher *</label>
                  <input
                    type="email"
                    required
                    placeholder="nguyenvana@gmail.com"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none mt-1"
                  />
                </div>
              </div>

              {/* Checkin / Checkout date selection */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-600 flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-emerald-600" />
                    <span>Ngày nhận phòng</span>
                  </label>
                  <input
                    type="date"
                    value={checkInDate}
                    onChange={(e) => setCheckInDate(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-emerald-500 mt-1"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-600 flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-emerald-600" />
                    <span>Ngày trả phòng</span>
                  </label>
                  <input
                    type="date"
                    value={checkOutDate}
                    onChange={(e) => setCheckOutDate(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-emerald-500 mt-1"
                  />
                </div>
              </div>

              {/* Promo Code Input */}
              <div className="p-3 bg-amber-50/70 border border-amber-200 rounded-2xl space-y-1.5">
                <div className="flex items-center gap-2">
                  <Tag className="w-4 h-4 text-amber-600" />
                  <span className="text-xs font-bold text-amber-900">Mã giảm giá ưu đãi (Thử mã: VIETNAM2026)</span>
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Nhập mã: VIETNAM2026"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="flex-1 px-3 py-1.5 bg-white border border-amber-300 rounded-xl text-xs uppercase font-bold focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={handleApplyPromo}
                    className="px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-bold"
                  >
                    Áp Dụng
                  </button>
                </div>
                {promoSuccessMsg && (
                  <p className={`text-[11px] font-semibold ${discountPercent > 0 ? 'text-emerald-700' : 'text-rose-600'}`}>
                    {promoSuccessMsg}
                  </p>
                )}
              </div>

              {/* Payment Method Selector */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Phương thức thanh toán trực tuyến</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: 'vnpay', label: 'VNPAY-QR' },
                    { id: 'momo', label: 'Ví MoMo' },
                    { id: 'card', label: 'Thẻ Visa/Master' },
                    { id: 'qr', label: 'Chuyển khoản QR' },
                  ].map((method) => (
                    <button
                      type="button"
                      key={method.id}
                      onClick={() => setPaymentMethod(method.id as any)}
                      className={`p-2.5 rounded-xl border text-xs font-bold text-center transition-all ${
                        paymentMethod === method.id
                          ? 'border-emerald-600 bg-emerald-50 text-emerald-800 shadow-sm'
                          : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      {method.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Total Calculation & Confirm Button */}
              <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <p className="text-xs text-slate-500">
                    Tổng tiền ({nightsCount} đêm {discountPercent > 0 ? `• Giảm ${discountPercent}%` : ''}):
                  </p>
                  <p className="text-2xl font-extrabold text-emerald-600">
                    {formatVND(Math.round(selectedRoom.pricePerNight * nightsCount * (1 - discountPercent / 100)))}
                  </p>
                </div>

                <button
                  type="submit"
                  id="btn-confirm-hotel-booking"
                  className="w-full sm:w-auto px-8 py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-extrabold text-sm shadow-xl shadow-emerald-600/30 flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5"
                >
                  <CreditCard className="w-4 h-4" />
                  <span>Xác Nhận & Nhận E-Voucher</span>
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

      {/* Booking Success Confirmation Dialog */}
      {bookingSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 text-center space-y-4 shadow-2xl border border-slate-200">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
              <Check className="w-8 h-8" />
            </div>

            <h3 className="text-xl font-extrabold text-slate-900">Đặt Phòng Thành Công!</h3>
            <p className="text-xs text-slate-600">
              Mã đặt phòng: <span className="font-bold text-emerald-600">{bookingSuccessModal.id}</span>
            </p>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-left text-xs space-y-1.5">
              <p><span className="font-bold text-slate-700">Khách sạn:</span> {bookingSuccessModal.details.hotelName}</p>
              <p><span className="font-bold text-slate-700">Hạng phòng:</span> {bookingSuccessModal.details.roomName}</p>
              <p><span className="font-bold text-slate-700">Thời gian:</span> {bookingSuccessModal.details.checkIn} đến {bookingSuccessModal.details.checkOut} ({bookingSuccessModal.details.nights} đêm)</p>
              <p><span className="font-bold text-slate-700">Khách hàng:</span> {bookingSuccessModal.customerName} ({bookingSuccessModal.customerPhone})</p>
              <p><span className="font-bold text-slate-700">Tổng thanh toán:</span> <span className="text-emerald-600 font-extrabold">{formatVND(bookingSuccessModal.totalPrice)}</span></p>
            </div>

            <div className="pt-2">
              <button
                onClick={() => setBookingSuccessModal(null)}
                className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow transition-colors"
              >
                Đóng & Xem Trong Đơn Đặt Của Tôi
              </button>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};
