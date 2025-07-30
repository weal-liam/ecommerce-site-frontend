'use client';

import Axios from "@/utils/api/axios";
import { ChevronDownIcon, DocumentDuplicateIcon } from "@heroicons/react/24/outline";
import React from "react";
import { useEffect, useState } from "react";


export default function Page() {
    const [payments, setPayments] = useState<any[]>([]);
    const [isVisible, setIsVisible] = useState<{[key:number]:boolean}>({});

    useEffect(()=>{
        Axios.get('payments/')
        .then((response)=>{
            setPayments(response.data);
        })
        .catch((err)=>{
            console.log("Fetching payments failed due to: ",err);
        })
    },[])

    const toggle = (id : number) => {
        setIsVisible(prev => ({...prev,[id]: !prev[id]}));
    };

    return (
        <>
            <div>
                <div key={1} className='flex flex-row items-center'><DocumentDuplicateIcon className="w-8 m-4" /><h1 className='text-2xl font-bold '>Your payments</h1></div>
                {payments.length !== 0?(
                <div>
                    {
                    payments.map(payment => (
                        <React.Fragment key={payment.id}>
                            <div className="flex justify-between mb-2 bg-white p-4 rounded shadow">
                            <h3>ID: {payment.session_id}</h3>
                            <div>Status: {payment.status}</div>
                            <ChevronDownIcon
                                className={`w5 h-5 transform transition-transform duration-300 ${isVisible[payment.id] ? 'rotate-180' : 'rotate-0'}`}
                                onClick={() => { toggle(payment.id); }}
                            />
                            </div>
                            {isVisible[payment.id] && (
                            <div key={`details-${payment.id}`}>
                                <div className="flex justify-between mb-2 bg-white p-4 rounded shadow text-blue-600">
                                    <h3>Paid By: {payment.owner}</h3>
                                    <div>Amount: {payment.amount}</div>
                                </div>
                            </div>
                            )}
                        </React.Fragment>
                    ))}
                </div>) : (
                    <p> no payments avaialble</p>
                )}
            </div>
        </>
    );
}
