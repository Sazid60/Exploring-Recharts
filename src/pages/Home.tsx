import React from 'react';
import ChartComponent from '../components/ChartComponent';

const Home: React.FC = () => {
    return (
        <div
            className="min-h-screen flex justify-center items-center"
            style={{
                backgroundImage: 'url("/BG.jpg")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
            }}
        >
            <ChartComponent />
        </div>
    );
};

export default Home;
