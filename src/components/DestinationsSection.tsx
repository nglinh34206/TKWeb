import React, { useState } from 'react';
import { 
  Compass, 
  MapPin, 
  Star, 
  Heart, 
  Search, 
  Calendar, 
  DollarSign, 
  Utensils, 
  Sparkles, 
  X, 
  ArrowRight,
  Eye,
  Navigation
} from 'lucide-react';
import { DESTINATIONS } from '../data/destinations';
import { Destination, Region, Category } from '../types';

interface DestinationsSectionProps {
  onViewOnMap: (dest: Destination) => void;
  onBookServiceForDest: (dest: Destination) => void;
  savedDestIds: string[];
  onToggleSave: (destId: string) => void;
}

export const DestinationsSection: React.FC<DestinationsSectionProps> = ({
  onViewOnMap,
  onBookServiceForDest,
  savedDestIds,
  onToggleSave
}) => {
  const [selectedRegion, setSelectedRegion] = useState<Region>('all');
  const [selectedCategory, setSelectedCategory] = useState<Category>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeModalDest, setActiveModalDest] = useState<Destination | null>(null);

  // Filter destinations
  const filteredDestinations = DESTINATIONS.filter((dest) => {
    const matchesRegion = selectedRegion === 'all' || dest.region === selectedRegion;
    const matchesCategory = selectedCategory === 'all' || dest.category === selectedCategory;
    const matchesSearch = 
      dest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dest.province.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dest.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dest.highlights.some(h => h.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesRegion && matchesCategory && matchesSearch;
  });

  const getRegionBadge = (region: 'north' | 'central' | 'south') => {
    switch (region) {
      case 'north':
        return { label: 'Miền Bắc', color: 'bg-red-50 text-red-700 border-red-200' };
      case 'central':
        return { label: 'Miền Trung', color: 'bg-amber-50 text-amber-700 border-amber-200' };
      case 'south':
        return { label: 'Miền Nam', color: 'bg-emerald-50 text-emerald-700 border-emerald-200' };
    }
  };

  const getCategoryLabel = (category: Category) => {
    switch (category) {
      case 'heritage': return 'Di Sản Văn Hóa';
      case 'beach': return 'Biển Đảo Nghỉ Dưỡng';
      case 'mountain': return 'Núi Rừng & Mây';
      case 'city': return 'Đô Thị Hiện Đại';
      case 'nature': return 'Thiên Nhiên Kỳ Vĩ';
      case 'food': return 'Thiên Đường Ẩm Thực';
      default: return 'Khám Phá';
    }
  };

  return (
    <section id="destinations" className="py-20 bg-[#FDFCFB] relative border-t border-[#1A1A1A]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6 pb-6 border-b border-[#1A1A1A]/10">
          <div>
            <div className="inline-flex items-center gap-2 text-[10px] font-sans uppercase tracking-[0.3em] font-bold text-[#C5A059] mb-2">
              <Compass className="w-3.5 h-3.5" />
              <span>Vietnam Heritage & Wonder Collection</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#1A1A1A] tracking-tight leading-tight">
              Khám Phá Danh Thắng <br />
              <span className="font-light italic text-[#C5A059]">
                & Di Sản Kỳ Vĩ 3 Miền
              </span>
            </h2>
            <p className="text-[#1A1A1A]/70 text-sm sm:text-base mt-1 max-w-2xl font-sans font-light">
              Từ vịnh biển kỳ quan phía Bắc, phố cổ trầm mặc miền Trung đến đảo ngọc nhiệt đới phương Nam.
            </p>
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-[#1A1A1A]/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Tìm Hạ Long, Hội An, Sapa..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-12 py-3 bg-white border border-[#1A1A1A]/20 text-xs font-sans italic placeholder:text-[#1A1A1A]/40 focus:border-[#1A1A1A] focus:outline-none"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#1A1A1A]/40 hover:text-[#1A1A1A] text-[10px] font-sans uppercase tracking-wider font-bold"
              >
                Xóa
              </button>
            )}
          </div>
        </div>

        {/* Filter Controls */}
        <div className="space-y-4 mb-10">
          
          {/* Region Tabs (Bắc - Trung - Nam) */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
            <span className="text-[10px] font-sans font-bold text-[#1A1A1A]/50 uppercase tracking-widest mr-1">Vùng miền:</span>
            {[
              { id: 'all', label: 'Tất cả (12 Điểm đến)' },
              { id: 'north', label: 'Miền Bắc (Hà Nội, Hạ Long, Sapa, Ninh Bình)' },
              { id: 'central', label: 'Miền Trung (Đà Nẵng, Hội An, Huế, Nha Trang, Đà Lạt)' },
              { id: 'south', label: 'Miền Nam (Sài Gòn, Phú Quốc, Cần Thơ)' },
            ].map((tab) => (
              <button
                key={tab.id}
                id={`filter-region-${tab.id}`}
                onClick={() => setSelectedRegion(tab.id as Region)}
                className={`px-4 py-2 text-xs font-sans uppercase tracking-[0.15em] font-bold transition-all whitespace-nowrap border ${
                  selectedRegion === tab.id
                    ? 'bg-[#1A1A1A] text-white border-[#1A1A1A] shadow-sm'
                    : 'bg-[#F9F7F2] text-[#1A1A1A]/70 border-[#1A1A1A]/10 hover:border-[#1A1A1A]/30'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Category Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
            <span className="text-[10px] font-sans font-bold text-[#1A1A1A]/50 uppercase tracking-widest mr-1">Thể loại:</span>
            {[
              { id: 'all', label: 'Tất cả thể loại' },
              { id: 'heritage', label: 'Di sản văn hóa' },
              { id: 'beach', label: 'Biển đảo nhiệt đới' },
              { id: 'mountain', label: 'Vùng cao & Núi rừng' },
              { id: 'city', label: 'Đô thị sầm uất' },
              { id: 'nature', label: 'Sinh thái thiên nhiên' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id as Category)}
                className={`px-3 py-1.5 text-[11px] font-sans uppercase tracking-wider font-semibold border transition-all whitespace-nowrap ${
                  selectedCategory === cat.id
                    ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]'
                    : 'bg-white text-[#1A1A1A]/70 border-[#1A1A1A]/15 hover:border-[#1A1A1A]/40'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

        </div>

        {/* Destinations Grid */}
        {filteredDestinations.length === 0 ? (
          <div className="text-center py-16 bg-[#F9F7F2] border border-[#1A1A1A]/10 p-8">
            <p className="text-[#1A1A1A]/70 text-sm font-serif">Không tìm thấy địa điểm nào khớp với tiêu chí tìm kiếm.</p>
            <button
              onClick={() => {
                setSelectedRegion('all');
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className="mt-3 text-xs font-sans uppercase tracking-wider font-bold text-[#1A1A1A] underline underline-offset-4"
            >
              Đặt lại toàn bộ bộ lọc
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredDestinations.map((dest) => {
              const isSaved = savedDestIds.includes(dest.id);

              return (
                <div
                  key={dest.id}
                  id={`dest-card-${dest.id}`}
                  className="bg-white border border-[#1A1A1A]/15 hover:border-[#1A1A1A] transition-all flex flex-col group justify-between"
                >
                  {/* Card Image with Badges */}
                  <div>
                    <div className="relative h-56 overflow-hidden bg-stone-100">
                      <img
                        src={dest.image}
                        alt={dest.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] via-transparent to-black/20" />
                      
                      {/* Region Tag */}
                      <div className="absolute top-3 left-3 flex items-center gap-1.5">
                        <span className="px-2.5 py-1 text-[9px] font-sans uppercase tracking-[0.2em] font-bold bg-[#1A1A1A]/90 text-white">
                          {dest.region === 'north' ? 'Miền Bắc' : dest.region === 'central' ? 'Miền Trung' : 'Miền Nam'}
                        </span>
                      </div>

                      {/* Wishlist Button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleSave(dest.id);
                        }}
                        id={`btn-save-${dest.id}`}
                        className="absolute top-3 right-3 w-8 h-8 bg-white/90 hover:bg-white flex items-center justify-center text-[#1A1A1A] border border-white/20 transition-colors"
                        title={isSaved ? 'Bỏ lưu' : 'Lưu địa điểm'}
                      >
                        <Heart className={`w-4 h-4 ${isSaved ? 'fill-rose-500 text-rose-500' : 'text-[#1A1A1A]'}`} />
                      </button>

                      {/* Bottom overlay text on image */}
                      <div className="absolute bottom-3 left-3 right-3 text-white">
                        <div className="flex items-center gap-1 text-xs text-[#C5A059] font-serif font-bold mb-0.5">
                          <Star className="w-3.5 h-3.5 fill-[#C5A059] text-[#C5A059]" />
                          <span>{dest.rating}</span>
                          <span className="text-stone-300 font-sans text-[10px]">({dest.reviewsCount} đánh giá)</span>
                        </div>
                        <h3 className="font-serif font-bold text-lg text-white tracking-tight leading-tight line-clamp-1">
                          {dest.name}
                        </h3>
                        <p className="text-[11px] text-stone-200 font-sans flex items-center gap-1 mt-0.5">
                          <MapPin className="w-3 h-3 text-[#C5A059]" />
                          <span>{dest.province}</span>
                        </p>
                      </div>
                    </div>

                    {/* Card Content Body */}
                    <div className="p-4 space-y-3">
                      <p className="text-xs text-[#1A1A1A]/70 font-sans line-clamp-2 leading-relaxed">
                        {dest.tagline}
                      </p>
                      
                      {/* Highlights bullets */}
                      <div className="space-y-1 pt-2 border-t border-[#1A1A1A]/10">
                        {dest.highlights.slice(0, 2).map((highlight, idx) => (
                          <div key={idx} className="flex items-start gap-1.5 text-[11px] text-[#1A1A1A]/80 font-sans">
                            <span className="text-[#C5A059] font-serif font-bold">•</span>
                            <span className="line-clamp-1">{highlight}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Footer Info & Actions */}
                  <div className="p-4 pt-0">
                    <div className="pt-3 border-t border-[#1A1A1A]/10 flex items-center justify-between gap-2">
                      <button
                        onClick={() => setActiveModalDest(dest)}
                        id={`btn-detail-${dest.id}`}
                        className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 bg-[#F9F7F2] hover:bg-[#EBE7DE] text-[#1A1A1A] text-[11px] font-sans uppercase tracking-wider font-bold border border-[#1A1A1A]/10 transition-colors"
                      >
                        <Eye className="w-3.5 h-3.5 text-[#C5A059]" />
                        <span>Chi Tiết</span>
                      </button>

                      <button
                        onClick={() => onViewOnMap(dest)}
                        id={`btn-map-${dest.id}`}
                        className="p-2 bg-[#1A1A1A] hover:bg-[#333] text-white transition-colors"
                        title="Xem vị trí và chỉ đường trên bản đồ"
                      >
                        <Navigation className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>

      {/* Destination Full Detail Modal */}
      {activeModalDest && (
        <div 
          id="destination-detail-modal"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs overflow-y-auto"
        >
          <div className="bg-[#FDFCFB] max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-[#1A1A1A]/20 relative animate-in fade-in zoom-in duration-200">
            
            {/* Modal Header Cover */}
            <div className="relative h-64 sm:h-72 w-full">
              <img
                src={activeModalDest.image}
                alt={activeModalDest.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] via-black/40 to-transparent" />
              
              <button
                onClick={() => setActiveModalDest(null)}
                id="btn-close-dest-modal"
                className="absolute top-4 right-4 w-9 h-9 bg-[#1A1A1A] hover:bg-black text-white flex items-center justify-center shadow-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="absolute bottom-4 left-6 right-6 text-white">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="px-2.5 py-0.5 text-[9px] font-sans uppercase tracking-[0.2em] font-bold bg-[#C5A059] text-white">
                    {getCategoryLabel(activeModalDest.category)}
                  </span>
                  <span className="flex items-center gap-1 text-xs font-serif font-bold text-[#C5A059] bg-black/50 px-2.5 py-0.5 backdrop-blur-sm">
                    <Star className="w-3.5 h-3.5 fill-[#C5A059]" />
                    {activeModalDest.rating} ({activeModalDest.reviewsCount} đánh giá)
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
                  {activeModalDest.name}
                </h3>
                <p className="text-xs sm:text-sm text-stone-300 flex items-center gap-1.5 mt-1 font-sans">
                  <MapPin className="w-3.5 h-3.5 text-[#C5A059]" />
                  <span>{activeModalDest.province} • {activeModalDest.region === 'north' ? 'Miền Bắc' : activeModalDest.region === 'central' ? 'Miền Trung' : 'Miền Nam'}</span>
                </p>
              </div>
            </div>

            {/* Modal Body Info */}
            <div className="p-6 sm:p-8 space-y-6 text-[#1A1A1A]">
              
              {/* Description */}
              <div className="space-y-2">
                <h4 className="text-[10px] font-sans uppercase tracking-[0.25em] font-bold text-[#C5A059]">Giới thiệu tổng quan</h4>
                <p className="text-[#1A1A1A]/80 text-sm sm:text-base leading-relaxed font-sans">
                  {activeModalDest.description}
                </p>
              </div>

              {/* Trip Quick Facts (Season, Stay, Budget) */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-[#F9F7F2] p-4 border border-[#1A1A1A]/10">
                <div className="flex items-start gap-2.5">
                  <div className="p-2 border border-[#C5A059]/40 text-[#C5A059]">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[9px] font-sans font-bold text-[#1A1A1A]/60 uppercase tracking-wider">Thời điểm lý tưởng</p>
                    <p className="text-xs font-bold text-[#1A1A1A] font-serif mt-0.5">{activeModalDest.bestTimeToVisit}</p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <div className="p-2 border border-[#C5A059]/40 text-[#C5A059]">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[9px] font-sans font-bold text-[#1A1A1A]/60 uppercase tracking-wider">Thời gian lưu trú</p>
                    <p className="text-xs font-bold text-[#1A1A1A] font-serif mt-0.5">{activeModalDest.idealStayDays}</p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <div className="p-2 border border-[#C5A059]/40 text-[#C5A059]">
                    <DollarSign className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[9px] font-sans font-bold text-[#1A1A1A]/60 uppercase tracking-wider">Chi phí ước tính</p>
                    <p className="text-xs font-bold text-[#1A1A1A] font-serif mt-0.5">{activeModalDest.avgBudget}</p>
                  </div>
                </div>
              </div>

              {/* Highlights & Specialties */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Highlights */}
                <div className="space-y-2.5">
                  <h4 className="text-xs font-sans font-bold text-[#1A1A1A] uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-[#C5A059]" />
                    <span>Trải nghiệm không thể bỏ lỡ</span>
                  </h4>
                  <ul className="space-y-2">
                    {activeModalDest.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs font-sans text-[#1A1A1A]/80">
                        <span className="text-[#C5A059] font-serif font-bold">0{i+1}.</span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Specialties */}
                <div className="space-y-2.5">
                  <h4 className="text-xs font-sans font-bold text-[#1A1A1A] uppercase tracking-wider flex items-center gap-1.5">
                    <Utensils className="w-4 h-4 text-[#C5A059]" />
                    <span>Món ngon đặc sản nên thử</span>
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {activeModalDest.specialties.map((s, i) => (
                      <span key={i} className="px-3 py-1.5 bg-[#F9F7F2] text-[#1A1A1A] border border-[#1A1A1A]/15 text-xs font-sans">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

              </div>

              {/* Useful Travel Tips */}
              {activeModalDest.tips && activeModalDest.tips.length > 0 && (
                <div className="p-4 bg-[#F9F7F2] border border-[#1A1A1A]/10 space-y-1.5">
                  <h4 className="text-[10px] font-sans font-bold text-[#C5A059] uppercase tracking-wider">
                    Mẹo du lịch từ chuyên gia bản địa
                  </h4>
                  <ul className="space-y-1">
                    {activeModalDest.tips.map((tip, idx) => (
                      <li key={idx} className="text-xs font-sans text-[#1A1A1A]/80">
                        — {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Action Buttons in Modal */}
              <div className="pt-4 border-t border-[#1A1A1A]/10 flex flex-col sm:flex-row items-center justify-end gap-3">
                <button
                  onClick={() => {
                    const dest = activeModalDest;
                    setActiveModalDest(null);
                    onViewOnMap(dest);
                  }}
                  id="modal-btn-view-map"
                  className="w-full sm:w-auto px-5 py-2.5 border border-[#1A1A1A]/20 text-[#1A1A1A] text-xs font-sans uppercase tracking-wider font-bold flex items-center justify-center gap-2 hover:bg-[#F9F7F2] transition-colors"
                >
                  <Navigation className="w-4 h-4 text-[#1A1A1A]" />
                  <span>Xem Trên Bản Đồ & Chỉ Đường</span>
                </button>

                <button
                  onClick={() => {
                    const dest = activeModalDest;
                    setActiveModalDest(null);
                    onBookServiceForDest(dest);
                  }}
                  id="modal-btn-book-now"
                  className="w-full sm:w-auto px-6 py-2.5 bg-[#1A1A1A] hover:bg-[#333] text-white text-xs font-sans uppercase tracking-[0.15em] font-bold shadow-sm flex items-center justify-center gap-2 transition-all"
                >
                  <span>Đặt Khách Sạn & Vé Tại Đây</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>

          </div>
        </div>
      )}

    </section>
  );
};
