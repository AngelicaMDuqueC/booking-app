import { onMount } from 'nanostores';
import { useStore } from '@nanostores/react';
import {
  getBookings,
  addBooking,
  deleteBooking,
  updateBooking,
  findAllBookingByRoom,
  $bookingsStore,
  findBookingById,
} from '@/infrastructure/store';

export const useBookingStore = () => {
  const bookings = useStore($bookingsStore);
  onMount($bookingsStore, () => {
    const storeHotel = window.localStorage.getItem('bookingStore');
    if (storeHotel) {
      const parsedHotels = JSON.parse(storeHotel);
      $bookingsStore.set(parsedHotels);
    }
  });
  return {
    bookings,
    action: {
      getBookings,
      addBooking,
      deleteBooking,
      updateBooking,
      findAllBookingByRoom,
      findBookingById,
    },
  };
};
