export const formatVND = (amount: number): string => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    maximumFractionDigits: 0
  }).format(amount);
};

export const formatNumber = (num: number): string => {
  return new Intl.NumberFormat('vi-VN').format(num);
};

// Calculate Haversine distance in kilometers between two GPS coordinates
export const calculateDistanceKm = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number => {
  const R = 6371; // Radius of the Earth in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c);
};

// Format duration estimate based on mode
export const estimateTravelTime = (distanceKm: number, mode: 'car' | 'flight' | 'motorbike' | 'train'): string => {
  if (distanceKm <= 0) return '0 phút';
  if (mode === 'flight') {
    const flightHours = (distanceKm / 600) + 0.6; // ~600km/h avg + takeoff/landing
    const hours = Math.floor(flightHours);
    const mins = Math.round((flightHours - hours) * 60);
    return hours > 0 ? `${hours}h ${mins}m bay` : `${mins} phút bay`;
  }
  if (mode === 'car') {
    const carHours = distanceKm / 65; // ~65km/h avg highway
    const hours = Math.floor(carHours);
    const mins = Math.round((carHours - hours) * 60);
    return hours > 0 ? `${hours} giờ ${mins} phút` : `${mins} phút`;
  }
  if (mode === 'motorbike') {
    const motoHours = distanceKm / 45; // ~45km/h
    const hours = Math.floor(motoHours);
    const mins = Math.round((motoHours - hours) * 60);
    return hours > 0 ? `${hours} giờ ${mins} phút` : `${mins} phút`;
  }
  // train
  const trainHours = distanceKm / 50;
  const hours = Math.floor(trainHours);
  const mins = Math.round((trainHours - hours) * 60);
  return `${hours} giờ ${mins} phút`;
};

// Format duration in decimal hours to a friendly Vietnamese string
export const formatDurationHours = (decimalHours: number): string => {
  if (decimalHours <= 0) return '0 phút';
  const hours = Math.floor(decimalHours);
  const minutes = Math.round((decimalHours - hours) * 60);
  if (hours === 0) {
    return `~${minutes} phút`;
  }
  return minutes > 0 ? `~${hours} giờ ${minutes} phút` : `~${hours} giờ`;
};

