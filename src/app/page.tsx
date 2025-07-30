'use client';

import Footer from '@/components/Footer';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="text-stone-600 grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center align-items-center">
        <div className="flex flex-row items-center">
        <h1 className="font-[family-name:var(--font-geist-mono)] text-4xl">
          Welcome to Maverickcommunitee
        </h1>
          <Image
            src="/logo.jpg"
            alt="Maverikcommunitee Logo"
            width={100}
            height={100}
            className=""
          />
        </div>
        <p className="text-lg">
          Your one-stop destination for all things you desire. Explore our wide selection of ideals from around the world.
        </p>
        <div className='flex flex-col gap-[32px] row-start-2 items-center align-items-center sm:items-start'>
          <button 
          onClick={()=>{window.location.href=`${window.location.href}/mart`}}
          className="bg-stone-600 w-full text-white px-4 py-2 rounded hover:cursor-pointer">
            Continue to mart
          </button>
          <button
            onClick={()=>{window.location.href=`${window.location.href}/login`}}
            className="bg-stone-600 w-full text-white px-4 py-2 rounded hover:cursor-pointer">
            Login / SignUp
          </button>
			
        </div>
      </main>
      <Footer />
    </div>
  );
}
