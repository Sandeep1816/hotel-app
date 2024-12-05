import { useQuery } from 'react-query';
import axiosInstance from './axiosInstance';
import useStore from './store';


const HotelList = () => {
  const { data, isLoading, error } = useQuery('hotels', async () => {
    const response = await axiosInstance.get('/hotels');
    return response.data;
  });

  const setSelectedHotel = useStore((state) => state.setSelectedHotel);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading hotels!</div>;

  return (
    <div>
      <h1>Available Hotels</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap', cursor:'pointer'}}>
        {data.map((hotel) => (
          <div key={hotel.id} style={{ margin: '1rem', border: '1px solid #ccc', padding: '1rem' }}>
            <img src={hotel.imageUrl} alt={hotel.name} />
            <h2>{hotel.name}</h2>
            <p>Location: {hotel.location}</p>
            <p>Rating: {hotel.rating}</p>
            <p>Price: ${hotel.pricePerNight} per night</p>
            <button onClick={() => setSelectedHotel(hotel) }     style={{  cursor:'pointer', backgroundColor:'black', color:'white', padding:'3px'}}>Select</button>
           
          </div>
          
        ))}
      </div>
    </div>
  );
};

export default HotelList;
