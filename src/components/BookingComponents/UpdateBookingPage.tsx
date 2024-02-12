import { useEffect, useState, lazy, Suspense } from 'react';
import type { Booking, UserInfo } from '@/domain';
import { updateDataBooking } from '@/models/booking';
import { useBookingStore } from '@/infrastructure';
import { navigate } from 'astro:transitions/client';

const BookingFormLazy = lazy(() => import('./components/BookingForm'));

export const UpdateBookingPage = ({ bookingId }: { bookingId: string }) => {
  const [booking, setBooking] = useState<Booking | null>(null);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const { updateBooking, findAllBookingByRoom, findBookingById } = useBookingStore().action;

  useEffect(() => {
    if (!bookingId) return;
    const getBooking = async () => {
      try {
        const booking = await findBookingById(bookingId);
        if (!booking) throw new Error('Booking not found');
        setBooking(booking as Booking);
      } catch (error) {
        setShowErrorAlert(true);
      }
    };
    getBooking();
  }, [bookingId, findBookingById]);

  const handleBookRoom = async (userInfo: UserInfo) => {
    const newBook = updateDataBooking({
      roomId: booking?.roomId,
      userName: userInfo.firstName,
      lastName: userInfo.lastName,
      email: userInfo.email,
      id: booking?.id,
      checkIn: new Date(userInfo.checkInDate).toISOString(),
      checkOut: new Date(userInfo.checkOutDate).toISOString(),
    });
    try {
      await updateBooking(newBook);
      setShowSuccessAlert(true);
      setShowErrorAlert(false);
      setTimeout(() => navigate(`/booking`), 1000);
    } catch (error) {
      setShowErrorAlert(true);
    }
  };

  if (booking === null) return <div>Loading ...</div>;

  return (
    <div className='flex flex-col items-start justify-start p-5'>
      <Suspense fallback={<div>Loading Booking Form...</div>}>
        <BookingFormLazy
          handleOnSubmit={handleBookRoom}
          allBooking={(findAllBookingByRoom(booking?.roomId) as Booking[]) ?? []}
          booking={booking}
        />
      </Suspense>
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
