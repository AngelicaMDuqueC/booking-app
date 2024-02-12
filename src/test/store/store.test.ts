// tests/store.test.ts
import { cleanStores } from 'nanostores';
import { describe, it, expect, afterEach } from 'vitest';
import { $bookingsStore, getBookings, addBooking } from '@/infrastructure/store/bookingStore';

describe('bookingStore', () => {
  it('initializes with an empty array of bookings', () => {
    expect(getBookings()).toEqual({});
  });
  // it('adds a booking and updates the store correctly', () => {
  //   const newBooking = { id: 1, name: 'Test Booking' };
  //   addBooking(newBooking);
  //   expect(getBookings()).toContainEqual(newBooking);
  // });
  // it('deletes a booking and updates the store correctly', () => {
  //   const bookingToDelete = { id: 1, name: 'Test Booking' };
  //   store.addBooking(bookingToDelete);
  //   store.deleteBooking(bookingToDelete.id);
  //   expect(store.getBookings()).not.toContainEqual(bookingToDelete);
  // });
  // it('updates a booking and reflects changes in the store', () => {
  //   const bookingToUpdate = { id: 1, name: 'Test Booking' };
  //   store.addBooking(bookingToUpdate);
  //   const updatedBooking = { ...bookingToUpdate, name: 'Updated Booking' };
  //   store.updateBooking(updatedBooking);
  //   expect(store.getBookings()).toContainEqual(updatedBooking);
  // });
  // it('lists all bookings matching the current state', () => {
  //   const bookings = [
  //     { id: 1, name: 'Booking 1' },
  //     { id: 2, name: 'Booking 2' },
  //   ];
  //   bookings.forEach((booking) => store.addBooking(booking));
  //   expect(store.getBookings()).toEqual(expect.arrayContaining(bookings));
  // });

  // it('handles errors for invalid operations without altering the state', () => {
  //   expect(() => store.deleteBooking(999)).not.toThrow();
  //   expect(store.getBookings()).toEqual([]);
  // });

  afterEach(() => {
    cleanStores($bookingsStore);
  });
});
