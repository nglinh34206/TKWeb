import React, { useState } from 'react';
import { 
  Car, 
  MapPin, 
  Fuel, 
  Users, 
  ShieldCheck, 
  Star, 
  ArrowRight, 
  Check, 
  X, 
  CreditCard,
  Zap,
  Calendar
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { VEHICLES } from '../data/vehicles';
import { Vehicle, BookingRecord } from '../types';
import { formatVND } from '../utils/formatters';

interface CarRentalSectionProps {
  onAddBooking: (booking: BookingRecord) => void;
  targetLocationFilter?: string;
}

export const CarRentalSection: React.FC<CarRentalSectionProps> = ({
  onAddBooking,
  targetLocationFilter
}) => {
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedLocation, setSelectedLocation] = useState<string>(targetLocationFilter || 'all');
  
  // Checkout state
  const [activeVehicle, setActiveVehicle] = useState<Vehicle | null>(null);
  const [driverName, setDriverName] = useState('');
  const [driverPhone, setDriverPhone] = useState('');
  const [pickupAddress, setPickupAddress] = useState('');
  const [rentalDays, setRentalDays] = useState(2);
  const [pickupDate, setPickupDate] = useState('2026-08-22');
  const [withDriver, setWithDriver] = useState(false);
  const [bookingSuccessVehicle, setBookingSuccessVehicle] = useState<BookingRecord | null>(null);

  React.useEffect(() => {
    if (targetLocationFilter) {
      setSelectedLocation(targetLocationFilter);
    }
  }, [targetLocationFilter]);

  const filteredVehicles = VEHICLES.filter((v) => {
    const matchesType = selectedType === 'all' || v.type === selectedType;
    const matchesLocation = selectedLocation === 'all' || v.locationAvailable.some(loc => loc.toLowerCase().includes(selectedLocation.toLowerCase()));
    return matchesType && matchesLocation;
  });

  const handleConfirmVehicle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeVehicle) return;

    const basePrice = activeVehicle.pricePerDay * rentalDays;
    const driverFee = withDriver ? 500000 * rentalDays : 0;
    const totalPrice = basePrice + driverFee;

    const newBooking: BookingRecord = {
      id: `CR-${Date.now().toString().slice(-6)}`,
      type: 'vehicle',
      createdAt: new Date().toLocaleDateString('vi-VN'),
      customerName: driverName || 'Nguyễn Văn A',
      customerPhone: driverPhone || '0912 345 678',
      customerEmail: 'customer@vietnamtravel.vn',
      totalPrice: totalPrice,
      status: 'confirmed',
      paymentMethod: 'VNPAY-ONLINE',
      details: {
        vehicleName: activeVehicle.name,
        pickupDate: pickupDate,
        returnDate: `2026-08-${Number(pickupDate.split('-')[2]) + Number(rentalDays)}`,
        pickupLocation: pickupAddress || 'Giao tận nơi tại khách sạn/sân bay'
      }
    };

    onAddBooking(newBooking);
    setActiveVehicle(null);
    setBookingSuccessVehicle(newBooking);

    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  const getVehicleTypeLabel = (type: string) => {
    switch (type) {
      case 'self_drive': return 'Ô tô tự lái 4-7 chỗ';
      case 'limousine': return 'Xe Limousine VIP';
      case 'airport_transfer': return 'Đưa đón sân bay riêng';
      case 'motorbike': return 'Xe máy du lịch phượt';
      default: return 'Xe du lịch';
    }
  };

  return (
    <section id="vehicles" className="py-16 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold uppercase tracking-wider mb-2">
              <Car className="w-3.5 h-3.5" />
              <span>Dịch Vụ Thuê Xe Trực Tuyến</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
              Thuê Xe Tự Lái, Limousine & Đưa Đón Sân Bay
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-1">
              Đầy đủ các dòng xe điện thông minh VinFast, MPV gia đình, Limousine hạng thượng gia và xe máy vi vu khắp nẻo đường.
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Location selector */}
          <div className="flex items-center gap-2 w-full md:w-auto">
            <MapPin className="w-4 h-4 text-emerald-600 shrink-0" />
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="bg-transparent font-bold text-xs sm:text-sm text-slate-800 focus:outline-none cursor-pointer"
            >
              <option value="all">Tất cả khu vực giao xe</option>
              <option value="Hà Nội">Hà Nội</option>
              <option value="Đà Nẵng">Đà Nẵng & Hội An</option>
              <option value="TP. Hồ Chí Minh">TP. Hồ Chí Minh</option>
              <option value="Phú Quốc">Phú Quốc</option>
              <option value="Đà Lạt">Đà Lạt</option>
              <option value="Nha Trang">Nha Trang</option>
              <option value="Sa Pa">Sa Pa</option>
            </select>
          </div>

          {/* Type filters */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar w-full md:w-auto">
            {[
              { id: 'all', label: 'Tất cả loại xe' },
              { id: 'self_drive', label: '🚗 Ô tô tự lái' },
              { id: 'limousine', label: '🚐 Limousine VIP' },
              { id: 'airport_transfer', label: '✈️ Đón sân bay' },
              { id: 'motorbike', label: '🛵 Xe máy phượt' },
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => setSelectedType(t.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  selectedType === t.id
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

        </div>

        {/* Vehicles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVehicles.map((vehicle) => (
            <div
              key={vehicle.id}
              id={`vehicle-card-${vehicle.id}`}
              className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Vehicle Image */}
                <div className="relative h-48 overflow-hidden bg-slate-100">
                  <img
                    src={vehicle.image}
                    alt={vehicle.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full text-white text-[11px] font-bold">
                    {getVehicleTypeLabel(vehicle.type)}
                  </div>
                  {vehicle.fuelType === 'Điện' && (
                    <div className="absolute top-3 right-3 bg-emerald-500 text-white px-2 py-0.5 rounded-full text-[10px] font-extrabold flex items-center gap-1 shadow">
                      <Zap className="w-3 h-3" />
                      <span>Xe Điện Xanh</span>
                    </div>
                  )}
                </div>

                {/* Body Details */}
                <div className="p-5 space-y-3">
                  <div>
                    <div className="flex items-center gap-1 text-xs text-amber-500 font-bold mb-1">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span>{vehicle.rating}</span>
                      <span className="text-slate-400 font-normal">({vehicle.reviewsCount} chuyến)</span>
                      <span className="text-slate-300 mx-1">•</span>
                      <span className="text-slate-500 font-semibold">{vehicle.provider}</span>
                    </div>

                    <h3 className="font-extrabold text-base text-slate-900 leading-tight">
                      {vehicle.name}
                    </h3>
                  </div>

                  {/* Specs */}
                  <div className="grid grid-cols-3 gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-200 text-center">
                    <div>
                      <span className="text-[10px] text-slate-400 font-semibold uppercase block">Chỗ ngồi</span>
                      <span className="text-xs font-extrabold text-slate-800 flex items-center justify-center gap-1 mt-0.5">
                        <Users className="w-3 h-3 text-slate-500" />
                        {vehicle.seats} chỗ
                      </span>
                    </div>

                    <div>
                      <span className="text-[10px] text-slate-400 font-semibold uppercase block">Hộp số</span>
                      <span className="text-xs font-extrabold text-slate-800 mt-0.5 block">
                        {vehicle.transmission}
                      </span>
                    </div>

                    <div>
                      <span className="text-[10px] text-slate-400 font-semibold uppercase block">Nhiên liệu</span>
                      <span className="text-xs font-extrabold text-slate-800 flex items-center justify-center gap-1 mt-0.5">
                        <Fuel className="w-3 h-3 text-slate-500" />
                        {vehicle.fuelType}
                      </span>
                    </div>
                  </div>

                  {/* Feature Highlights */}
                  <ul className="space-y-1 pt-1">
                    {vehicle.features.slice(0, 3).map((feat, i) => (
                      <li key={i} className="flex items-center gap-1.5 text-xs text-slate-600">
                        <span className="text-emerald-500 font-bold text-xs">✓</span>
                        <span className="truncate">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Price & Action */}
              <div className="p-5 pt-3 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 font-semibold uppercase">Giá thuê</span>
                  <div className="text-lg font-extrabold text-slate-900">
                    {formatVND(vehicle.pricePerDay)}
                  </div>
                  <span className="text-[10px] text-slate-500">
                    {vehicle.type === 'limousine' ? '/ vé / lượt' : '/ ngày (24h)'}
                  </span>
                </div>

                <button
                  onClick={() => setActiveVehicle(vehicle)}
                  id={`btn-rent-vehicle-${vehicle.id}`}
                  className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold shadow-md transition-all transform hover:-translate-y-0.5 flex items-center gap-1.5"
                >
                  <span>Đặt Xe Nhanh</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Vehicle Rental Modal */}
      {activeVehicle && (
        <div 
          id="vehicle-checkout-modal"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm overflow-y-auto"
        >
          <div className="bg-white rounded-3xl max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 relative animate-in fade-in zoom-in duration-200">
            
            {/* Modal Header */}
            <div className="p-5 sm:p-6 bg-slate-900 text-white rounded-t-3xl flex items-center justify-between">
              <div>
                <span className="text-xs text-amber-400 font-bold uppercase tracking-wider">Đặt Thuê Phương Tiện</span>
                <h3 className="text-xl font-extrabold text-white mt-0.5">{activeVehicle.name}</h3>
              </div>
              <button
                onClick={() => setActiveVehicle(null)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleConfirmVehicle} className="p-6 space-y-4 text-slate-800">
              
              <div className="p-3.5 bg-amber-50/80 rounded-2xl border border-amber-200 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-amber-950">Đơn vị cung cấp: {activeVehicle.provider}</p>
                  <p className="text-xs text-amber-800">Bảo hiểm vật chất 2 chiều & Cứu hộ giao thông 24/7 đi kèm</p>
                </div>
                <div className="text-right">
                  <div className="text-base font-extrabold text-slate-900">{formatVND(activeVehicle.pricePerDay)}</div>
                  <span className="text-[10px] text-slate-500">/ ngày</span>
                </div>
              </div>

              {/* Form inputs */}
              <div className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-slate-600">Họ và tên người thuê/đặt *</label>
                    <input
                      type="text"
                      required
                      placeholder="Nguyễn Văn A"
                      value={driverName}
                      onChange={(e) => setDriverName(e.target.value)}
                      className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none mt-1"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-600">Số điện thoại *</label>
                    <input
                      type="tel"
                      required
                      placeholder="0912 345 678"
                      value={driverPhone}
                      onChange={(e) => setDriverPhone(e.target.value)}
                      className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none mt-1"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-600">Địa chỉ giao nhận xe tận nơi *</label>
                  <input
                    type="text"
                    required
                    placeholder="Sân bay Nội Bài / Khách sạn Metropole Hà Nội"
                    value={pickupAddress}
                    onChange={(e) => setPickupAddress(e.target.value)}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none mt-1"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-slate-600 flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-emerald-600" />
                      <span>Ngày nhận xe</span>
                    </label>
                    <input
                      type="date"
                      value={pickupDate}
                      onChange={(e) => setPickupDate(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-emerald-500 mt-1"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-600">Số ngày thuê</label>
                    <select
                      value={rentalDays}
                      onChange={(e) => setRentalDays(Number(e.target.value))}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-emerald-500 mt-1"
                    >
                      <option value={1}>1 ngày (24 giờ)</option>
                      <option value={2}>2 ngày (48 giờ)</option>
                      <option value={3}>3 ngày (72 giờ)</option>
                      <option value={5}>5 ngày (Trọn gói tour)</option>
                      <option value={7}>7 ngày (1 tuần)</option>
                    </select>
                  </div>
                </div>

                {activeVehicle.type === 'self_drive' && (
                  <label className="flex items-center gap-2 p-3 bg-slate-50 rounded-xl border border-slate-200 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={withDriver}
                      onChange={(e) => setWithDriver(e.target.checked)}
                      className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500"
                    />
                    <span className="text-xs font-semibold text-slate-700">
                      Cần kèm theo tài xế chuyên nghiệp (+500.000 VNĐ / ngày)
                    </span>
                  </label>
                )}
              </div>

              {/* Submit */}
              <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <p className="text-xs text-slate-500">Tổng tiền ({rentalDays} ngày):</p>
                  <p className="text-2xl font-extrabold text-slate-900">
                    {formatVND(activeVehicle.pricePerDay * rentalDays + (withDriver ? 500000 * rentalDays : 0))}
                  </p>
                </div>

                <button
                  type="submit"
                  id="btn-confirm-vehicle-booking"
                  className="w-full sm:w-auto px-8 py-3 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-800 hover:bg-black text-white font-extrabold text-sm shadow-xl flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5"
                >
                  <CreditCard className="w-4 h-4 text-amber-400" />
                  <span>Xác Nhận Đặt Thuê Xe</span>
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

      {/* Vehicle Success Modal */}
      {bookingSuccessVehicle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 text-center space-y-4 shadow-2xl border border-slate-200">
            <div className="w-16 h-16 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
              <Car className="w-8 h-8" />
            </div>

            <h3 className="text-xl font-extrabold text-slate-900">Xác Nhận Thuê Xe Thành Công!</h3>
            <p className="text-xs text-slate-600">
              Mã hợp đồng điện tử: <span className="font-mono font-bold text-amber-600">{bookingSuccessVehicle.id}</span>
            </p>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-left text-xs space-y-1.5">
              <p><span className="font-bold text-slate-700">Phương tiện:</span> {bookingSuccessVehicle.details.vehicleName}</p>
              <p><span className="font-bold text-slate-700">Thời gian nhận:</span> Ngày {bookingSuccessVehicle.details.pickupDate}</p>
              <p><span className="font-bold text-slate-700">Điểm giao xe:</span> {bookingSuccessVehicle.details.pickupLocation}</p>
              <p><span className="font-bold text-slate-700">Khách thuê:</span> {bookingSuccessVehicle.customerName} ({bookingSuccessVehicle.customerPhone})</p>
              <p><span className="font-bold text-slate-700">Tổng chi phí:</span> <span className="text-slate-900 font-extrabold">{formatVND(bookingSuccessVehicle.totalPrice)}</span></p>
            </div>

            <div className="pt-2">
              <button
                onClick={() => setBookingSuccessVehicle(null)}
                className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow transition-colors"
              >
                Đóng & Xem Lại Trong Đơn Đặt Của Tôi
              </button>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};
