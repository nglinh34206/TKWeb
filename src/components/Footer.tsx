import React from 'react';
import { 
  Compass, 
  MapPin, 
  PhoneCall, 
  Mail, 
  ShieldCheck, 
  CreditCard, 
  Heart,
  Globe
} from 'lucide-react';

interface FooterProps {
  onNavigateToTab: (tabId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateToTab }) => {
  return (
    <footer className="bg-[#1A1A1A] text-stone-300 text-xs border-t border-[#1A1A1A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 border border-[#C5A059] flex items-center justify-center bg-[#1A1A1A]">
                <span className="font-serif text-lg font-bold text-[#C5A059] tracking-tighter">VN</span>
              </div>
              <div>
                <div className="flex items-center gap-1.5 font-serif font-bold text-lg text-white tracking-wider">
                  <span>VIỆT NAM</span>
                  <span className="text-[#C5A059] italic font-normal">HERITAGE</span>
                </div>
                <p className="text-[9px] tracking-[0.25em] uppercase font-sans font-bold text-[#C5A059]">
                  Concierge & Booking Portal
                </p>
              </div>
            </div>

            <p className="text-stone-400 text-xs font-sans leading-relaxed max-w-sm">
              Cổng thông tin du lịch và đặt vé máy bay, phòng nghỉ dưỡng, xe đưa đón và chỉ đường thông minh toàn diện tại Việt Nam. Tự hào giới thiệu cảnh sắc thiên nhiên và di sản văn hóa Việt Nam ra thế giới.
            </p>

            <div className="flex items-center gap-3 text-stone-400 font-sans text-xs pt-2">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-4 h-4 text-[#C5A059]" />
                <span>Bảo mật 100%</span>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Globe className="w-4 h-4 text-[#C5A059]" />
                <span>Tiêu chuẩn quốc tế</span>
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-white font-serif font-bold text-sm tracking-wider uppercase">Dịch Vụ</h4>
            <ul className="space-y-2.5 font-sans">
              <li>
                <button onClick={() => onNavigateToTab('destinations')} className="hover:text-[#C5A059] transition-colors">
                  Khám phá 12 danh thắng
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateToTab('hotels')} className="hover:text-[#C5A059] transition-colors">
                  Khách sạn & Resort 5 sao
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateToTab('flights')} className="hover:text-[#C5A059] transition-colors">
                  Vé máy bay nội địa
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateToTab('vehicles')} className="hover:text-[#C5A059] transition-colors">
                  Thuê xe tự lái & Limousine
                </button>
              </li>
            </ul>
          </div>

          {/* Map & Tools */}
          <div className="space-y-4">
            <h4 className="text-white font-serif font-bold text-sm tracking-wider uppercase">Công Cụ Du Lịch</h4>
            <ul className="space-y-2.5 font-sans">
              <li>
                <button onClick={() => onNavigateToTab('map')} className="hover:text-[#C5A059] transition-colors">
                  Bản đồ tương tác 3 miền
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateToTab('map')} className="hover:text-[#C5A059] transition-colors">
                  Chỉ đường & Đo khoảng cách
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateToTab('ai-planner')} className="hover:text-[#C5A059] transition-colors text-[#C5A059] font-semibold">
                  Trợ lý AI Lập Lịch Trình
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateToTab('ai-planner')} className="hover:text-[#C5A059] transition-colors">
                  Hỏi đáp du lịch 24/7
                </button>
              </li>
            </ul>
          </div>

          {/* Contact & Hotline */}
          <div className="space-y-4">
            <h4 className="text-white font-serif font-bold text-sm tracking-wider uppercase">Hỗ Trợ Khách Hàng</h4>
            <div className="space-y-2.5 font-sans">
              <a href="tel:19006868" className="flex items-center gap-2 text-white font-serif font-bold text-sm hover:text-[#C5A059]">
                <PhoneCall className="w-4 h-4 text-[#C5A059]" />
                <span>1900 6868</span>
              </a>
              <p className="text-[11px] text-stone-400 flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>concierge@vietnamtravel.vn</span>
              </p>
              <p className="text-[11px] text-stone-400 flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>Tràng Tiền, Hoàn Kiếm, Hà Nội</span>
              </p>
            </div>

            <div className="pt-2">
              <span className="text-[9px] text-stone-500 font-sans font-bold uppercase tracking-wider block mb-1.5">Đối tác thanh toán:</span>
              <div className="flex flex-wrap gap-1.5 text-[9px] font-sans text-stone-300 font-bold uppercase tracking-wider">
                <span className="px-2 py-0.5 bg-black/40 border border-white/10">VNPAY</span>
                <span className="px-2 py-0.5 bg-black/40 border border-white/10">MoMo</span>
                <span className="px-2 py-0.5 bg-black/40 border border-white/10">Visa / Master</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-8 mt-12 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-stone-500 font-sans">
          <p>© 2026 Vietnam Travel Portal. Bản quyền thuộc về Nền Tảng Du Lịch & Di Sản Việt Nam.</p>
          <p className="flex items-center gap-1.5">
            <span>Tôn vinh danh thắng & văn hóa</span>
            <Heart className="w-3.5 h-3.5 fill-[#C5A059] text-[#C5A059]" />
            <span className="text-stone-300 font-serif font-bold">Việt Nam</span>
          </p>
        </div>

      </div>
    </footer>
  );
};
