'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

export default function Search({ placeholder, onChange }: { placeholder: string, onChange:(e:any)=>void }) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
	  onChange(e)
  }
  
  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <input
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm text-center outline-2 placeholder:text-gray-500"
        placeholder={placeholder}
		onChange={handleChange}
      />
      <MagnifyingGlassIcon 
      className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-bold text-gray-500 peer-focus:text-gray-900" />
    </div>
  );
}
