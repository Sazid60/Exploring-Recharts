import { useEffect, useState } from 'react';
import { HashLoader } from 'react-spinners';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';

const ChartComponent = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const response = await fetch('https://django-dev.aakscience.com/candidate_test/fronted');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const jsonData = await response.json();
      console.log(jsonData)
      const parsedData = parseData(jsonData);
      // console.log(parsedData)
      setData(parsedData);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const parseData = (jsonData) => {
    const result = [];
    jsonData.forEach((yearObj) => {
      Object.keys(yearObj).forEach((year) => {
        yearObj[year].forEach((monthObj) => {
          Object.keys(monthObj).forEach((month) => {
            monthObj[month].forEach((dateObj) => {
              Object.keys(dateObj).forEach((date) => {
                const value = dateObj[date];
                result.push({
                  date: date.split(' , ')[0], 
                  value: value,
                });
              });
            });
          });
        });
      });
    });
    return result;
  };

  useEffect(() => {
    fetchData();
  }, []);

  const colors = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#8dd1e1', '#d0ed57', '#a4de6c', '#ffc658'];

  if (loading) {
    return <div><HashLoader className='text-blue-600' /></div>;
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
            top: 20, right: 30, left: 20, bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" stroke="#FFFFFF" />
          <YAxis stroke="#FFFFFF" />
          <Tooltip labelFormatter={(label) => `Date: ${label}`} contentStyle={{ backgroundColor: '#FFFFFF', color: '#000000' }} />
          <Bar
            dataKey="value"
            fill={({ index }) => colors[index % colors.length]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ChartComponent;
