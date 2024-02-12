import type { Hotel } from '@/domain';
import { CardHotel } from '.';

export const HotelsPage = ({ hotels }: { hotels: Hotel[] }) => {
  return (
    <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
      {hotels.map((hotel: Hotel) => (
        <CardHotel title={hotel.name} href={`/hotels/${hotel.id}`} btnName='Book' key={hotel.id}>
          <div className='flex flex-col items-center text-center'>
            <img src={hotel.image_url} alt={`Image of ${hotel.name}`} className='h-48 w-full object-cover' />
            <p className='mt-2'>
              {hotel.location.city}, {hotel.location.country}
            </p>
          </div>
        </CardHotel>
      ))}
    </div>
  );
};
