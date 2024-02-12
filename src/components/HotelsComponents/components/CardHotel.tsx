import React, { type PropsWithChildren } from 'react';

interface CardProps extends PropsWithChildren {
  title: string;
  href?: string;
  btnName: string;
}
export const CardHotel = ({ title, href, btnName, children }: CardProps) => {
  return (
    <div className='mx-auto max-w-sm overflow-hidden rounded-lg shadow-lg'>
      <div className='px-6 py-4'>
        {children}
        <div className='mb-2 text-xl font-bold'>{title}</div>
        <a href={href} className='mr-4 mt-4 block text-teal-200 hover:text-white lg:mt-0 lg:inline-block'>
          {btnName}
        </a>
      </div>
    </div>
  );
};
