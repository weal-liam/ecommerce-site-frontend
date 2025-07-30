'use client';

import SideNav from "@/components/sidenav";
import { getUser } from "@/context/UserContext";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user ,logout, notifications } = getUser();

  return (
    <>
        <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
            <div className="w-full flex-none md:w-64">
              <SideNav cart={[]} user={user} logout={logout} notifications={notifications}/>
            </div>
            <div className="flex-grow p-6 md:over-flow-y-auto md:p-12 overflow-scroll">
                {children}
            </div>
        </div>
    </>
  );
}