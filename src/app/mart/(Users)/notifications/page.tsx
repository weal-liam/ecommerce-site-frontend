'use client';
import { getUser } from "@/context/UserContext";
import { BellAlertIcon } from "@heroicons/react/24/outline";


export default function Page(){
    const { notifications, removeNotification } = getUser();

    return (
        <>
            <div className="p-6">
                <div className="flex gap-[20px] w-full mb-2 p-4"><BellAlertIcon className="w-10 h-10"/><h1 className="font-bold text-2xl">Your Notifcations</h1></div>
                {(notifications.length > 0)?<div>
                    {notifications.map(notifcation => <div key={notifications.indexOf(notifcation)} className="flex justify-between mb-2 bg-white p-4 rounded shadow">
                        <p>{notifcation}</p>
                        <button onClick={()=>removeNotification(notifcation)} className="text-sm text-red-500 mt-1">delete</button>
                    </div>)}
                <div>
                    <button className="mt-4 bg-red-600 text-white px-4 py-2 rounded">Clear</button>
                </div>
                </div>:<p>You currently have no notifcations</p>}
            </div>
        </>
    );
}