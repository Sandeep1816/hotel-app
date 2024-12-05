import { useMutation } from 'react-query';
import axiosInstance from './axiosInstance';
import useStore from './store';

const BookingForm = () => {
  const selectedHotel = useStore((state) => state.selectedHotel);

  const bookingMutation = useMutation((bookingDetails) =>
    axiosInstance.post('/bookings', bookingDetails)
  );

  const handleBooking = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const guestName = formData.get('guestName');
    console.log(guestName)

    bookingMutation.mutate({
      hotelId: selectedHotel.id,
      hotelName: selectedHotel.name,
      guestName,
    });
  };

  if (!selectedHotel) return <div style={{ marginTop:'10px'}} >Select a hotel to book.</div>;

  return (
    <form onSubmit={handleBooking}>
      <h1>Book {selectedHotel.name}</h1>
      <label>
        Guest Name:
        <input type="text" name="guestName" required />
      </label>
      <button type="submit">Book Now</button>
    </form>
  );
};

export default BookingForm;
