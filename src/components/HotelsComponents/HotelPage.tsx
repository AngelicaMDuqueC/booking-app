import { navigate } from 'astro:transitions/client';
import type { Hotel } from '@/domain';
import { useGetHotelStore } from '@/infrastructure/hooks/useGetHotelStore';
import { RoomCard } from './components';

interface HotelPageProps {
  hotel: Hotel;
}

export const HotelPage = ({ hotel }: HotelPageProps) => {
  const { name, rooms, id: hotelId } = hotel;
  const { addNewRoom } = useGetHotelStore().action;

  return (
    <div className='container mx-auto px-4 py-8'>
      <h1 className='mb-8 text-center text-2xl font-bold'>{name}</h1>
      <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
        {rooms.map((room) => (
          <RoomCard
            key={room.id}
            roomType={room.type}
            onViewDetails={() => {}}
            onBookRoom={() => {
              addNewRoom(hotelId, room);
              navigate(`/booking/${room.id}`);
            }}
            imageUrl={room.imageUrl}
          />
        ))}
      </div>
    </div>
  );
};
