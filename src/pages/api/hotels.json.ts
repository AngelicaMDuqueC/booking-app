import type { APIRoute } from 'astro';
import { getHotels } from '@/infrastructure/services';

export const GET: APIRoute = async ({}) => {
  const allHotels = await getHotels();

  return new Response(JSON.stringify(allHotels), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
