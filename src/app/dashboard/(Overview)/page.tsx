'use client';

import CardWrapper from "@/components/Cards";
import SalesChart from "@/components/Charts";
import { CardsSkeleton, ChartSkeleton } from "@/components/skeletons";
import Axios from "@/utils/api/axios";
import { Suspense, useEffect, useState } from "react";
import { usePathname } from "next/navigation";


export default function Page(){
    const [data, setData] = useState<any>(null);
	const pathname = usePathname();

    useEffect(()=>{
            Axios.get('/analytics/stats/')
            .then((response)=>{
                setData(response.data['admin_data']);
            })
    },[])

    return (
        <>
        <main>
            <h1 className={`mb-4 font-bold text-xl md:text-2xl`}>
                Dashboard
            </h1>
            <div className=" grid  sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <Suspense fallback={<CardsSkeleton />}>
                    {data && <CardWrapper pathname={ pathname } data={data}/>}
                </Suspense>
            </div>
            <div className="flex flex-row m-6">
                 <Suspense fallback={<ChartSkeleton />}>
					 <SalesChart />
                </Suspense>
            </div>
        </main>
        </>
    );
}