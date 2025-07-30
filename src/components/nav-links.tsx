'use client';

import {
  UserIcon,
  DocumentDuplicateIcon,
  ShoppingBagIcon,
  ChartBarIcon,
  UserGroupIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { CartIconWithBadge } from '@/components/CartIconWithBadge';

import BellIconWithBadge from '@/components/BellIconWithBadge';

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
export default function NavLinks({user, shoppingCount=0 , notifications=0} : {
  user : any ,
	shoppingCount : number ,
	notifications : number ,
}) {

  const links = {
            'mart links' : [
              {
                name: 'Home',
                href: '/mart',
                icon: ShoppingBagIcon 
              },
              {
                name: 'Cart',
                href: '/mart/cart',
                icon: CartIconWithBadge,
              },
              {
                name: 'Orders',
                href: '/mart/orders',
                icon: DocumentDuplicateIcon,
              },
              {
                name: 'Notifications',
                href: '/mart/notifications',
                icon: BellIconWithBadge,
              },
              {
                name: user? user.username : 'User',
                href: '/mart/user',
                icon: UserIcon,
              }],
            'dashboard links' : [
              {
                name: 'Dashboard',
                href: '/dashboard',
                icon:  ChartBarIcon
              },
              {
                name: 'Products',
                href: '/dashboard/products',
                icon: ShoppingBagIcon,
              },
              {
                name: 'Orders',
                href: '/dashboard/orders',
                icon: DocumentDuplicateIcon,
              },
              {
                name: 'Notifications',
                href: '/dashboard/notifications',
                icon: BellIconWithBadge,
              },
			  {
                name: 'Users',
                href: '/dashboard/users',
                icon: UserGroupIcon,
              },
              {
                name: user? user.username : 'User',
                href: '/dashboard/user',
                icon: UserIcon,
              }
            ]
  };
  	
  const pathname = usePathname();

  return (
    <>
      {links[(pathname.startsWith('/dashboard')?'dashboard links' : 'mart links')]
	  .map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(`flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-stone-400 hover:cursor-pointer hover:text-stone-600 md:flex-none md:justify-start md:p-2 md:px-3 ${user&&user.is_superuser===false&&link.name==='Users'?'hidden':null}`,
              {
                'bg-stone-400 text-stone-900': pathname === link.href ,
            },
          )}
          >
            <LinkIcon count={link.icon === CartIconWithBadge ? shoppingCount : notifications} className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
