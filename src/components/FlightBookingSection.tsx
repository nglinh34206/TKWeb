import React, { useState } from 'react';
import { 
  Plane, 
  Clock, 
  Luggage, 
  ArrowRight, 
  Check, 
  X, 
  CreditCard, 
  ShieldCheck, 
  Armchair,
  Filter,
  Sparkles
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { FLIGHTS, AIRPORTS } from '../data/flights';
import { Flight, BookingRecord } from '../types';
import { formatVND } from '../utils/formatters';

interface FlightBookingSectionProps {
  onAddBooking: (booking: BookingRecord) => void;
  defaultFrom?: string;
  defaultTo?: string;
}

export const FlightBookingSection: React.FC<FlightBookingSectionProps> = ({
  onAddBooking,
  defaultFrom = 'HAN',
  defaultTo = 'SGN'
}) => {
  const [fromCode, setFromCode] = useState(defaultFrom);
  const [toCode, setToCode] = useState(defaultTo);
  const [selectedAirline, setSelectedAirline] = useState<string>('all');
  const [flightClass, setFlightClass] = useState<'economy' | 'business'>('economy');
  
  // Active selected flight for checkout
  const [selectedFlight, setSelectedFlight] = useState<Flight | null>(null);
  const [selectedSeat, setSelectedSeat] = useState<string>('15A');
  const [passengerName, setPassengerName] = useState('');
  const [passengerPhone, setPassengerPhone] = useState('');
  const [passengerEmail, setPassengerEmail] = useState('');
  const [idNumber, setIdNumber] = useState('');
  const [bookingSuccessFlight, setBookingSuccessFlight] = useState<BookingRecord | null>(null);

  // Filter flights
  const filteredFlights = FLIGHTS.filter((f) => {
    const matchesFrom = fromCode === 'all' || f.fromCode === fromCode;
    const matchesTo = toCode === 'all' || f.toCode === toCode;
    const matchesAirline = selectedAirline === 'all' || f.airline === selectedAirline;
    return matchesFrom && matchesTo && matchesAirline;
  });

  const handleStartFlightBooking = (flight: Flight) => {
    setSelectedFlight(flight);
    setSelectedSeat(flightClass === 'business' ? '2A' : '15A');
  };

  const handleConfirmFlight = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFlight) return;

    const price = flightClass === 'business' ? selectedFlight.priceBusiness : selectedFlight.priceEconomy;

    const newBooking: BookingRecord = {
      id: `FL-${Date.now().toString().slice(-6)}`,
      type: 'flight',
      createdAt: new Date().toLocaleDateString('vi-VN'),
      customerName: passengerName || 'Nguyễn Văn A',
      customerPhone: passengerPhone || '0912 345 678',
      customerEmail: passengerEmail || 'passenger@vietnamtravel.vn',
      totalPrice: price,
      status: 'confirmed',
      paymentMethod: 'VNPAY-ONLINE',
      details: {
        flightNumber: selectedFlight.flightNumber,
        airline: selectedFlight.airline,
        route: `${selectedFlight.fromCity} (${selectedFlight.fromCode}) → ${selectedFlight.toCity} (${selectedFlight.toCode})`,
        flightDate: '2026-08-25',
        departureTime: selectedFlight.departureTime,
        seatNumber: selectedSeat,
        passengerClass: flightClass === 'business' ? 'Hạng Thương Gia (Business)' : 'Hạng Phổ Thông (Economy)'
      }
    };

    onAddBooking(newBooking);
    setSelectedFlight(null);
    setBookingSuccessFlight(newBooking);

    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  // Mock seat layout for airplane
  const economySeats = ['12A', '12B', '12C', '12D', '12E', '12F', '14A', '14B', '14C', '14D', '14E', '14F', '15A', '15B', '15C', '15D', '15E', '15F', '16A', '16B', '16C', '16D', '16E', '16F'];
  const businessSeats = ['1A', '1C', '1D', '1F', '2A', '2C', '2D', '2F', '3A', '3C', '3D', '3F'];

  return (
    <section id="flights" className="py-16 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold uppercase tracking-wider mb-2">
              <Plane className="w-3.5 h-3.5" />
              <span>Vé Máy Bay Nội Địa Trực Tuyến</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
              Săn Vé Máy Bay Giá Tốt Nhất
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-1">
              Kết nối hơn 20 sân bay khắp Việt Nam cùng Vietnam Airlines, Vietjet Air, Bamboo Airways & Vietravel Airlines.
            </p>
          </div>
        </div>

        {/* Flight Route Filter Bar */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-sm mb-8 space-y-4">
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            
            {/* Origin Airport */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500 uppercase">Điểm khởi hành</label>
              <select
                id="flight-from-select"
                value={fromCode}
                onChange={(e) => setFromCode(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-800 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                <option value="all">Tất cả sân bay xuất phát</option>
                {AIRPORTS.map((a) => (
                  <option key={a.code} value={a.code}>
                    {a.city} ({a.code}) - {a.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Destination Airport */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500 uppercase">Điểm đến</label>
              <select
                id="flight-to-select"
                value={toCode}
                onChange={(e) => setToCode(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-800 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                <option value="all">Tất cả sân bay đến</option>
                {AIRPORTS.map((a) => (
                  <option key={a.code} value={a.code}>
                    {a.city} ({a.code}) - {a.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Airline filter */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500 uppercase">Hãng hàng không</label>
              <select
                value={selectedAirline}
                onChange={(e) => setSelectedAirline(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-800 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                <option value="all">Tất cả các hãng</option>
                <option value="Vietnam Airlines">Vietnam Airlines (4 sao SkyTeam)</option>
                <option value="Vietjet Air">Vietjet Air</option>
                <option value="Bamboo Airways">Bamboo Airways</option>
                <option value="Vietravel Airlines">Vietravel Airlines</option>
              </select>
            </div>

            {/* Flight Class Switcher */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500 uppercase">Hạng ghế</label>
              <div className="grid grid-cols-2 gap-1.5 p-1 bg-slate-100 rounded-xl">
                <button
                  type="button"
                  onClick={() => setFlightClass('economy')}
                  className={`py-1.5 rounded-lg text-xs font-bold transition-all ${
                    flightClass === 'economy' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600'
                  }`}
                >
                  Phổ Thông
                </button>
                <button
                  type="button"
                  onClick={() => setFlightClass('business')}
                  className={`py-1.5 rounded-lg text-xs font-bold transition-all ${
                    flightClass === 'business' ? 'bg-amber-500 text-white shadow-sm' : 'text-slate-600'
                  }`}
                >
                  Thương Gia
                </button>
              </div>
            </div>

          </div>

        </div>

        {/* Flights List */}
        {filteredFlights.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 p-6">
            <p className="text-slate-500 text-sm font-medium">
              Không có chuyến bay thẳng phù hợp cho chặng bay này trong bộ dữ liệu demo.
            </p>
            <button
              onClick={() => {
                setFromCode('all');
                setToCode('all');
                setSelectedAirline('all');
              }}
              className="mt-2 text-blue-600 font-bold text-xs hover:underline"
            >
              Hiển thị tất cả các chuyến bay nội địa
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredFlights.map((flight) => {
              const currentPrice = flightClass === 'business' ? flight.priceBusiness : flight.priceEconomy;

              return (
                <div
                  key={flight.id}
                  id={`flight-card-${flight.id}`}
                  className="bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-6 shadow-sm hover:shadow-md transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-4"
                >
                  {/* Airline & Aircraft Info */}
                  <div className="flex items-center gap-3.5 lg:w-1/4">
                    <div 
                      className="w-11 h-11 rounded-xl flex items-center justify-center text-white font-extrabold text-sm shadow-sm"
                      style={{ backgroundColor: flight.airlineLogoColor }}
                    >
                      {flight.airline.slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <h4 className="font-extrabold text-sm text-slate-900">{flight.airline}</h4>
                      <p className="text-xs text-slate-500 font-semibold">{flight.flightNumber} • {flight.aircraft}</p>
                    </div>
                  </div>

                  {/* Flight Timing & Itinerary */}
                  <div className="flex items-center justify-between sm:justify-center gap-4 sm:gap-8 flex-1">
                    
                    {/* Departure */}
                    <div className="text-left sm:text-right">
                      <div className="text-lg sm:text-xl font-extrabold text-slate-900">{flight.departureTime}</div>
                      <div className="text-xs font-bold text-slate-700">{flight.fromCode}</div>
                      <div className="text-[11px] text-slate-400 max-w-[110px] truncate">{flight.fromCity}</div>
                    </div>

                    {/* Duration connector */}
                    <div className="flex flex-col items-center px-2">
                      <span className="text-[11px] font-semibold text-slate-400 flex items-center gap-1">
                        <Clock className="w-3 h-3 text-slate-400" />
                        {flight.duration}
                      </span>
                      <div className="relative w-24 sm:w-32 my-1 flex items-center">
                        <div className="h-[2px] bg-slate-200 w-full" />
                        <Plane className="w-4 h-4 text-blue-600 absolute right-1/2 translate-x-1/2 rotate-90" />
                      </div>
                      <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-2 py-0.2 rounded-full">
                        Bay Thẳng
                      </span>
                    </div>

                    {/* Arrival */}
                    <div className="text-right sm:text-left">
                      <div className="text-lg sm:text-xl font-extrabold text-slate-900">{flight.arrivalTime}</div>
                      <div className="text-xs font-bold text-slate-700">{flight.toCode}</div>
                      <div className="text-[11px] text-slate-400 max-w-[110px] truncate">{flight.toCity}</div>
                    </div>

                  </div>

                  {/* Baggage & Pricing */}
                  <div className="flex items-center justify-between lg:justify-end gap-6 pt-3 lg:pt-0 border-t lg:border-t-0 border-slate-100 lg:w-1/3">
                    <div className="text-left lg:text-right">
                      <div className="flex items-center lg:justify-end gap-1 text-[11px] text-slate-500 font-medium mb-0.5">
                        <Luggage className="w-3.5 h-3.5 text-slate-400" />
                        <span>{flight.baggageIncluded}</span>
                      </div>
                      <div className="text-xl font-extrabold text-blue-700">
                        {formatVND(currentPrice)}
                      </div>
                      <span className="text-[10px] text-slate-400">/ khách / 1 chiều</span>
                    </div>

                    <button
                      onClick={() => handleStartFlightBooking(flight)}
                      id={`btn-book-flight-${flight.id}`}
                      className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs font-extrabold shadow-md shadow-blue-600/20 flex items-center gap-1.5 transition-all transform hover:-translate-y-0.5"
                    >
                      <span>Chọn Chuyến</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                </div>
              );
            })}
          </div>
        )}

      </div>

      {/* Flight Checkout & Seat Selector Modal */}
      {selectedFlight && (
        <div 
          id="flight-checkout-modal"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm overflow-y-auto"
        >
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 relative animate-in fade-in zoom-in duration-200">
            
            {/* Modal Header */}
            <div className="p-5 sm:p-6 bg-slate-900 text-white rounded-t-3xl flex items-center justify-between">
              <div>
                <span className="text-xs text-blue-400 font-bold uppercase tracking-wider">Đặt Vé Máy Bay & Chọn Ghế</span>
                <h3 className="text-xl font-extrabold text-white mt-0.5">
                  {selectedFlight.airline} • {selectedFlight.flightNumber}
                </h3>
                <p className="text-xs text-slate-300">
                  {selectedFlight.fromCity} ({selectedFlight.fromCode}) → {selectedFlight.toCity} ({selectedFlight.toCode})
                </p>
              </div>
              <button
                onClick={() => setSelectedFlight(null)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleConfirmFlight} className="p-6 space-y-5 text-slate-800">
              
              {/* Flight Summary Box */}
              <div className="p-4 bg-blue-50/70 rounded-2xl border border-blue-200 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-blue-950 uppercase">
                    Khởi hành lúc {selectedFlight.departureTime} • Ngày 25/08/2026
                  </div>
                  <p className="text-xs text-blue-800 mt-0.5">
                    Hạng: <span className="font-bold">{flightClass === 'business' ? 'Thương Gia' : 'Phổ Thông'}</span> • Ghế đã chọn: <span className="font-extrabold text-blue-700 bg-blue-100 px-2 py-0.5 rounded">{selectedSeat}</span>
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-lg font-extrabold text-blue-700">
                    {formatVND(flightClass === 'business' ? selectedFlight.priceBusiness : selectedFlight.priceEconomy)}
                  </div>
                  <span className="text-[10px] text-slate-500">Đã gồm thuế & phí</span>
                </div>
              </div>

              {/* Interactive Airplane Seat Selector */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-500 uppercase flex items-center gap-1.5">
                    <Armchair className="w-3.5 h-3.5 text-blue-600" />
                    <span>Chọn Ghế Ngồi Trên Máy Bay</span>
                  </label>
                  <span className="text-[11px] text-slate-400">Chọn vị trí ngồi yêu thích (Miễn phí)</span>
                </div>

                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 overflow-x-auto">
                  <p className="text-[10px] text-center text-slate-400 font-bold uppercase tracking-wider mb-2">
                    ✈️ Buồng lái phi hành đoàn (Đầu máy bay)
                  </p>
                  
                  <div className="flex flex-wrap justify-center gap-2 max-w-md mx-auto">
                    {(flightClass === 'business' ? businessSeats : economySeats).map((seat) => (
                      <button
                        type="button"
                        key={seat}
                        onClick={() => setSelectedSeat(seat)}
                        className={`w-10 h-10 rounded-xl text-xs font-extrabold flex items-center justify-center transition-all ${
                          selectedSeat === seat
                            ? 'bg-blue-600 text-white shadow-md scale-105'
                            : 'bg-white border border-slate-200 text-slate-700 hover:border-blue-400'
                        }`}
                      >
                        {seat}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Passenger Info Inputs */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Thông tin hành khách (theo CCCD/Hộ chiếu)</h4>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-slate-600">Họ và tên (In hoa không dấu) *</label>
                    <input
                      type="text"
                      required
                      placeholder="NGUYEN VAN A"
                      value={passengerName}
                      onChange={(e) => setPassengerName(e.target.value.toUpperCase())}
                      className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold focus:ring-2 focus:ring-blue-500 focus:outline-none mt-1"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-600">Số CCCD / Hộ chiếu *</label>
                    <input
                      type="text"
                      required
                      placeholder="012345678901"
                      value={idNumber}
                      onChange={(e) => setIdNumber(e.target.value)}
                      className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none mt-1"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-slate-600">Số điện thoại nhận tin SMS bay *</label>
                    <input
                      type="tel"
                      required
                      placeholder="0912 345 678"
                      value={passengerPhone}
                      onChange={(e) => setPassengerPhone(e.target.value)}
                      className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none mt-1"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-600">Email nhận thẻ lên máy bay E-Ticket *</label>
                    <input
                      type="email"
                      required
                      placeholder="passenger@gmail.com"
                      value={passengerEmail}
                      onChange={(e) => setPassengerEmail(e.target.value)}
                      className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none mt-1"
                    />
                  </div>
                </div>

              </div>

              {/* Submit Button */}
              <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <p className="text-xs text-slate-500">Tổng thanh toán vé:</p>
                  <p className="text-2xl font-extrabold text-blue-700">
                    {formatVND(flightClass === 'business' ? selectedFlight.priceBusiness : selectedFlight.priceEconomy)}
                  </p>
                </div>

                <button
                  type="submit"
                  id="btn-confirm-flight-booking"
                  className="w-full sm:w-auto px-8 py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-extrabold text-sm shadow-xl shadow-blue-600/30 flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5"
                >
                  <CreditCard className="w-4 h-4" />
                  <span>Thanh Toán & Xuất Thẻ Bay E-Ticket</span>
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

      {/* Flight Success Modal */}
      {bookingSuccessFlight && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 text-center space-y-4 shadow-2xl border border-slate-200">
            <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
              <Plane className="w-8 h-8 rotate-45" />
            </div>

            <h3 className="text-xl font-extrabold text-slate-900">Xuất Vé Máy Bay Thành Công!</h3>
            <p className="text-xs text-slate-600">
              Mã vé điện tử (PNR): <span className="font-mono font-bold text-blue-600">{bookingSuccessFlight.id}</span>
            </p>

            <div className="p-4 bg-blue-50/70 rounded-2xl border border-blue-200 text-left text-xs space-y-1.5">
              <p><span className="font-bold text-slate-700">Hãng & Chuyến:</span> {bookingSuccessFlight.details.airline} ({bookingSuccessFlight.details.flightNumber})</p>
              <p><span className="font-bold text-slate-700">Hành trình:</span> {bookingSuccessFlight.details.route}</p>
              <p><span className="font-bold text-slate-700">Giờ bay:</span> {bookingSuccessFlight.details.departureTime} • Ngày {bookingSuccessFlight.details.flightDate}</p>
              <p><span className="font-bold text-slate-700">Hành khách:</span> {bookingSuccessFlight.customerName}</p>
              <p><span className="font-bold text-slate-700">Ghế & Hạng vé:</span> <span className="font-bold text-blue-700">{bookingSuccessFlight.details.seatNumber} ({bookingSuccessFlight.details.passengerClass})</span></p>
            </div>

            <div className="pt-2">
              <button
                onClick={() => setBookingSuccessFlight(null)}
                className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow transition-colors"
              >
                Đóng & Xem Thẻ Lên Máy Bay
              </button>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};
