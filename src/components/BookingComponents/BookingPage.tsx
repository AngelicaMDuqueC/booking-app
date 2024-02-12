import { useState } from 'react';
import { useBookingStore } from '@/infrastructure/hooks';
import type { Booking, UserInfo } from '@/domain';
import { createBooking } from '@/models/booking';
import BookingForm from './components/BookingForm';
import { navigate } from 'astro:transitions/client';

export const BookingPage = ({ idRoom }: { idRoom: string }) => {
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const { addBooking, findAllBookingByRoom } = useBookingStore().action;

  const handleBookRoom = async (userInfo: UserInfo) => {
    const newBook = createBooking({
      roomId: idRoom,
      userName: userInfo.firstName,
      lastName: userInfo.lastName,
      email: userInfo.email,
      checkIn: new Date(userInfo.checkInDate).toISOString(),
      checkOut: new Date(userInfo.checkOutDate).toISOString(),
    });
    try {
      await addBooking(newBook);
      setShowSuccessAlert(true);
      setShowErrorAlert(false);
      setTimeout(() => navigate(`/booking`), 1000);
    } catch (error) {
      setShowErrorAlert(true);
    }
  };

  return (
    <div className='flex flex-col items-start justify-start p-5'>
      <BookingForm handleOnSubmit={handleBookRoom} allBooking={(findAllBookingByRoom(idRoom) as Booking[]) ?? []} />
      {showSuccessAlert && (
        <div
          className='mb-4 rounded-lg bg-green-50 p-4 text-sm text-green-800 dark:bg-gray-800 dark:text-green-400'
          role='alert'
        >
          <span className='font-medium'>Success!</span> Your booking has been submitted.
        </div>
      )}
      {showErrorAlert && (
        <div
          className='mb-4 rounded-lg bg-yellow-50 p-4 text-sm text-yellow-800 dark:bg-gray-800 dark:text-yellow-300'
          role='alert'
        >
          <span className='font-medium'>Warning!</span> The range of dates is not available.
        </div>
      )}
    </div>
  );
};
