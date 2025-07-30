'use client';

import Link from 'next/link';
import { HomeIcon } from '@heroicons/react/24/outline';
import NavLinks from './nav-links';
import SiteLogo from './SiteLogo';
import { CartItem } from '@/types/definitions';

export default function SideNav(
  {cart=[], user, logout, notifications} : {cart:CartItem[],user:any,logout:()=>void,notifications:any[]}
) {
  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2">
      <Link
        className="mb-2 flex h-20 items-end justify-start rounded-md bg-stone-700 p-4 md:h-40"
        href="/"
      >
        <div className="w-32 text-white flex items-center justify-items-center md:w-40">
          <SiteLogo />
        </div>
      </Link>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks user={user} shoppingCount={cart.length} notifications={notifications.length} />
        <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>
          <button 
		  className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-stone-400 hover:text-stone-600 md:flex-none md:justify-start md:p-2 md:px-3"
		  onClick={()=>{
			  logout();
			  }}>
            <HomeIcon className='w-5 h-5'/>
            <div className="hidden md:block">Sign Out</div>
          </button>
      </div>
    </div>
  );
}
