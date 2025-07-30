'use client';

import { getUser } from "@/context/UserContext";
import Axios from "@/utils/api/axios";
import { CheckBadgeIcon, ChevronDownIcon, UserGroupIcon } from "@heroicons/react/24/outline";
import React from "react";
import { useEffect, useState } from "react";


export default function Page() {
    const [users, setUsers] = useState<any[]>([]);
    const [isVisible, setIsVisible] = useState<{[key:number]:boolean}>({});
    const [mode , setMode] = useState<{[key:number]:string}>({});
    const [isAdmin, setIsAdmin] = useState<boolean>(false);
     const [isCustomer, setIsCustomer] = useState<boolean>(false);
    const [changed, setChanged] = useState<boolean>(false);
    const { addNotifications} = getUser();

    useEffect(()=>{
        Axios.get('users/')
        .then((response)=>{
            setUsers(response.data);
        })
        .catch((err)=>{
            console.log("Fetching users failed due to: ",err);
        })
    },[])

    const toggle = (id : number) => {
        setIsVisible(prev => ({...prev,[id]: !prev[id]}));
    };

    const handleChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.name === 'is_admin') setIsAdmin(e.target.checked) 
            else setIsCustomer(e.target.checked)
        setChanged(e.target.checked);
    }

    const handleSubmit = async(id : number) => {
        await Axios.put(`users/user/${id}`,{is_admin : isAdmin, is_customer : isCustomer })
                    .then((response)=>addNotifications(`User ${response.data.username}'s profile has been updated`));
        setMode(prev=>({...prev,[id]:'normal'}))
    }

    return (
        <>
            <div>
                <div key={1} className='flex flex-row items-center'><UserGroupIcon className="w-8 m-4" /><h1 className='text-2xl font-bold '>Your users</h1></div>
                {users.length !== 0?(
                <div>
                    {
                    users.map(user => (
                        <React.Fragment key={user.id}>
                            <div className="flex justify-between mb-2 bg-white p-4 rounded shadow">
                            <h3 className="flex flex-row items-center"><span className="m-2">Name:</span> {`${user.first_name} ${user.last_name}`} </h3>
                            <div className="flex flex-row items-center"><span className="m-2">Status:</span>
							{user.is_active?<CheckBadgeIcon className="w-5 h-5 text-bold text-red-500"/>: 'not active'}</div>
                            {user.is_admin && user.is_active && 
                            <div className="flex flex-row items-center"><span className="m-2">{`Verified ${user.is_admin?"admin":"customer"}:`}</span>
                                <CheckBadgeIcon className="w-5 h-5 text-bold text-green-500"/>
                            </div>}
                            <ChevronDownIcon
                                className={`w5 h-5 transform transition-transform duration-300 ${isVisible[user.id] ? 'rotate-180' : 'rotate-0'}`}
                                onClick={() => { toggle(user.id); }}
                            />
                            </div>
                            {isVisible[user.id] && (
                            <div key={`details-${user.id}`}>
                                <div className="flex justify-between mb-2 bg-white p-4 rounded shadow text-blue-600">
                                    <h3 className="flex flex-row items-center"><span className="m-2">username:</span>  {user.username}</h3>
                                    <div className="flex flex-row items-center"><span className="m-2">is an admin:</span>   
                                        {mode[user.id] === 'edit'?<input name="is_admin" type="checkbox" defaultChecked={user.is_admin} onChange={handleChange} />:(user && user.is_admin)?<CheckBadgeIcon className="w-5 h-5 text-bold text-green-500"/>:'not'}
                                    </div>
                                    <div className="flex flex-row items-center"><span className="m-2">is a customer:</span>      
                                        {mode[user.id] === 'edit'?<input name="is_customer" type="checkbox" defaultChecked={user.is_customer} onChange={handleChange} />:(user && user.is_customer)?<CheckBadgeIcon className="w-5 h-5 text-bold text-green-500"/>:'not'}
                                    </div>
                                    <div className="flex flex-row items-center">
                                        <span className="m-2">Date Joined: </span>
                                        <span>{user.date_joined}</span>      
                                    </div>
                                    <button className="p-2 rounded bg-stone-500 text-stone-900" onClick={() => (mode[user.id] === 'edit')? setMode(prev=>({...prev,[user.id]:'normal'})):setMode(prev=>({...prev,[user.id]:'edit'}))}>
                                        {mode[user.id] === 'edit'?'Cancel':"Edit"}
                                    </button>
                                    {changed  && 
                                    <button onClick={() => handleSubmit(user.id)} className="p-2 rounded bg-stone-500 text-stone-900">
                                        Save
                                    </button>
                                    }
                                </div>
                            </div>
                            )}
                        </React.Fragment>
                    ))}
                </div>) : (
                    <p> no users avaialble</p>
                )}
            </div>
        </>
    );
}
