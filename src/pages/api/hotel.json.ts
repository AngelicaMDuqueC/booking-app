import type { APIRoute } from 'astro';
import { getHotelById } from '@/infrastructure/services';

export const GET: APIRoute = async ({ params }) => {
  const id = params.id;
  if (!id) {
    return new Response(null, {
      status: 404,
      statusText: 'No id',
    });
  }
  const hotel = await getHotelById(id);
  if (!hotel) {
    return new Response(null, {
      status: 404,
      statusText: 'No fund it',
    });
  }

  return new Response(JSON.stringify(hotel), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
