import type { Room } from '@/domain';
import { map } from 'nanostores';

type SelectedRoom = Pick<Room, 'id'>;
type HotelWithRooms = Record<string, { rooms: SelectedRoom[] } | undefined>;

export const hotelsStore = map<HotelWithRooms>({});

// Initialize the persistent store with a specific key for localStorage

const getAllHotels = () => {
  return hotelsStore?.get();
};

const addNewRoom = async (hotelId: string, room: SelectedRoom) => {
  const existingEntry = getAllHotels()[hotelId];
  if (existingEntry) {
    // Update the existing entry with the new room
    hotelsStore.setKey(hotelId, {
      ...existingEntry,
      rooms: [...existingEntry.rooms, room],
    });
  } else {
    // Create a new entry for the hotel
    hotelsStore.setKey(hotelId, {
      rooms: [room],
    });
  }
  window.localStorage.setItem('hotelStore', JSON.stringify(hotelsStore.get()));
};

const deleteHotel = async (id: string) => {
  hotelsStore.setKey(id, undefined);

  window.localStorage.setItem('hotelStore', JSON.stringify(hotelsStore.get()));
};

export { getAllHotels, addNewRoom, deleteHotel };
