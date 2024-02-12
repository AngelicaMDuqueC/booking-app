import type { Booking } from '@/domain';

const parseDate = (dateStr: Date) => {
  return dateStr ? new Date(dateStr) : null;
};

const isDateInPast = (date: Date) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Reset time to start of the day
  return date < today;
};

const doesOverlap = (start: Date, end: Date, existingBookings: Booking[], bookingId: string) => {
  return existingBookings.some((booking) => {
    const existingStart = parseDate(booking.checkIn)!;
    const existingEnd = parseDate(booking.checkOut)!;
    return start < existingEnd && end > existingStart && bookingId && bookingId !== booking.id;
  });
};

export const validateDates = (start: Date, end: Date, existingBooking: Booking[], bookingId: string) => {
  if (isDateInPast(start) || isDateInPast(end)) {
    return 'Dates cannot be in the past.';
  }
  if (start >= end) {
    return 'Start date must be before the end date.';
  }
  if (doesOverlap(start, end, existingBooking, bookingId)) {
    return 'Booking dates overlap with an existing booking.';
  }
  return '';
};
