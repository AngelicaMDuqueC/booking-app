import { Header } from '.';

interface HeroSectionProps {
  title: string;
  subtitle: string;
  backgroundImageUrl: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ title, subtitle, backgroundImageUrl }) => {
  return (
    <div
      className='relative text-white'
      style={{
        backgroundImage: `url(${backgroundImageUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className='absolute inset-0 bg-black opacity-50'></div>
      <div className='relative mx-auto max-w-7xl px-4 py-36 sm:px-6 lg:px-8'>
        <Header />
        <h1 className='text-5xl font-bold'>{title}</h1>
        <p className='mt-4 text-xl'>{subtitle}</p>
      </div>
    </div>
  );
};
