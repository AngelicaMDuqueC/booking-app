import React, { useState } from 'react';
import { Button } from 'flowbite-react';
import type { Hotel, Room } from '@/domain';
import { ModalCancelBooking } from '../..';
import { formatDate } from '@/utils';

type BookingRoom = Room & {
  checkIn: Date;
  checkOut: Date;
  bookingId: string;
};

type HotelWithRooms = Pick<Hotel, 'id' | 'name' | 'image_url'> & {
  rooms: BookingRoom[];
};

type BookingCardProps = {
  hotel: HotelWithRooms;
  deleteBooking: (bookingId: string, hotelId: string) => void;
};

export const BookingCard: React.FC<BookingCardProps> = ({ hotel, deleteBooking }) => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  if (!hotel) return <div>Loading...</div>;
  return (
    <div className='mx-auto mt-4 max-w-md overflow-hidden rounded-xl bg-white shadow-md md:max-w-2xl'>
      <img className='h-48 w-full object-cover' src={hotel.image_url} alt={hotel.name} />
      <div className='p-8'>
        <div className='text-sm font-semibold uppercase tracking-wide text-indigo-500'>{hotel.name}</div>
        {hotel.rooms.length ? (
          hotel.rooms.map((room) => (
            <div key={room.id} className='mt-8'>
              <p className='text-gray-500'>Room: {room.type}</p>
              <p className='text-gray-500'>Check-in: {formatDate(room.checkIn)}</p>
              <p className='text-gray-500'>Check-out: {formatDate(room.checkOut)}</p>
              <div className='mt-4 flex w-full flex-row content-end justify-end gap-4'>
                <Button onClick={() => (window.location.href = `/booking/updates/${room.bookingId}`)}>
                  Update Booking
                </Button>
                <ModalCancelBooking
                  openModal={openModal}
                  setOpenModal={setOpenModal}
                  handleCancel={() => {
                    deleteBooking(room.bookingId as string, hotel.id as string);
                  }}
                />
              </div>
            </div>
          ))
        ) : (
          <p>No rooms selected</p>
        )}
      </div>
    </div>
  );
};
