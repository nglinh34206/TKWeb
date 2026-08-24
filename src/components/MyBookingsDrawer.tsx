import React, { useState } from 'react';
import { 
  X, 
  Ticket, 
  Hotel, 
  Plane, 
  Car, 
  QrCode, 
  Calendar, 
  CheckCircle, 
  Trash2, 
  Download, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { BookingRecord } from '../types';
import { formatVND } from '../utils/formatters';

interface MyBookingsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  bookings: BookingRecord[];
  onRemoveBooking: (id: string) => void;
  onNavigateToTab: (tabId: string) => void;
}

export const MyBookingsDrawer: React.FC<MyBookingsDrawerProps> = ({
  isOpen,
  onClose,
  bookings,
  onRemoveBooking,
  onNavigateToTab
}) => {
  const [selectedTypeFilter, setSelectedTypeFilter] = useState<'all' | 'hotel' | 'flight' | 'vehicle'>('all');
  const [activeTicketDetail, setActiveTicketDetail] = useState<BookingRecord | null>(null);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  if (!isOpen) return null;

  const filteredBookings = bookings.filter((b) => {
    if (selectedTypeFilter === 'all') return true;
    return b.type === selectedTypeFilter;
  });

  const getServiceBadge = (type: 'hotel' | 'flight' | 'vehicle') => {
    switch (type) {
      case 'hotel':
        return { label: 'Khách sạn / Resort', icon: Hotel, color: 'bg-[#F9F7F2] text-[#1A1A1A] border border-[#1A1A1A]/20' };
      case 'flight':
        return { label: 'Vé máy bay', icon: Plane, color: 'bg-[#F9F7F2] text-[#1A1A1A] border border-[#1A1A1A]/20' };
      case 'vehicle':
        return { label: 'Thuê xe du lịch', icon: Car, color: 'bg-[#F9F7F2] text-[#1A1A1A] border border-[#1A1A1A]/20' };
    }
  };

  const handleDownloadPdf = () => {
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/70 backdrop-blur-xs animate-in fade-in">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-6">
        <div className="w-screen max-w-md sm:max-w-lg bg-[#FDFCFB] shadow-2xl flex flex-col justify-between border-l border-[#1A1A1A]/20">
          
          {/* Header */}
          <div className="p-6 bg-[#1A1A1A] text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 border border-[#C5A059]/40 text-[#C5A059]">
                <Ticket className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[9px] font-sans uppercase tracking-[0.25em] font-bold text-[#C5A059] block">
                  Concierge Portfolio
                </span>
                <h3 className="font-serif text-xl font-bold tracking-tight">Đơn Đặt Của Tôi</h3>
                <p className="text-xs text-stone-400 font-sans mt-0.5">Quản lý vé & dịch vụ ({bookings.length})</p>
              </div>
            </div>
            <button
              onClick={onClose}
              id="btn-close-bookings-drawer"
              className="w-8 h-8 bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Type Filter Pills */}
          <div className="px-6 py-3 bg-[#F9F7F2] border-b border-[#1A1A1A]/10 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            {[
              { id: 'all', label: 'Tất cả' },
              { id: 'hotel', label: 'Khách sạn' },
              { id: 'flight', label: 'Vé bay' },
              { id: 'vehicle', label: 'Thuê xe' },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setSelectedTypeFilter(f.id as any)}
                className={`px-3 py-1.5 text-xs font-sans uppercase tracking-wider font-bold whitespace-nowrap border transition-all ${
                  selectedTypeFilter === f.id
                    ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]'
                    : 'bg-white border-[#1A1A1A]/15 text-[#1A1A1A]/70 hover:border-[#1A1A1A]/40'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Body Content */}
          <div className="flex-1 p-6 overflow-y-auto space-y-4">
            {filteredBookings.length === 0 ? (
              <div className="text-center py-20 space-y-4">
                <div className="w-16 h-16 border border-[#1A1A1A]/20 bg-[#F9F7F2] flex items-center justify-center text-[#C5A059] mx-auto">
                  <Ticket className="w-8 h-8" />
                </div>
                <h4 className="font-serif font-bold text-[#1A1A1A] text-lg">Chưa có đơn đặt nào</h4>
                <p className="text-xs text-[#1A1A1A]/60 max-w-xs mx-auto font-sans leading-relaxed">
                  Bạn chưa đặt phòng, vé máy bay hay thuê xe nào. Hãy khám phá các ưu đãi độc quyền ngay hôm nay!
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => {
                      onClose();
                      onNavigateToTab('destinations');
                    }}
                    className="px-6 py-2.5 bg-[#1A1A1A] hover:bg-[#333] text-white text-xs font-sans uppercase tracking-[0.15em] font-bold shadow-sm transition-all"
                  >
                    Khám Phá Dịch Vụ Ngay
                  </button>
                </div>
              </div>
            ) : (
              filteredBookings.map((b) => {
                const badge = getServiceBadge(b.type);
                const BadgeIcon = badge.icon;

                return (
                  <div
                    key={b.id}
                    id={`booking-item-${b.id}`}
                    className="p-5 bg-white border border-[#1A1A1A]/15 hover:border-[#1A1A1A] transition-all space-y-3"
                  >
                    {/* Header Item */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-0.5 text-[9px] font-sans uppercase tracking-wider font-bold flex items-center gap-1 ${badge.color}`}>
                          <BadgeIcon className="w-3 h-3" />
                          <span>{badge.label}</span>
                        </span>
                        <span className="font-mono text-xs font-bold text-[#1A1A1A]">#{b.id}</span>
                      </div>

                      <span className="flex items-center gap-1 text-[10px] font-sans uppercase tracking-wider font-bold text-[#C5A059] bg-[#F9F7F2] px-2 py-0.5 border border-[#C5A059]/30">
                        <CheckCircle className="w-3 h-3" />
                        <span>Đã xác nhận</span>
                      </span>
                    </div>

                    {/* Specific Details */}
                    <div className="text-xs text-[#1A1A1A]/80 font-sans space-y-1 bg-[#F9F7F2] p-3.5 border border-[#1A1A1A]/10">
                      {b.type === 'hotel' && (
                        <>
                          <p className="font-serif font-bold text-sm text-[#1A1A1A]">{b.details.hotelName}</p>
                          <p className="text-[#1A1A1A]/70">{b.details.roomName} • {b.details.nights} đêm</p>
                          <p className="text-[#1A1A1A]/60 text-[11px]">Nhận: {b.details.checkIn} — Trả: {b.details.checkOut}</p>
                        </>
                      )}

                      {b.type === 'flight' && (
                        <>
                          <p className="font-serif font-bold text-sm text-[#1A1A1A]">{b.details.airline} • {b.details.flightNumber}</p>
                          <p className="text-[#1A1A1A]/70">{b.details.route}</p>
                          <p className="text-[#1A1A1A]/60 text-[11px]">Giờ bay: {b.details.departureTime} • Ghế: {b.details.seatNumber} ({b.details.passengerClass})</p>
                        </>
                      )}

                      {b.type === 'vehicle' && (
                        <>
                          <p className="font-serif font-bold text-sm text-[#1A1A1A]">{b.details.vehicleName}</p>
                          <p className="text-[#1A1A1A]/70">Nhận xe: {b.details.pickupDate} tại {b.details.pickupLocation}</p>
                        </>
                      )}

                      <p className="text-[#1A1A1A]/60 text-[11px] pt-1.5 border-t border-[#1A1A1A]/10">
                        Khách: <span className="font-semibold text-[#1A1A1A]">{b.customerName}</span> ({b.customerPhone})
                      </p>
                    </div>

                    {/* Price & Actions */}
                    <div className="flex items-center justify-between pt-1">
                      <div>
                        <span className="text-[9px] text-[#1A1A1A]/50 font-sans font-bold uppercase tracking-wider block">Tổng tiền</span>
                        <span className="font-serif font-bold text-base text-[#1A1A1A]">{formatVND(b.totalPrice)}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setActiveTicketDetail(b)}
                          className="px-3 py-1.5 bg-[#F9F7F2] hover:bg-[#EBE7DE] border border-[#1A1A1A]/15 text-[#1A1A1A] text-xs font-sans uppercase tracking-wider font-bold flex items-center gap-1.5 transition-colors"
                        >
                          <QrCode className="w-3.5 h-3.5 text-[#C5A059]" />
                          <span>Mã E-Ticket</span>
                        </button>

                        <button
                          onClick={() => onRemoveBooking(b.id)}
                          className="p-1.5 text-[#1A1A1A]/40 hover:text-rose-600 transition-colors"
                          title="Hủy đơn"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                  </div>
                );
              })
            )}
          </div>

          {/* Footer Total */}
          {bookings.length > 0 && (
            <div className="p-6 bg-[#F9F7F2] border-t border-[#1A1A1A]/10 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-[#1A1A1A]/60 font-sans uppercase tracking-wider font-bold block">Tổng giá trị đơn:</span>
                <div className="text-lg font-serif font-bold text-[#1A1A1A]">
                  {formatVND(bookings.reduce((sum, b) => sum + b.totalPrice, 0))}
                </div>
              </div>
              <button
                onClick={onClose}
                className="px-6 py-2.5 bg-[#1A1A1A] hover:bg-[#333] text-white text-xs font-sans uppercase tracking-wider font-bold transition-colors"
              >
                Đóng
              </button>
            </div>
          )}

        </div>
      </div>

      {/* Ticket E-Pass QR Code Modal */}
      {activeTicketDetail && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-in fade-in">
          <div className="bg-[#FDFCFB] border border-[#1A1A1A]/20 max-w-sm w-full p-6 text-center space-y-4 shadow-2xl relative">
            <div className="border-b border-[#1A1A1A]/10 pb-3">
              <span className="text-[9px] font-sans uppercase tracking-[0.2em] font-bold text-[#C5A059] bg-[#F9F7F2] px-2.5 py-1 border border-[#C5A059]/30 inline-block">
                Thẻ Vé Điện Tử Chính Thức
              </span>
              <h4 className="font-serif font-bold text-lg text-[#1A1A1A] mt-2">Mã Đặt: {activeTicketDetail.id}</h4>
            </div>

            {/* QR Mock code */}
            <div className="p-4 bg-[#F9F7F2] border border-[#1A1A1A]/10 flex flex-col items-center justify-center space-y-2">
              <div className="w-40 h-40 bg-white p-2 border border-[#1A1A1A]/15 shadow-inner flex items-center justify-center">
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(activeTicketDetail.id + '-' + activeTicketDetail.customerName)}`}
                  alt="QR Code Ticket"
                  className="w-full h-full"
                />
              </div>
              <p className="text-[10px] font-sans text-[#1A1A1A]/60">Xuất trình mã QR tại quầy tiếp tân / cửa lên máy bay</p>
            </div>

            <div className="text-left text-xs font-sans text-[#1A1A1A]/80 space-y-1 bg-white p-3 border border-[#1A1A1A]/10">
              <p><span className="font-bold text-[#1A1A1A]">Khách hàng:</span> {activeTicketDetail.customerName}</p>
              <p><span className="font-bold text-[#1A1A1A]">Dịch vụ:</span> {activeTicketDetail.details.hotelName || activeTicketDetail.details.airline || activeTicketDetail.details.vehicleName}</p>
              <p><span className="font-bold text-[#1A1A1A]">Tổng thanh toán:</span> <span className="font-serif font-bold text-sm text-[#1A1A1A]">{formatVND(activeTicketDetail.totalPrice)}</span></p>
            </div>

            {downloadSuccess && (
              <div className="p-2 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-sans font-bold">
                ✓ Đã lưu bản PDF thẻ E-Ticket vào thiết bị của bạn!
              </div>
            )}

            <div className="pt-2 flex gap-2">
              <button
                onClick={handleDownloadPdf}
                className="flex-1 py-2.5 bg-[#1A1A1A] hover:bg-[#333] text-white text-xs font-sans uppercase tracking-wider font-bold flex items-center justify-center gap-1.5 shadow-sm"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Tải PDF</span>
              </button>
              <button
                onClick={() => setActiveTicketDetail(null)}
                className="px-5 py-2.5 border border-[#1A1A1A]/20 text-[#1A1A1A] text-xs font-sans uppercase tracking-wider font-bold hover:bg-[#F9F7F2]"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
