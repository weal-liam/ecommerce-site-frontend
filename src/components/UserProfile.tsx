'use client';
import CardWrapper from "@/components/Cards";
import { getUser } from "@/context/UserContext";
import Axios from "@/utils/api/axios";
import { CheckBadgeIcon, ChevronDownIcon, UserIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import  Link  from 'next/link';


export default function Page(){
    const [data, setData] = useState<any>(null)
    const [paymentData, setPaymentData] = useState<any[]>([]);
    const [isVisible, setIsVisible] = useState<boolean>(false)
	const pathname = usePathname();
    const { user } = getUser();

    useEffect(()=>{
        Axios.get('/analytics/stats/')
        .then((res)=>{
            setData(res.data['customer_data']);
        }).then(()=>{
            Axios.get('/payments/')
            .then((response)=>{
				setPaymentData(response.data['My Payments'] || response.data);
            })
        }).catch((err)=>{
            console.error("Fetching payments failed due to: ",err);
        })
		
    },[user])

    const handleOnclick = () => {
        setIsVisible((prev)=>!prev);
    }

    return(
        <div className=''>
            <div className="flex gap-[20px] justify-between items-center mb-4">
                <div className="flex items-center gap-[20px]">
                    <UserIcon className="w-13 h-13"/>
                    <h1 className="font-bold text-2xl">Your Profile</h1>
                </div>
                {user && user.is_admin && (
                    <Link
                        href={pathname.startsWith('/mart') ? '/dashboard' : '/mart'}
                        className='border p-2 rounded text-xl text-red-500'
                    >
                        {pathname.startsWith('/mart') ? 'To Dashboard' : 'To Mart'}
                    </Link>
                )}
            </div>
            {user && 
			<>
				<div className="w-full m-4 p-6 justify-self-center grid grid-rows-[20px_20px_20px] gap-[20px] shadow ">
					<div className="flex flex-row gap-[30px] items-center">
						<span>First Name:</span> <span>{user.first_name}</span>
					</div>
					<div className="flex flex-row gap-[30px] items-center">
						<span>Last Name:</span> <span>{user.last_name}</span>
					</div>
					<div className="flex flex-row gap-[30px] items-center">Verified {(user.is_admin)?"Admin":"Customer"}:
						{(user.is_customer || user.is_admin)?<CheckBadgeIcon className="w-5 h-5 text-green-600"/>: "Not Customer"}    
					</div>
					<div className="flex flex-row gap-[30px] items-center">
						<span>Email:</span><span>{user.email}</span>
					</div>
					<div className="flex flex-row gap-[30px] items-center">
						<span>Logged in as:</span><span>{user.username}</span> 
					</div>
					<div className="flex flex-row gap-[30px] items-center">
						<span>Joined:</span><span>{user.date_joined}</span>
					</div>
				</div>
				<div className=''>
					<div className="flex justify-between mb-4 bg-white p-4 rounded-xl shadow">
						<h1 className="text-xl semi-bold">Payments</h1>
						<ChevronDownIcon
							className={`w5 h-5 transform transition-transform duration-300 ${isVisible ? 'rotate-180' : 'rotate-0'}`}
							onClick={() => handleOnclick()}
						/>
					</div>
					{isVisible &&
					 <div>
						{paymentData.map(payment => (
									<div
										key={`${payment.id}-${payment.amount}`}
										className="flex justify-between mb-2 bg-white p-4 rounded shadow text-stone-800"
									>
										<h3>ID:{payment.session_id}</h3>
										<p>{`@-${payment.paid_at}`}</p>
										<div>Amount: {payment.amount}</div>
									</div>
									))}    
					 </div>}
					<div className="grid  sm:grid-cols-2 lg:grid-cols-4 gap-6">
					{data && <CardWrapper pathname={pathname} data={ data }/>}
					</div>
				</div>
			</>
			|| <p className="semi-bold text-lg justify-self-center">
					To access profile, Please login or signup for an account.
					<a href="/login" className="font-bold text-stone-600 hover:underline"> login or signup here</a>
				</p>} 
        </div>
    );
}