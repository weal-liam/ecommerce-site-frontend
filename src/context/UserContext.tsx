'use client';

import { UserContextType } from "@/types/definitions";
import Axios from "@/utils/api/axios";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";


const UserContext = createContext<UserContextType |undefined>(undefined);

export const UserProvider = ({ children }:{children : ReactNode}) => {
    const [ user , setUser] = useState<any>(null);
    const [ notifications, setNotifications] = useState<string[]>([]);
	
	useEffect(() => {
		if(localStorage.getItem('access_token')){
			Axios.get('/users/user').then((res)=>{
				setUser(res.data.user);
		})
		}
    },[])

    const date = Date().toString().slice(19,24);

    const addNotifications = (notification : string) => {
        setNotifications((prev)=>[
            ...prev, `${notification} @ ${date}`
        ]);
    }

    const removeNotification = (notification : string) => {
        setNotifications((prev)=>prev.filter(item => item !== notification));
    }

    const clearNotifications = () => {
        setNotifications([]);
    }
	
	const login = async(user: any) => {
		await fetchUser(user);
        const res = await Axios.post('/users/session/',{...user,username: user.fullname?user.fullname.split(" ")[0] : user.username})
        localStorage.setItem('access_token',res.data.access);
        localStorage.setItem('refresh_token',res.data.refresh);
    };

    const logout = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        setUser(null);
		window.location.href = '/';
    };

    const fetchUser = async(user: any) => {
        const res = await Axios.post('/users/login/',user);
        setUser(res.data.user);
		addNotifications('logged in successfully')
    }

    return(
        <UserContext.Provider value={{user , notifications, login, logout, addNotifications, removeNotification, clearNotifications}}>
            {children}
        </UserContext.Provider>
    );
}

export const getUser = () =>{
    const context = useContext(UserContext);
    if(!context) throw new Error('getUser must be used within UserProvider');
    return context;
}