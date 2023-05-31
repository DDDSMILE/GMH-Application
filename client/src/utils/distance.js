const toRad = (value) => {
  return (value * Math.PI) / 180;
};

const CalculateDistance = (lat1, lon1, lat2, lon2) => {
  const earthRadius = 6371; // Đường kính trái đất (đơn vị: km)
  const speed = 40; // Tốc độ (km/h)

  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  let distance = earthRadius * c;
  let time = distance / speed;

  if (distance < 1000) {
    distance = distance.toFixed(2); // Làm tròn đến 2 chữ số thập phân (mét)
    distance += " m";
  } else {
    distance = (distance / 1000).toFixed(2); // Làm tròn đến 2 chữ số thập phân (km)
    distance += " km";
  }

  if (time < 60) {
    time = Math.ceil(time); // Làm tròn lên (phút)
    time += " phút";
  } else {
    time = (time / 60).toFixed(2); // Làm tròn đến 2 chữ số thập phân (giờ)
    time += " giờ";
  }

  return { distance, time };
};

export default CalculateDistance;
