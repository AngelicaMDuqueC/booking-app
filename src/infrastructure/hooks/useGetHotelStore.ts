import { onMount } from 'nanostores';
import { useStore } from '@nanostores/react';
import { hotelsStore, getAllHotels, addNewRoom, deleteHotel } from '@/infrastructure/store';

export const useGetHotelStore = () => {
  const hotel = useStore(hotelsStore);
  onMount(hotelsStore, () => {
    const storeHotel = window.localStorage.getItem('hotelStore');
    if (storeHotel) {
      const parsedHotels = JSON.parse(storeHotel);
      hotelsStore.set(parsedHotels);
    }
  });
  return {
    hotel,
    action: {
      getAllHotels,
      addNewRoom,
      deleteHotel,
    },
  };
};
