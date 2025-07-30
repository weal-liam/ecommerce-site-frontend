import React, { useEffect, useState } from 'react';
import { BarChart, XAxis, YAxis, Tooltip, Bar, ResponsiveContainer } from 'recharts';

function SalesChart(data :any[]) {
  const [chartData, setChartData] = useState<any[]>([]);

  useEffect(() => {
        const grouped : { [key : string] : number }  = {};

        data.forEach(order => {
          const date = new Date(order.created_at).toISOString().slice(0, 10);
          grouped[date] = (grouped[date] || 0) + parseFloat(order.total_price);
        });

        const formatted = Object.entries(grouped)
          .map(([date, total]) => ({ date, total: parseFloat(total.toFixed(2)) }))
          .sort((a, b) => a.date.localeCompare(b.date));

        setChartData(formatted);
      }
  , [data]);


  return (
    <div style={{ width: '100%', height: 300 }}>
      <h2>🧾 Daily Sales</h2>
      <ResponsiveContainer>
        <BarChart data={chartData}>
          <XAxis dataKey="date" />
          <YAxis tickFormatter={v => `$${v}`} />
          <Tooltip formatter={v => `$${v}`} />
          <Bar dataKey="total" fill="#3f51b5" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default SalesChart;