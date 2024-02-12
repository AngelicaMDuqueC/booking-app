import { faker } from '@faker-js/faker';

const name = [
  'Grand Pacific Hotel',
  'Lakeview Hotel',
  'Sunset Resort',
  'Golden Sands Inn',
  'Royal Palace Resort',
  'Pinecrest Lodge',
  'Starlight Hotel',
  'Ocean Breeze Resort',
  'Mountain View Inn',
  'Paradise Retreat',
  'Riverside Lodge',
  'Serenity Resort',
  'Emerald Bay Hotel',
  'Whispering Pines Resort',
  'Beachfront Inn',
  'Azure Skies Hotel',
  'Willow Creek Lodge',
  'Alpine Chalet',
  'Moonlight Manor',
  'Palm Tree Resort',
];

const getFakeHotelData = () => {
  const city = faker.location.city();
  const country = faker.location.country();
  const rooms = [];
  const numberOfRooms = faker.number.int(10);

  for (let i = 0; i < numberOfRooms; i++) {
    const roomType = faker.helpers.arrayElement(['Standard Room', 'Deluxe Room', 'Suite']);
    const capacity = faker.helpers.arrayElement([2, 4, 6]);
    const price = faker.number.int({ min: 50, max: 500 });
    const amenities = faker.helpers.arrayElements(['Wi-Fi', 'TV', 'Mini Bar', 'Ocean View', 'Balcony', 'Spa']);
    const imageUrl = faker.image.url();

    rooms.push({
      id: crypto.randomUUID(),
      type: roomType,
      capacity: capacity,
      price: price,
      imageUrl,
      amenities,
    });
  }

  const rating = faker.number.float({ multipleOf: 0.25, min: 1, max: 5 });
  const distanceToAirport = faker.number.float({ min: 1, max: 50 });
  const imageUrl = faker.image.url();

  return {
    location: {
      city: city,
      country: country,
    },
    rooms: rooms,
    rating: rating,
    distance_to_airport: distanceToAirport,
    image_url: imageUrl,
  };
};

export const createFakeHotels = () => {
  return Array.from({ length: 20 }, getFakeHotelData).map((hotel, idx) => ({
    id: crypto.randomUUID(),
    name: name[idx],
    ...hotel,
  }));
};
