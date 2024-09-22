import React, { useEffect, useState } from 'react';
import { HashLoader } from 'react-spinners';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts';
import { fetchData } from '../api/api';
import { ChartData } from '../types/Types';

const ChartComponent: React.FC = () => {
  const [data, setData] = useState<ChartData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const result = await fetchData();
        setData(result);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    getData();
  }, []);

  const colors = [
    '#8884d8', '#82ca9d', '#ffc658', '#ff8042',
    '#8dd1e1', '#d0ed57', '#a4de6c', '#ffc658'
  ];

  if (loading) {
    return <div><HashLoader className="text-blue-600" /></div>;
  }

  if (error) {
    return <div>Error fetching data: {error}</div>;
  }

  return (
    <div className="w-full h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data.map((item, index) => ({
            ...item,
            fill: colors[index % colors.length],
          }))}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" stroke="#FFFFFF" />
          <YAxis stroke="#FFFFFF" />
          <Tooltip
            labelFormatter={(label) => `Date: ${label}`}
            contentStyle={{ backgroundColor: '#FFFFFF', color: '#000000' }}
          />
          <Bar dataKey="value" fill={({ index }) => colors[index % colors.length]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ChartComponent;
