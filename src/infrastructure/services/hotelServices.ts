import type { Hotel } from '@/domain';

const getHotels = async (): Promise<Hotel[]> => {
  return await import('@/utils/hotels.json').then((module) => module.default);
};

const getHotelById = async (id: string): Promise<Hotel | []> => {
  if (!id) throw new Error('not id provided');
  const allHotels = await getHotels();
  return allHotels?.find((hotel) => hotel.id === id) || [];
};

export { getHotels, getHotelById };
