import { useEffect, useState } from 'react';
import type { Hotel, Room } from '@/domain';
import { findAllBookingByRoom, getHotelById, useGetHotelStore, useBookingStore } from '@/infrastructure';
import { BookingCard } from './components';

('use client');
interface BookingRoom extends Room {
  checkIn: Date;
  checkOut: Date;
  bookingId: string;
}

interface BookingHotel extends Pick<Hotel, 'id' | 'name' | 'image_url'> {
  rooms: BookingRoom[];
}
export const AllBookingPage = () => {
  const [hotels, setHotels] = useState<BookingHotel[]>([]);
  const [canceledBookings, setCanceledBookings] = useState<boolean>(false);
  const {
    hotel: selectedHotels,
    action: { getAllHotels, deleteHotel },
  } = useGetHotelStore();
  const {
    action: { deleteBooking },
  } = useBookingStore();
  useEffect(() => {
    const hotels = getAllHotels();
    setHotels([]);
    const fetchHotelData = async () => {
      try {
        const hotelData = Object.keys(hotels).map(async (hotelId) => {
          const { name: hotelName, image_url, rooms } = (await getHotelById(hotelId)) as Hotel;
          const roomsBooked = rooms
            .map((room) => {
              const booking = findAllBookingByRoom(room.id)[0];

              return booking
                ? { ...room, checkIn: booking.checkIn, checkOut: booking.checkOut, bookingId: booking.id }
                : null;
            })
            .filter((room) => room !== null) as BookingRoom[];
          return {
            id: hotelId,
            name: hotelName,
            image_url,
            rooms: roomsBooked,
          };
        });
        setHotels(await Promise.all(hotelData));
      } catch (error: any) {
        if (error.name !== 'AbortError') {
          console.error('Fetch error:', error);
        }
      }
    };

    fetchHotelData();
  }, [selectedHotels, canceledBookings]);

  const handleCanceledBookings = (bookingId: string, hotelID: string) => {
    deleteBooking(bookingId);
    deleteHotel(hotelID);
    setCanceledBookings(!canceledBookings);
  };

  return (
    <div>
      {hotels.length ? (
        <>
          {hotels.map((hotel) => (
            <BookingCard hotel={hotel} key={hotel.id} deleteBooking={handleCanceledBookings} />
          ))}
          {canceledBookings && (
            <div
              className='mb-4 rounded-lg bg-green-50 p-4 text-sm text-green-800 dark:bg-gray-800 dark:text-green-400'
              role='alert'
            >
              <span className='font-medium'>Success!</span> Your booking has been canceled.
            </div>
          )}
        </>
      ) : (
        <h3>No bookings</h3>
      )}
    </div>
  );
};
