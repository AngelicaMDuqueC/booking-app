export interface Room {
  type: string;
  capacity: number;
  price: number;
  amenities: string[];
  id: string;
  imageUrl: string;
}

export interface Location {
  city: string;
  country: string;
}

export interface Hotel {
  location: Location;
  rooms: Room[];
  rating: number;
  distance_to_airport: number;
  image_url: string;
  name: string;
  id: string;
}

export interface Booking {
  id: string;
  roomId: string;
  hotelId: string;
  userName: string;
  lastName: string;
  email: string;
  checkIn: Date;
  checkOut: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserInfo {
  checkInDate: string;
  checkOutDate: string;
  firstName: string;
  lastName: string;
  email: string;
}

export type HotelsArray = Hotel[];
