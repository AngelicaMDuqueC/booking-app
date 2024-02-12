interface RoomCardProps {
  imageUrl: string;
  roomType: string;
  onViewDetails: () => void;
  onBookRoom: () => void;
}

export const RoomCard: React.FC<RoomCardProps> = ({ imageUrl, roomType, onViewDetails, onBookRoom }) => {
  return (
    <div className='mx-auto max-w-sm overflow-hidden rounded-lg bg-white shadow-lg transition-shadow duration-300 ease-in-out hover:shadow-xl'>
      <img src={imageUrl} alt={`${roomType} room`} className='h-48 w-full object-cover' />
      <div className='px-6 py-4'>
        <h5 className='mb-2 text-xl font-bold tracking-tight text-gray-900'>{roomType.toUpperCase()}</h5>
        <div className='mt-3 flex flex-col items-center justify-center space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0'>
          <button
            className='rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300'
            onClick={onViewDetails}
          >
            View Details
          </button>
          <button
            className='rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-300'
            onClick={onBookRoom}
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};
