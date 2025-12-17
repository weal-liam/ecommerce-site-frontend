'use client';

import { Order } from "@/types/definitions";
import Axios from "@/utils/api/axios";
import { ChevronDownIcon, DocumentDuplicateIcon } from "@heroicons/react/24/outline";
import React from "react";
import { useEffect, useState } from "react";


export default function Page() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [isVisible, setIsVisible] = useState<{[key:number]:boolean}>({});

    useEffect(()=>{
        Axios.get('orders/')
        .then((response)=>{
            setOrders(response.data['my_orders']);
            console.log(response.data);
        })
        .catch((err)=>{
            console.log("Fetching orders failed due to: ",err);
        })
    },[])

    const toggle = (id : number) => {
        setIsVisible(prev => ({...prev,[id]: !prev[id]}));
    };

    return (
        <>
            <div>
                <div key={1} className='flex flex-row items-center'><DocumentDuplicateIcon className="w-8 m-4" /><h1 className='text-2xl font-bold '>Your Orders</h1></div>
                {orders.length !== 0?(
                <div>
                    {
                    orders.map(item => (
                        <React.Fragment key={item.id}>
                            <div className="flex justify-between mb-2 bg-white p-4 rounded shadow">
                            <h3>{`${item.id}-${item.created_at}`}</h3>
                            <div>items: {item.items.length}</div>
                            <div>Status: {/* status value here */}</div>
                            <div>Total Amount: {item.total_price}</div>
                            <ChevronDownIcon
                                className={`w5 h-5 transform transition-transform duration-300 ${isVisible[item.id] ? 'rotate-180' : 'rotate-0'}`}
                                onClick={() => { toggle(item.id); }}
                            />
                            </div>
                            {isVisible[item.id] && (
                            <div key={`details-${item.id}`}>
                                {item.items.map(orderItem => (
                                <div
                                    key={`${orderItem.product.id}-${orderItem.quantity}`}
                                    className="flex justify-between mb-2 bg-white p-4 rounded shadow text-blue-600"
                                >
                                    <h3>Product: {orderItem.product.name}</h3>
                                    <div>Price: {orderItem.product.price}</div>
                                </div>
                                ))}
                            </div>
                            )}
                        </React.Fragment>
                    ))}
                </div>) : (
                    <p>You have no orders</p>
                )}
            </div>
        </>
    );
}