import Link from 'next/link';
import { useRouter } from 'next/router';

const NavLink = ({ href, children }) => {
  const { pathname } = useRouter();
  const active = pathname === href;
  return (
    <Link href={href}>
      <a className={`${active ? 'underline' : ''} hover:underline text-lg`}>
        {children}
      </a>
    </Link>
  );
};

export default function Header() {
  return (
    <header className='p-[15px]'>
      <NavLink href={'/'}>
        <span className='mr-4'>Menu</span>
      </NavLink>
      <NavLink href={'/orders'}>Orders</NavLink>
    </header>
  );
}
