import { Navbar } from 'flowbite-react';
import { pages } from '@/utils';

export const Header = () => {
  return (
    <Navbar fluid rounded className=' bg-transparent'>
      <Navbar.Brand href='/'>
        <span className='self-center whitespace-nowrap text-xl font-semibold dark:text-white'>Booking App</span>
      </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse>
        {pages.map((page) => (
          <Navbar.Link key={page.url} href={page.url}>
            {page.name}
          </Navbar.Link>
        ))}
      </Navbar.Collapse>
    </Navbar>
  );
};
