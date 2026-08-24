import React, { useEffect, useRef, useState } from 'react';
import { 
  MapPin, 
  Navigation, 
  Car, 
  Plane, 
  Train, 
  Bike, 
  Compass, 
  Layers, 
  Info, 
  ArrowRight, 
  Clock, 
  Milestone,
  CheckCircle,
  ExternalLink
} from 'lucide-react';
import L from 'leaflet';
import { DESTINATIONS } from '../data/destinations';
import { Destination } from '../types';
import { calculateDistanceKm, formatDurationHours } from '../utils/formatters';

interface MapDirectionsSectionProps {
  initialOriginName?: string;
  initialDestName?: string;
  onSelectDestinationForBooking?: (dest: Destination) => void;
}

export const MapDirectionsSection: React.FC<MapDirectionsSectionProps> = ({
  initialOriginName = 'Thủ Đô Hà Nội',
  initialDestName = 'Vịnh Hạ Long',
  onSelectDestinationForBooking
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const routeLayerRef = useRef<L.Polyline | null>(null);
  const markersRef = useRef<{ [key: string]: L.Marker }>({});

  const [originDestId, setOriginDestId] = useState<string>('hanoi');
  const [targetDestId, setTargetDestId] = useState<string>('halong');
  const [transportMode, setTransportMode] = useState<'car' | 'bike' | 'flight' | 'train'>('car');
  const [selectedMapFilter, setSelectedMapFilter] = useState<'all' | 'north' | 'central' | 'south'>('all');
  const [activePinDetail, setActivePinDetail] = useState<Destination | null>(null);

  // Initialize and manage Leaflet map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      // Vietnam center coordinates [16.0544, 107.5]
      const map = L.map(mapContainerRef.current, {
        center: [16.0544, 107.5],
        zoom: 6,
        zoomControl: true,
        scrollWheelZoom: true,
      });

      // Elegant CartoDB Voyager Map Tiles
      L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        maxZoom: 19,
      }).addTo(map);

      mapInstanceRef.current = map;
    }

    const map = mapInstanceRef.current;

    // Clear old markers
    Object.values(markersRef.current).forEach((marker: L.Marker) => {
      if (marker) {
        marker.remove();
      }
    });
    markersRef.current = {};

    // Custom map pin icon creator
    const createCustomIcon = (dest: Destination, isOrigin: boolean, isTarget: boolean) => {
      const bgColor = isOrigin 
        ? '#1A1A1A' // Black
        : isTarget 
          ? '#C5A059' // Gold
          : '#0284c7'; // Sky blue

      const html = `
        <div style="
          background-color: ${bgColor};
          width: 32px;
          height: 32px;
          border-radius: 50% 50% 50% 0;
          transform: rotate(-45deg);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 10px rgba(0,0,0,0.3);
          border: 2px solid white;
          cursor: pointer;
        ">
          <div style="
            transform: rotate(45deg);
            color: white;
            font-size: 13px;
            font-weight: 800;
          ">
            ${isOrigin ? 'A' : isTarget ? 'B' : '★'}
          </div>
        </div>
      `;

      return L.divIcon({
        className: 'custom-leaflet-marker',
        html: html,
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32],
      });
    };

    // Add destination markers
    DESTINATIONS.forEach((dest) => {
      if (selectedMapFilter !== 'all' && dest.region !== selectedMapFilter) {
        return;
      }

      const isOrigin = dest.id === originDestId;
      const isTarget = dest.id === targetDestId;
      const icon = createCustomIcon(dest, isOrigin, isTarget);

      const marker = L.marker([dest.lat, dest.lng], { icon })
        .addTo(map)
        .bindPopup(`
          <div style="min-width: 220px; font-family: sans-serif;">
            <img src="${dest.image}" style="width: 100%; height: 110px; object-fit: cover; border-radius: 4px; margin-bottom: 8px;" />
            <h4 style="margin: 0; font-weight: 800; font-size: 14px; color: #1A1A1A; font-family: Playfair Display, serif;">${dest.name}</h4>
            <p style="margin: 3px 0 6px 0; font-size: 12px; color: #C5A059; font-weight: 600;">★ ${dest.rating} (${dest.province})</p>
            <p style="margin: 0 0 10px 0; font-size: 11px; color: #475569; line-height: 1.4;">${dest.tagline}</p>
          </div>
        `);

      marker.on('click', () => {
        setActivePinDetail(dest);
      });

      markersRef.current[dest.id] = marker;
    });

    return () => {
      // clean up if necessary
    };
  }, [selectedMapFilter, originDestId, targetDestId]);

  // Handle Route Calculation and Drawing Polyline
  const originDest = DESTINATIONS.find((d) => d.id === originDestId) || DESTINATIONS[0];
  const targetDest = DESTINATIONS.find((d) => d.id === targetDestId) || DESTINATIONS[1];

  const straightDistanceKm = calculateDistanceKm(
    originDest.lat,
    originDest.lng,
    targetDest.lat,
    targetDest.lng
  );

  // Adjust driving factor
  const roadFactor = transportMode === 'flight' ? 1.05 : 1.28;
  const actualDistanceKm = Math.round(straightDistanceKm * roadFactor);

  // Speed calculation
  const speedKmH = transportMode === 'flight' ? 650 : transportMode === 'car' ? 70 : transportMode === 'train' ? 55 : 45;
  const estimatedHours = actualDistanceKm / speedKmH;

  // Update Route Polyline on Map
  useEffect(() => {
    if (!mapInstanceRef.current) return;
    const map = mapInstanceRef.current;

    // Remove existing route
    if (routeLayerRef.current) {
      routeLayerRef.current.remove();
      routeLayerRef.current = null;
    }

    if (originDest && targetDest && originDest.id !== targetDest.id) {
      const latlngs: [number, number][] = [
        [originDest.lat, originDest.lng],
        // If long distance, add curved midpoint
        [
          (originDest.lat + targetDest.lat) / 2 + 0.15,
          (originDest.lng + targetDest.lng) / 2 - 0.2
        ],
        [targetDest.lat, targetDest.lng]
      ];

      const polylineColor = transportMode === 'flight' ? '#C5A059' : transportMode === 'bike' ? '#d97706' : '#1A1A1A';

      const polyline = L.polyline(latlngs, {
        color: polylineColor,
        weight: 4,
        opacity: 0.85,
        dashArray: transportMode === 'flight' ? '8, 12' : undefined,
      }).addTo(map);

      routeLayerRef.current = polyline;

      // Fit map to show both markers
      const bounds = L.latLngBounds([
        [originDest.lat, originDest.lng],
        [targetDest.lat, targetDest.lng]
      ]);
      map.fitBounds(bounds, { padding: [60, 60], maxZoom: 10 });
    }
  }, [originDestId, targetDestId, transportMode]);

  const handleSwapPoints = () => {
    const temp = originDestId;
    setOriginDestId(targetDestId);
    setTargetDestId(temp);
  };

  const getRouteItinerarySteps = () => {
    if (transportMode === 'flight') {
      return [
        `Di chuyển ra sân bay gần ${originDest.name} (Check-in trước 90 phút)`,
        `Lên chuyến bay thẳng tới sân bay gần ${targetDest.name} (~1h15 - 2h10)`,
        `Hạ cánh nhận hành lý & đón xe đưa đón về trung tâm ${targetDest.name}`
      ];
    } else if (transportMode === 'train') {
      return [
        `Khởi hành từ Ga đường sắt trung tâm ${originDest.name}`,
        `Đi tàu Thống Nhất SE qua các cung đường ven biển và đèo tuyệt đẹp`,
        `Đến Ga trung tâm ${targetDest.name} và di chuyển về khách sạn`
      ];
    } else if (transportMode === 'bike') {
      return [
        `Khởi hành từ ${originDest.name} theo tuyến Quốc lộ 1A / Đường Hồ Chí Minh`,
        `Dừng chân check-in các điểm dừng chân, đèo cao phong cảnh ngoạn mục`,
        `Thưởng thức ẩm thực địa phương ven đường và đến ${targetDest.name}`
      ];
    } else {
      return [
        `Khởi hành từ ${originDest.name} nhập làn cao tốc tiêu chuẩn`,
        `Dừng chân tại trạm dừng nghỉ hiện đại (nghỉ ngơi sau mỗi 2h lái xe)`,
        `Rẽ vào nút giao cao tốc đến thẳng khu trung tâm danh lam thắng cảnh ${targetDest.name}`
      ];
    }
  };

  return (
    <section id="map" className="py-20 bg-[#FDFCFB] border-t border-[#1A1A1A]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6 pb-6 border-b border-[#1A1A1A]/10">
          <div>
            <div className="inline-flex items-center gap-2 text-[10px] font-sans uppercase tracking-[0.3em] font-bold text-[#C5A059] mb-2">
              <Compass className="w-3.5 h-3.5" />
              <span>Interactive Cartography & Route Itinerary</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#1A1A1A] tracking-tight leading-tight">
              Bản Đồ Du Lịch Toàn Cảnh <br />
              <span className="font-light italic text-[#C5A059]">
                & Chỉ Đường Tối Ưu
              </span>
            </h2>
            <p className="text-[#1A1A1A]/70 text-sm sm:text-base mt-1 font-sans font-light">
              Xem vị trí 12 danh thắng nổi tiếng, tính toán khoảng cách, thời gian và gợi ý lộ trình chỉ đường tối ưu.
            </p>
          </div>

          {/* Region map switcher */}
          <div className="flex items-center gap-1.5 bg-[#F9F7F2] p-1 border border-[#1A1A1A]/10 overflow-x-auto no-scrollbar">
            {[
              { id: 'all', label: 'Toàn Quốc (12)' },
              { id: 'north', label: 'Miền Bắc' },
              { id: 'central', label: 'Miền Trung' },
              { id: 'south', label: 'Miền Nam' },
            ].map((reg) => (
              <button
                key={reg.id}
                onClick={() => setSelectedMapFilter(reg.id as any)}
                className={`px-3.5 py-1.5 text-xs font-sans uppercase tracking-[0.15em] font-bold transition-all ${
                  selectedMapFilter === reg.id
                    ? 'bg-[#1A1A1A] text-white shadow-sm'
                    : 'text-[#1A1A1A]/70 hover:text-[#1A1A1A]'
                }`}
              >
                {reg.label}
              </button>
            ))}
          </div>
        </div>

        {/* Map Layout Grid: Left Controls / Right Leaflet Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left Route Calculator Panel (4 cols) */}
          <div className="lg:col-span-4 bg-white p-6 border border-[#1A1A1A]/15 space-y-6 shadow-sm">
            
            <div className="flex items-center justify-between border-b border-[#1A1A1A]/10 pb-3">
              <h3 className="font-serif text-lg font-bold text-[#1A1A1A] flex items-center gap-2">
                <Navigation className="w-4 h-4 text-[#C5A059]" />
                <span>Tính Lộ Trình & Chỉ Đường</span>
              </h3>
            </div>

            {/* Origin & Destination Selectors */}
            <div className="space-y-4 relative">
              
              {/* Origin Point A */}
              <div>
                <label className="text-[10px] font-sans uppercase tracking-wider font-bold text-[#1A1A1A]/70 flex items-center gap-1.5 mb-1.5">
                  <span className="w-4 h-4 bg-[#1A1A1A] text-white flex items-center justify-center text-[9px] font-bold">A</span>
                  <span>Điểm Khởi Hành (Xuất phát)</span>
                </label>
                <select
                  id="map-route-origin-select"
                  value={originDestId}
                  onChange={(e) => setOriginDestId(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#F9F7F2] border border-[#1A1A1A]/20 text-xs font-sans font-bold text-[#1A1A1A] focus:border-[#1A1A1A] focus:outline-none"
                >
                  {DESTINATIONS.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.name} ({d.province})
                    </option>
                  ))}
                </select>
              </div>

              {/* Swap Button */}
              <div className="flex justify-center -my-1">
                <button
                  type="button"
                  onClick={handleSwapPoints}
                  className="px-3 py-1 bg-white hover:bg-[#F9F7F2] text-[#1A1A1A] border border-[#1A1A1A]/20 shadow-xs transition-colors text-[10px] font-sans uppercase tracking-wider font-bold flex items-center gap-1"
                  title="Đổi chiều xuất phát - điểm đến"
                >
                  <span>⇅</span>
                  <span>Đổi Chiều</span>
                </button>
              </div>

              {/* Target Point B */}
              <div>
                <label className="text-[10px] font-sans uppercase tracking-wider font-bold text-[#1A1A1A]/70 flex items-center gap-1.5 mb-1.5">
                  <span className="w-4 h-4 bg-[#C5A059] text-white flex items-center justify-center text-[9px] font-bold">B</span>
                  <span>Điểm Đến (Danh thắng)</span>
                </label>
                <select
                  id="map-route-target-select"
                  value={targetDestId}
                  onChange={(e) => setTargetDestId(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#F9F7F2] border border-[#1A1A1A]/20 text-xs font-sans font-bold text-[#1A1A1A] focus:border-[#1A1A1A] focus:outline-none"
                >
                  {DESTINATIONS.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.name} ({d.province})
                    </option>
                  ))}
                </select>
              </div>

            </div>

            {/* Transport Modes */}
            <div className="space-y-2">
              <label className="text-[10px] font-sans font-bold text-[#1A1A1A]/50 uppercase tracking-widest">Phương tiện di chuyển</label>
              <div className="grid grid-cols-4 gap-1.5 bg-[#F9F7F2] p-1 border border-[#1A1A1A]/10">
                <button
                  type="button"
                  onClick={() => setTransportMode('car')}
                  className={`p-2 flex flex-col items-center justify-center gap-1 text-[10px] font-sans uppercase tracking-wider font-bold transition-all ${
                    transportMode === 'car' ? 'bg-[#1A1A1A] text-white shadow-sm' : 'text-[#1A1A1A]/70 hover:text-[#1A1A1A]'
                  }`}
                >
                  <Car className="w-3.5 h-3.5" />
                  <span>Ô Tô</span>
                </button>

                <button
                  type="button"
                  onClick={() => setTransportMode('flight')}
                  className={`p-2 flex flex-col items-center justify-center gap-1 text-[10px] font-sans uppercase tracking-wider font-bold transition-all ${
                    transportMode === 'flight' ? 'bg-[#1A1A1A] text-white shadow-sm' : 'text-[#1A1A1A]/70 hover:text-[#1A1A1A]'
                  }`}
                >
                  <Plane className="w-3.5 h-3.5" />
                  <span>Máy Bay</span>
                </button>

                <button
                  type="button"
                  onClick={() => setTransportMode('train')}
                  className={`p-2 flex flex-col items-center justify-center gap-1 text-[10px] font-sans uppercase tracking-wider font-bold transition-all ${
                    transportMode === 'train' ? 'bg-[#1A1A1A] text-white shadow-sm' : 'text-[#1A1A1A]/70 hover:text-[#1A1A1A]'
                  }`}
                >
                  <Train className="w-3.5 h-3.5" />
                  <span>Tàu Hỏa</span>
                </button>

                <button
                  type="button"
                  onClick={() => setTransportMode('bike')}
                  className={`p-2 flex flex-col items-center justify-center gap-1 text-[10px] font-sans uppercase tracking-wider font-bold transition-all ${
                    transportMode === 'bike' ? 'bg-[#1A1A1A] text-white shadow-sm' : 'text-[#1A1A1A]/70 hover:text-[#1A1A1A]'
                  }`}
                >
                  <Bike className="w-3.5 h-3.5" />
                  <span>Xe Máy</span>
                </button>
              </div>
            </div>

            {/* Calculated Statistics Result */}
            <div className="bg-[#1A1A1A] text-white p-5 border border-[#1A1A1A] space-y-4">
              <div className="grid grid-cols-2 gap-3 text-center border-b border-white/10 pb-4">
                <div className="p-3 bg-white/5 border border-white/10">
                  <div className="flex items-center justify-center gap-1 text-[9px] text-[#C5A059] uppercase font-sans font-bold tracking-wider">
                    <Milestone className="w-3 h-3 text-[#C5A059]" />
                    <span>Khoảng cách</span>
                  </div>
                  <div className="text-xl font-serif font-bold text-white mt-1">
                    {actualDistanceKm} <span className="text-xs font-sans font-normal text-stone-300">km</span>
                  </div>
                </div>

                <div className="p-3 bg-white/5 border border-white/10">
                  <div className="flex items-center justify-center gap-1 text-[9px] text-[#C5A059] uppercase font-sans font-bold tracking-wider">
                    <Clock className="w-3 h-3 text-[#C5A059]" />
                    <span>Thời gian ước tính</span>
                  </div>
                  <div className="text-xl font-serif font-bold text-[#C5A059] mt-1">
                    {formatDurationHours(estimatedHours)}
                  </div>
                </div>
              </div>

              {/* Step by step itinerary tips */}
              <div className="space-y-2">
                <p className="text-[10px] font-sans uppercase tracking-wider font-bold text-[#C5A059]">
                  Lộ trình di chuyển gợi ý:
                </p>
                <ul className="space-y-1.5 text-xs font-sans text-stone-300">
                  {getRouteItinerarySteps().map((step, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-[11px] leading-relaxed">
                      <span className="text-[#C5A059] font-serif font-bold">0{idx+1}.</span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Quick jump to booking services for Target Dest */}
            {onSelectDestinationForBooking && (
              <button
                type="button"
                onClick={() => onSelectDestinationForBooking(targetDest)}
                className="w-full py-3 px-4 bg-[#F9F7F2] hover:bg-[#EBE7DE] text-[#1A1A1A] border border-[#1A1A1A]/15 font-sans font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors"
              >
                <span>Xem Khách Sạn & Vé Đến {targetDest.name}</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#C5A059]" />
              </button>
            )}

          </div>

          {/* Right Map Canvas Container (8 cols) */}
          <div className="lg:col-span-8 space-y-4">
            
            <div className="relative overflow-hidden border border-[#1A1A1A]/20 bg-white shadow-sm">
              
              {/* Leaflet Map Canvas */}
              <div 
                id="vietnam-leaflet-map" 
                ref={mapContainerRef} 
                className="w-full h-[540px] z-10"
              />

              {/* Map floating badges */}
              <div className="absolute top-4 right-4 z-20 bg-[#1A1A1A] text-white px-3 py-1.5 text-[9px] font-sans uppercase tracking-[0.2em] font-bold shadow-md flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#C5A059] animate-pulse" />
                <span>Vietnam Geo-Network</span>
              </div>

              {/* Active Marker Preview Card floating on Map Bottom */}
              {activePinDetail && (
                <div className="absolute bottom-4 left-4 right-4 z-20 bg-[#FDFCFB]/95 backdrop-blur-md p-4 border border-[#1A1A1A]/20 shadow-xl flex items-center justify-between gap-3 animate-in fade-in">
                  <div className="flex items-center gap-3">
                    <img 
                      src={activePinDetail.image} 
                      alt={activePinDetail.name} 
                      className="w-12 h-12 object-cover border border-[#1A1A1A]/10" 
                    />
                    <div>
                      <h4 className="font-serif font-bold text-base text-[#1A1A1A] leading-tight">
                        {activePinDetail.name}
                      </h4>
                      <p className="text-xs text-[#C5A059] font-sans font-medium">
                        {activePinDetail.province} • ★ {activePinDetail.rating}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        setTargetDestId(activePinDetail.id);
                      }}
                      className="px-3.5 py-2 bg-[#1A1A1A] text-white text-[11px] font-sans uppercase tracking-wider font-bold hover:bg-[#333] transition-colors"
                    >
                      Chọn làm Điểm Đến (B)
                    </button>
                    <button
                      onClick={() => setActivePinDetail(null)}
                      className="text-[#1A1A1A]/50 hover:text-[#1A1A1A] text-xs font-bold p-1"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              )}

            </div>

            {/* Map Legend Tips */}
            <div className="grid grid-cols-3 gap-3 text-center text-xs font-sans text-[#1A1A1A]/70 bg-white p-3 border border-[#1A1A1A]/10">
              <div className="flex items-center justify-center gap-1.5">
                <span className="w-2.5 h-2.5 bg-[#1A1A1A]" />
                <span className="text-[11px]">Khởi Hành (A)</span>
              </div>
              <div className="flex items-center justify-center gap-1.5">
                <span className="w-2.5 h-2.5 bg-[#C5A059]" />
                <span className="text-[11px]">Điểm Đến (B)</span>
              </div>
              <div className="flex items-center justify-center gap-1.5">
                <span className="w-2.5 h-2.5 bg-sky-600" />
                <span className="text-[11px]">Danh Thắng Kỳ Quan</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
