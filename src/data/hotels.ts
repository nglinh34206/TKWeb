import { Hotel } from '../types';

export const HOTELS: Hotel[] = [
  {
    id: 'vinpearl-resort-spa-ha-long',
    name: 'Vinpearl Resort & Spa Hạ Long',
    location: 'Đảo Rều, Bãi Cháy, TP. Hạ Long',
    city: 'Vịnh Hạ Long',
    region: 'north',
    address: 'Đảo Rều, Phường Bãi Cháy, TP. Hạ Long, Quảng Ninh',
    starRating: 5,
    userRating: 4.9,
    reviewsCount: 1420,
    coverImage: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=1200&q=80'
    ],
    priceStartFrom: 2350000,
    popularTag: 'View trọn Vịnh Hạ Long',
    lat: 20.9419,
    lng: 107.0375,
    description: 'Resort 5 sao biệt lập trên đảo Rều với 4 mặt hướng biển tuyệt đẹp, bể bơi vô cực rộng lớn ngoài trời và dịch vụ cano đưa đón 24/7 sang trọng.',
    amenities: ['Bể bơi vô cực ngoài trời', 'Bãi biển riêng tư', 'Bữa sáng Buffet quốc tế', 'Akoya Spa cao cấp', 'Phòng Gym hiện đại', 'Cano đưa đón 24/7', 'Wifi tốc độ cao', 'Khu vui chơi trẻ em'],
    rooms: [
      {
        id: 'vp-hl-deluxe-ocean',
        name: 'Deluxe Hướng Biển (Ocean View)',
        bedType: '1 Giường King hoặc 2 Giường Đơn',
        capacity: 2,
        sizeM2: 40,
        pricePerNight: 2350000,
        originalPrice: 2950000,
        amenities: ['Ban công ngắm biển', 'Bồn tắm nằm cao cấp', 'Bữa sáng miễn phí', 'Trà & Cà phê'],
        image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80'
      },
      {
        id: 'vp-hl-executive-suite',
        name: 'Executive Suite Toàn Cảnh Vịnh',
        bedType: '1 Giường King Cỡ Lớn',
        capacity: 3,
        sizeM2: 76,
        pricePerNight: 4650000,
        originalPrice: 5800000,
        amenities: ['Phòng khách riêng', 'Ban công góc 270 độ', 'Đặc quyền Executive Lounge', 'Hoa tươi & Rượu vang'],
        image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80'
      }
    ]
  },
  {
    id: 'four-seasons-nam-hai-hoi-an',
    name: 'Four Seasons Resort The Nam Hai',
    location: 'Bãi biển Hà My, Hội An',
    city: 'Phố Cổ Hội An',
    region: 'central',
    address: 'Khối Hà My Đông B, Điện Bàn, Quảng Nam (Cách Hội An 10 phút)',
    starRating: 5,
    userRating: 4.96,
    reviewsCount: 980,
    coverImage: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1200&q=80'
    ],
    priceStartFrom: 7200000,
    popularTag: 'Top 10 Resort Châu Á',
    lat: 15.9341,
    lng: 108.3189,
    description: 'Khu nghỉ dưỡng sang trọng bậc nhất ven biển miền Trung với kiến trúc lấy cảm hứng từ phong thủy truyền thống, 3 tầng hồ bơi vô cực dẫn thẳng ra đại dương xanh.',
    amenities: ['3 Hồ bơi vô cực phân tầng', 'The Heart of the Earth Spa', 'Sân Tennis tiêu chuẩn', 'Yoga & Thiền bãi biển', 'Lớp học nấu ăn Việt Nam', 'Xe Shuttle bus vào phố cổ'],
    rooms: [
      {
        id: 'fs-villa-1br',
        name: 'Villa 1 Phòng Ngủ Hướng Biển',
        bedType: '1 Giường King Cực Lớn',
        capacity: 2,
        sizeM2: 80,
        pricePerNight: 7200000,
        originalPrice: 8900000,
        amenities: ['Bồn tắm chìm bằng đá hoa cương', 'Khu vườn riêng', 'Bữa sáng chuẩn Michelin', 'Quản gia riêng'],
        image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=800&q=80'
      },
      {
        id: 'fs-villa-pool-beachfront',
        name: 'Beachfront Pool Villa (Hồ Bơi Riêng)',
        bedType: '1 Giường King Siêu Rộng',
        capacity: 3,
        sizeM2: 125,
        pricePerNight: 12800000,
        originalPrice: 15500000,
        amenities: ['Hồ bơi riêng sát bãi cát', 'Bàn tiệc BBQ ngoài trời', 'Xe đạp cá nhân mạ crom', 'Đưa đón sân bay Đà Nẵng VIP'],
        image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=80'
      }
    ]
  },
  {
    id: 'jw-marriott-phu-quoc-emerald-bay',
    name: 'JW Marriott Phu Quoc Emerald Bay Resort',
    location: 'Bãi Khem, An Thới, Phú Quốc',
    city: 'Đảo Ngọc Phú Quốc',
    region: 'south',
    address: 'Bãi Khem, Phường An Thới, TP. Phú Quốc, Kiên Giang',
    starRating: 5,
    userRating: 4.93,
    reviewsCount: 2150,
    coverImage: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=80'
    ],
    priceStartFrom: 5850000,
    popularTag: 'Kiệt tác của Bill Bensley',
    lat: 10.0381,
    lng: 104.0322,
    description: 'Khu nghỉ dưỡng kiệt tác kiến trúc mô phỏng trường đại học cổ điển Lamarck University của kiến trúc sư lừng danh Bill Bensley tại Bãi Khem - bãi cát trắng mịn như kem.',
    amenities: ['Hồ bơi hình vỏ sò Shell Pool', 'Bãi cát trắng mịn riêng biệt', 'Chanterelle Spa by JW', '5 Nhà hàng quốc tế', 'Chèo thuyền Kayak & SUP miễn phí', 'Đưa đón sân bay miễn phí'],
    rooms: [
      {
        id: 'jw-emerald-bay-view',
        name: 'Emerald Bay View Room',
        bedType: '1 Giường King Cỡ Lớn',
        capacity: 2,
        sizeM2: 53,
        pricePerNight: 5850000,
        originalPrice: 7100000,
        amenities: ['Ban công ngắm Bãi Khem', 'Nội thất phong cách Pháp cổ', 'Bữa sáng thượng hạng', 'Bồn tắm sang trọng'],
        image: 'https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=800&q=80'
      },
      {
        id: 'jw-turquoise-suite',
        name: 'Turquoise Suite Sát Biển',
        bedType: '1 Giường King Đặc Biệt',
        capacity: 3,
        sizeM2: 90,
        pricePerNight: 9900000,
        originalPrice: 12200000,
        amenities: ['Hồ bơi riêng trên ban công', 'Phòng khách phong cách quý tộc', 'Miễn phí trà chiều hàng ngày', 'Dịch vụ chuẩn bị giường cao cấp'],
        image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80'
      }
    ]
  },
  {
    id: 'hotel-de-la-coupole-sapa',
    name: 'Hotel de la Coupole - MGallery Sa Pa',
    location: 'Trung tâm Sa Pa, Lào Cai',
    city: 'Sa Pa & Đỉnh Fansipan',
    region: 'north',
    address: 'Số 1 đường Hoàng Liên, Sa Pa, Lào Cai',
    starRating: 5,
    userRating: 4.91,
    reviewsCount: 1890,
    coverImage: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1200&q=80'
    ],
    priceStartFrom: 2950000,
    popularTag: 'Kiến trúc Haute Couture lộng lẫy',
    lat: 22.3338,
    lng: 103.8415,
    description: 'Sự kết hợp tinh tế giữa văn hóa dân tộc thiểu số vùng cao Tây Bắc và phong cách thời trang Pháp Haute Couture của thập niên 1920. Khách sạn có ga tàu hỏa leo núi Mường Hoa trực tiếp trong tòa nhà.',
    amenities: ['Bể bơi nước ấm trong nhà Le Grand Bassin', 'Ga tàu hỏa Mường Hoa nội khu', 'Nuages Spa cao cấp', 'Nhà hàng Chic kiểu Pháp', 'Absinthe Bar & Cafe trên tầng thượng'],
    rooms: [
      {
        id: 'coupole-classic-king',
        name: 'Classic King Room',
        bedType: '1 Giường King',
        capacity: 2,
        sizeM2: 33,
        pricePerNight: 2950000,
        originalPrice: 3600000,
        amenities: ['Ban công ngắm thành phố Sa Pa', 'Nội thất thời trang Pháp', 'Bữa sáng buffet hảo hạng', 'Hệ thống sưởi ấm 2 chiều'],
        image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80'
      }
    ]
  },
  {
    id: 'intercontinental-danang-sun-peninsula',
    name: 'InterContinental Danang Sun Peninsula Resort',
    location: 'Bán đảo Sơn Trà, Đà Nẵng',
    city: 'Đà Nẵng - Thành Phố Đáng Sống',
    region: 'central',
    address: 'Bán đảo Sơn Trà, Thọ Quang, TP. Đà Nẵng',
    starRating: 5,
    userRating: 4.97,
    reviewsCount: 2680,
    coverImage: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=80'
    ],
    priceStartFrom: 8600000,
    popularTag: 'Resort sang trọng hàng đầu thế giới',
    lat: 16.1202,
    lng: 108.3142,
    description: 'Nằm ẩn mình trên những triền đồi của Bán đảo Sơn Trà với 4 tầng thiên nhiên: Thiên đường (Heaven), Bầu trời (Sky), Mặt đất (Earth) và Biển cả (Sea). Nơi hội tụ của ẩm thực Michelin đỉnh cao tại La Maison 1888.',
    amenities: ['Bãi biển biệt lập 700m', 'Tàu điện Nam Tram độc đáo', 'Nhà hàng 3 sao Michelin La Maison 1888', 'Mi Sol Spa', 'Hồ bơi vô cực Long Pool view biển'],
    rooms: [
      {
        id: 'ic-resort-classic-oceanview',
        name: 'Classic Resort Oceanview Terrace',
        bedType: '1 Giường King hoặc 2 Giường Đơn',
        capacity: 2,
        sizeM2: 70,
        pricePerNight: 8600000,
        originalPrice: 10500000,
        amenities: ['Sân hiên rộng mở ngắm vịnh biển', 'Bồn tắm bằng đá cẩm thạch nguyên khối', 'Bữa sáng tại Citron', 'Loa Bose & máy pha espresso'],
        image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=800&q=80'
      }
    ]
  },
  {
    id: 'sofitel-legend-metropole-hanoi',
    name: 'Sofitel Legend Metropole Hanoi',
    location: 'Quận Hoàn Kiếm, Hà Nội',
    city: 'Thủ Đô Hà Nội',
    region: 'north',
    address: '15 Phố Ngô Quyền, Tràng Tiền, Hoàn Kiếm, Hà Nội',
    starRating: 5,
    userRating: 4.95,
    reviewsCount: 3100,
    coverImage: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1200&q=80'
    ],
    priceStartFrom: 5200000,
    popularTag: 'Biểu tượng lịch sử từ năm 1901',
    lat: 21.0253,
    lng: 105.8564,
    description: 'Khách sạn huyền thoại 5 sao đầu tiên tại Hà Nội từ năm 1901 mang phong cách kiến trúc Pháp cổ điển xa hoa, chỉ cách Hồ Gươm và Nhà hát Lớn vài bước chân.',
    amenities: ['Hồ bơi nước ấm sân vườn', 'Le Spa du Metropole', 'Bamboo Bar cạnh hồ bơi', 'Tour hầm trú ẩn lịch sử Metropole', 'Dịch vụ xe Limousine đưa đón'],
    rooms: [
      {
        id: 'metropole-premium-room',
        name: 'Metropole Premium Room (Opera Wing)',
        bedType: '1 Giường King Cỡ Lớn',
        capacity: 2,
        sizeM2: 48,
        pricePerNight: 5200000,
        originalPrice: 6500000,
        amenities: ['Nội thất gỗ lim tân cổ điển', 'Bồn tắm phong cách Pháp', 'Bữa sáng kiểu Pháp & Việt', 'Dịch vụ quản gia 24/7'],
        image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80'
      }
    ]
  },
  {
    id: 'the-reverie-saigon',
    name: 'The Reverie Saigon',
    location: 'Quận 1, TP. Hồ Chí Minh',
    city: 'TP. Hồ Chí Minh (Sài Gòn)',
    region: 'south',
    address: '22-36 Phố đi bộ Nguyễn Huệ, Bến Nghé, Quận 1, TP. HCM',
    starRating: 5,
    userRating: 4.94,
    reviewsCount: 2280,
    coverImage: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80'
    ],
    priceStartFrom: 4900000,
    popularTag: 'Khách sạn xa hoa bậc nhất Sài Gòn',
    lat: 10.7725,
    lng: 106.7042,
    description: 'Tọa lạc ngay mặt tiền phố đi bộ Nguyễn Huệ với phong cách vương giả Ý lộng lẫy, dát vàng và đá mosaic thủ công tinh xảo, ngắm trọn dòng sông Sài Gòn rực rỡ.',
    amenities: ['Hồ bơi ngoài trời với hệ thống âm thanh dưới nước', 'The Spa 1.200m2', 'Dàn xe Rolls-Royce đưa đón', '4 Nhà hàng ẩm thực danh tiếng', 'Trực thăng riêng trên nóc'],
    rooms: [
      {
        id: 'reverie-grand-deluxe',
        name: 'Grand Deluxe River View',
        bedType: '1 Giường King Cao Cấp',
        capacity: 2,
        sizeM2: 53,
        pricePerNight: 4900000,
        originalPrice: 6100000,
        amenities: ['Cửa kính kịch trần view sông Sài Gòn', 'Bồn tắm massage Jacuzzi Chopard', 'Bữa sáng quý tộc', 'Tủ lạnh minibar miễn phí'],
        image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80'
      }
    ]
  },
  {
    id: 'ana-mandara-villas-dalat',
    name: 'Ana Mandara Villas Dalat Resort & Spa',
    location: 'Đường Lê Lai, Phường 5, TP. Đà Lạt',
    city: 'Đà Lạt - Thành Phố Ngàn Hoa',
    region: 'central',
    address: 'Đường Lê Lai, Phường 5, TP. Đà Lạt, Lâm Đồng',
    starRating: 5,
    userRating: 4.88,
    reviewsCount: 1650,
    coverImage: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=1200&q=80',
    images: [
      'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=1200&q=80'
    ],
    priceStartFrom: 2600000,
    popularTag: 'Ngôi làng biệt thự Pháp cổ giữa rừng thông',
    lat: 11.9482,
    lng: 108.4239,
    description: 'Bao gồm 17 biệt thự kiến trúc Pháp cổ từ những năm 1920-1930 được phục dựng nguyên bản, nằm rải rác giữa đồi thông xanh mát với lò sưởi củi ấm cúng.',
    amenities: ['Hồ bơi nước ấm ngoài trời', 'La Cochinchine Spa', 'Lò sưởi củi thật trong từng phòng', 'Vườn dâu tây hữu cơ', 'Trà chiều kiểu Anh bên lò sưởi'],
    rooms: [
      {
        id: 'ana-villa-room',
        name: 'Villa Room Cổ Điển',
        bedType: '1 Giường King Cỡ Lớn',
        capacity: 2,
        sizeM2: 38,
        pricePerNight: 2600000,
        originalPrice: 3200000,
        amenities: ['Lò sưởi củi cổ điển', 'Sàn gỗ thông nguyên bản', 'Bữa sáng ngắm rừng thông', 'Trà atiso & mứt Đà Lạt'],
        image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80'
      }
    ]
  }
];
