import type { Booking } from '@/domain';
import { map } from 'nanostores';

export const $bookingsStore = map<Record<string, Booking | undefined>>({});

function getBookings() {
  return $bookingsStore.get();
}

export function isOverlapping(newBooking: Booking) {
  const bookings = $bookingsStore.get();
  return Object.values(bookings).some((booking) => {
    const newBookingCheckIn = new Date(newBooking.checkIn).getTime();
    const newBookingCheckout = new Date(newBooking.checkOut).getTime();
    const bookingCheckIn = new Date(booking?.checkIn!).getTime();
    const bookingCheckout = new Date(booking?.checkOut!).getTime();

    return (
      newBooking.roomId === booking?.roomId &&
      newBookingCheckIn < bookingCheckIn! &&
      newBookingCheckout > bookingCheckout!
    );
  });
}

// Function to add a booking
async function addBooking(booking: Booking) {
  if (isOverlapping(booking)) throw new Error('dates all ready selected');
  await $bookingsStore.setKey(booking.id, booking);
  window.localStorage.setItem('bookingStore', JSON.stringify($bookingsStore.get()));
}

// Function to delete a booking
async function deleteBooking(bookingId: string) {
  await $bookingsStore.setKey(bookingId, undefined);

  window.localStorage.setItem('bookingStore', JSON.stringify($bookingsStore.get()));
}

function findAllBookingByRoom(roomId: string) {
  const bookings = $bookingsStore.get();
  return (
    Object.values(bookings)?.filter((booking) => {
      return roomId === booking?.roomId;
    }) ?? []
  );
}

// Function to update a booking

async function updateBooking(booking: Booking) {
  const existingEntry = $bookingsStore.get()[booking.id];

  if (existingEntry) {
    await $bookingsStore.setKey(booking.id, {
      ...existingEntry,
      ...booking,
    });
    window.localStorage.setItem('bookingStore', JSON.stringify($bookingsStore.get()));
  } else {
    throw new Error('could not find booking');
  }
}

async function findBookingById(id: string) {
  if (!id) return;
  const existingEntry: Booking | undefined = $bookingsStore.get()[id];
  if (existingEntry) {
    return existingEntry;
  } else {
    throw new Error('could not find booking');
  }
}

export { getBookings, addBooking, deleteBooking, updateBooking, findAllBookingByRoom, findBookingById };
