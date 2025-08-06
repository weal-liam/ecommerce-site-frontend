'use client';

import {
  UserIcon,
  AtSymbolIcon,
  KeyIcon,
} from '@heroicons/react/24/outline';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { useState } from 'react';
import { getUser } from '@/context/UserContext';

export default function LoginForm() {
    const [form, setForm] = useState({
      username: "George",
      email: "",
      password: "",
    });
  
    //const [error, setError] = useState("");

    const { login } = getUser();
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm({ ...form, [e.target.name]: e.target.value });
    };
  
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      login(form);
    }

	
  return (
    <form className="max-w-sm mx-auto mt-12 space-y-3" method='post'>
      <div className="rounded-lg bg-white px-6 pb-6 pt-8 shadow">
        <h1 className={`mb-6 text-2xl font-bold text-center`}>
          Sign in to Maverick Mart
        </h1>
        <div className="w-full">
		  <div>
            <label
              className="mb-2 block text-sm font-medium text-gray-900"
              htmlFor="username"
            >
              Username
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-300 py-2 pl-10 text-sm outline-2 placeholder:text-gray-400"
                id="username"
                type="text"
                name="username"
                placeholder="Enter your username"
                required
                onChange={handleChange}
              />
				<UserIcon className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400 peer-focus:text-stone-600" />
            </div>
          </div>
          <div>
            <label
              className="mb-2 block text-sm font-medium text-gray-900"
              htmlFor="email"
            >
              Email
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-300 py-2 pl-10 text-sm outline-2 placeholder:text-gray-400"
                id="email"
                type="email"
                name="email"
                placeholder="Enter your email address"
                required
                onChange={handleChange}
              />
              <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400 peer-focus:text-stone-600" />
            </div>
          </div>
          <div className="mt-5">
            <label
              className="mb-2 block text-sm font-medium text-gray-900"
              htmlFor="password"
            >
              Password
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-300 py-2 pl-10 text-sm outline-2 placeholder:text-gray-400"
                id="password"
                type="password"
                name="password"
                placeholder="Enter password"
                required
                onChange={handleChange}
                minLength={6}
              />
              <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400 peer-focus:text-stone-600" />
            </div>
          </div>
        </div>
        <button
          type="submit"
          className="mt-6 flex w-full items-center justify-center rounded-md bg-stone-600 px-4 py-2 font-semibold text-white transition hover:bg-stone-700"
          onClick={handleSubmit}
        >
          Log in
          <ArrowRightIcon className="ml-2 h-5 w-5 text-white" />
        </button>
        <div className="flex h-8 items-end space-x-1 text-sm text-red-600">
          {/*error*/}
        </div>
      </div>
    </form>
  );
}
