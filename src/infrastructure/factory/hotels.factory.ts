import { localHotelDataProvider } from '../controller';

const env = import.meta.env.USE_LOCAL_DATA || 'development';

export const HotelsControllerCreator = () => {
  let controller;

  switch (env) {
    case 'development':
      controller = localHotelDataProvider;
      break;
    case 'production':
      break;
    case 'test':
      break;
    default:
  }

  return controller;
};
