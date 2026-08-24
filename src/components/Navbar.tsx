import React, { useState, useEffect } from 'react';
import { 
  Compass, 
  Hotel, 
  Plane, 
  Car, 
  MapPin, 
  Sparkles, 
  Ticket, 
  PhoneCall, 
  Menu, 
  X,
  Heart
} from 'lucide-react';
import { BookingRecord } from '../types';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  bookings: BookingRecord[];
  onOpenBookings: () => void;
  savedCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  bookings,
  onOpenBookings,
  savedCount
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'destinations', label: 'Khám Phá', icon: Compass },
    { id: 'hotels', label: 'Khách Sạn', icon: Hotel },
    { id: 'flights', label: 'Vé Máy Bay', icon: Plane },
    { id: 'vehicles', label: 'Thuê Xe', icon: Car },
    { id: 'map', label: 'Bản Đồ & Chỉ Đường', icon: MapPin },
    { id: 'ai-planner', label: 'Trợ Lý AI', icon: Sparkles, badge: 'AI Pro' },
  ];

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header 
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-[#FDFCFB]/95 backdrop-blur-md shadow-sm py-3.5 border-b border-[#1A1A1A]/10 text-[#1A1A1A]' 
          : 'bg-gradient-to-b from-[#1A1A1A]/90 to-transparent py-4 text-white'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Brand Logo - Editorial Style */}
        <button 
          id="nav-brand-logo"
          onClick={() => handleNavClick('destinations')}
          className="flex items-center gap-3 text-left group"
        >
          <div className={`w-9 h-9 border flex items-center justify-center font-serif text-sm font-bold tracking-tight transition-transform group-hover:scale-105 ${
            isScrolled ? 'border-[#1A1A1A] text-[#1A1A1A] bg-white' : 'border-white text-white bg-white/10'
          }`}>
            <span>VN</span>
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-black tracking-tighter font-serif leading-none">
              <span className={isScrolled ? 'text-[#1A1A1A]' : 'text-white'}>VIETNAM</span>{' '}
              <span className={`font-light italic font-serif ${isScrolled ? 'text-[#C5A059]' : 'text-[#E5E2D9]'}`}>VOYAGE</span>
            </div>
            <p className={`text-[9px] font-sans uppercase tracking-[0.25em] font-semibold mt-0.5 ${isScrolled ? 'text-[#1A1A1A]/60' : 'text-white/70'}`}>
              Grand Travel Portal
            </p>
          </div>
        </button>

        {/* Desktop Navigation Links - Editorial Style */}
        <nav className={`hidden lg:flex items-center gap-6 text-[11px] font-sans uppercase tracking-[0.2em] font-medium px-5 py-2 border transition-all ${
          isScrolled 
            ? 'border-[#1A1A1A]/10 bg-[#F9F7F2]/80 text-[#1A1A1A]' 
            : 'border-white/20 bg-black/20 text-white backdrop-blur-sm'
        }`}>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                id={`nav-link-${item.id}`}
                onClick={() => handleNavClick(item.id)}
                className={`relative flex items-center gap-1.5 py-1 transition-all ${
                  isActive
                    ? isScrolled 
                      ? 'text-[#1A1A1A] font-bold border-b-2 border-[#1A1A1A] -mb-0.5' 
                      : 'text-white font-bold border-b-2 border-white -mb-0.5'
                    : isScrolled
                      ? 'text-[#1A1A1A]/70 hover:text-[#1A1A1A] hover:opacity-75'
                      : 'text-white/80 hover:text-white hover:opacity-100'
                }`}
              >
                <Icon className="w-3 h-3 opacity-70" />
                <span>{item.label}</span>
                {item.badge && (
                  <span className="ml-0.5 px-1.5 py-0.2 text-[8px] font-bold uppercase tracking-wider bg-[#C5A059] text-white">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Right Actions: My Bookings & Hotline */}
        <div className="hidden sm:flex items-center gap-3">
          
          {/* Wishlist counter */}
          {savedCount > 0 && (
            <div className={`flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-sans uppercase tracking-wider border ${
              isScrolled 
                ? 'bg-[#F9F7F2] text-[#1A1A1A] border-[#1A1A1A]/10' 
                : 'bg-white/10 text-white border-white/20'
            }`}>
              <Heart className="w-3 h-3 fill-rose-500 text-rose-500" />
              <span>{savedCount} Lưu</span>
            </div>
          )}

          {/* Bookings Drawer Trigger */}
          <button
            id="nav-btn-my-bookings"
            onClick={onOpenBookings}
            className={`relative flex items-center gap-2 px-4 py-2 text-[11px] font-sans uppercase tracking-[0.2em] font-semibold transition-all border ${
              isScrolled
                ? 'bg-[#1A1A1A] text-white border-[#1A1A1A] hover:bg-[#333]'
                : 'bg-white text-[#1A1A1A] border-white hover:bg-white/90 shadow-sm'
            }`}
          >
            <Ticket className="w-3.5 h-3.5" />
            <span>Đơn Đặt</span>
            {bookings.length > 0 && (
              <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold ${
                isScrolled ? 'bg-[#C5A059] text-white' : 'bg-[#1A1A1A] text-white'
              }`}>
                {bookings.length}
              </span>
            )}
          </button>

          {/* Hotline Quick Call */}
          <a
            id="nav-btn-hotline"
            href="tel:19006868"
            className={`flex items-center gap-1.5 px-3 py-2 text-xs font-sans font-medium transition-colors border ${
              isScrolled
                ? 'border-[#1A1A1A]/20 text-[#1A1A1A] hover:border-[#1A1A1A]'
                : 'border-white/30 text-white hover:border-white'
            }`}
          >
            <PhoneCall className="w-3 h-3 text-[#C5A059]" />
            <span className="font-mono tracking-wider">1900 6868</span>
          </a>
        </div>

        {/* Mobile Menu Toggle Button */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            id="nav-btn-mobile-bookings"
            onClick={onOpenBookings}
            className="relative p-2 bg-[#1A1A1A] text-white border border-[#1A1A1A]/20"
            aria-label="Xem đơn đặt"
          >
            <Ticket className="w-4 h-4" />
            {bookings.length > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#C5A059] text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                {bookings.length}
              </span>
            )}
          </button>

          <button
            id="nav-btn-mobile-menu"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`p-2 border ${
              isScrolled ? 'text-[#1A1A1A] border-[#1A1A1A]/20 bg-[#F9F7F2]' : 'text-white border-white/20 bg-white/10'
            }`}
            aria-label="Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div 
          id="nav-mobile-dropdown"
          className="lg:hidden bg-[#FDFCFB] text-[#1A1A1A] px-4 pt-3 pb-6 border-b border-[#1A1A1A]/10 shadow-xl space-y-2 mt-2"
        >
          <div className="grid grid-cols-2 gap-2 pt-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-2 p-3 text-xs font-sans uppercase tracking-wider font-semibold border transition-all ${
                    isActive
                      ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]'
                      : 'bg-[#F9F7F2] text-[#1A1A1A] border-[#1A1A1A]/10 hover:border-[#1A1A1A]/30'
                  }`}
                >
                  <Icon className="w-4 h-4 opacity-75" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          <div className="pt-3 border-t border-[#1A1A1A]/10 flex items-center justify-between text-xs">
            <button 
              onClick={() => { onOpenBookings(); setMobileMenuOpen(false); }}
              className="flex items-center gap-2 text-[#1A1A1A] font-bold font-sans uppercase tracking-wider text-[11px]"
            >
              <Ticket className="w-4 h-4 text-[#C5A059]" />
              <span>Đơn Đặt Của Tôi ({bookings.length})</span>
            </button>
            <a href="tel:19006868" className="flex items-center gap-1 font-mono text-xs text-[#1A1A1A]/70">
              <PhoneCall className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>1900 6868</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
