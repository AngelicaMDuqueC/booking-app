const HostPath = import.meta.env.Path || 'http://localhost:4321';

const getHotelsData = async () => {
  const response = await fetch(`${HostPath}/api/hotels.json`);
  if (response.ok) {
    return response.json();
  }
  return [];
};

const getHotelByID = async (id: string) => {
  const response = await fetch(`${HostPath}/api/hotel.json/${id}`);

  if (response.ok) {
    return response.json();
  }
  throw new Error('Hotel not found');
};

export const localHotelDataProvider = { getHotelsData, getHotelByID };
