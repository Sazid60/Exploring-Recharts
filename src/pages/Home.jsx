import ChartComponent from "../components/ChartComponent";

const Home = () => {
    return (
        <div className=" min-h-screen flex justify-center items-center"
            style={{
                backgroundImage: 'url("/BG.jpg")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat' 
            }}
        >

            <ChartComponent />
        </div>
    );
};

export default Home;