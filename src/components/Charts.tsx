'use client';
import React, { useEffect, useState } from 'react';
import axios from '@/utils/api/axios';
import { BarChart, XAxis, YAxis, Tooltip, Bar, ResponsiveContainer } from 'recharts';
import { Order } from '@/types/definitions';

export default function SalesChart() {
  const [chartData, setChartData] = useState<any[]>([]);

  useEffect(() => {
    axios.get<Order[]>('/orders/')
      .then(res => {
        const grouped : {[key : string] : any } = {};

        res.data.forEach(order => {
          const date  = new Date(order.created_at).toISOString().slice(0, 10);
          grouped[date] = (grouped[date] || 0) + parseFloat(String(order.total_price));
        });

        const formatted  = Object.entries(grouped)
          .map(([date, total]) => ({ date, total: parseFloat(total.toFixed(2)) }))
          .sort((a, b) => a.date.localeCompare(b.date));

        setChartData(formatted);
      })
      .catch(err => console.error('Error fetching orders:', err));
  }, []);


  return (
    <div className='w-full h-[300px]'>
      <h2 className='m-4'>🧾 Daily Sales</h2>
      <ResponsiveContainer>
        <BarChart data={chartData}>
          <XAxis  dataKey="date" />
          <YAxis  tickFormatter={v => `$${v}`} />
          <Tooltip formatter={v => `$${v}`} />
          <Bar dataKey="total" fill="#3f51b5" barSize={30} radius={[5,5,0,0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}


