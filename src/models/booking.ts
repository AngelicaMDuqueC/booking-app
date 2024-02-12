import type { Booking } from '@/domain';

export const createBooking = (customerToCreate: any): Booking => {
  return {
    ...customerToCreate,
    createdAt: new Date(),
    updatedAt: new Date(),
    id: crypto.randomUUID(),
  };
};

export const updateDataBooking = (customerToCreate: any): Booking => {
  return {
    ...customerToCreate,
    updatedAt: new Date(),
  };
};
