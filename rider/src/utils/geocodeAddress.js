const GeocodeAddress = async (address) => {
  const mapboxApiToken =
    "pk.eyJ1IjoidGhhaXJ5byIsImEiOiJjbGk2dmt6bmczZzNiM2VudGRkc2xhY2dxIn0.j5FbXoxE7wJOwi9STKSLBw";
    
  const response = await fetch(
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
      address
    )}.json?access_token=${mapboxApiToken}`
  );
  const data = await response.json();
  const [lng, lat] = data.features[0].center;
  return { lat, lng };
};

export default GeocodeAddress;
