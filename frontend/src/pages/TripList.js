import { useEffect, useState } from "react"; 
import axios from "axios"; 

function TripList({ username }) { 
  const [trips, setTrips] = useState([]); 
  const [editingId, setEditingId] = useState(null); 
  const [form, setForm] = useState({}); 

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/trips/${username}`);
        setTrips(res.data); 
      } catch (error) {
        console.error("Error fetching trips:", error);
      }
    };
    fetchTrips();
  }, [username]); // In case username changes

  const deleteTrip = async (id) => { 
    await axios.delete(`http://localhost:5000/trips/${id}`); 
    // Refetch trips after deletion
    const res = await axios.get(`http://localhost:5000/trips/${username}`);
    setTrips(res.data); 
  }; 

  const startEdit = (trip) => { 
    setEditingId(trip.id); 
    setForm(trip); 
  }; 

  const handleChange = (e) => 
    setForm({ ...form, [e.target.name]: e.target.value }); 

  const saveUpdate = async () => { 
    await axios.put(`http://localhost:5000/trips/${editingId}`, form); 
    setEditingId(null); 
    // Refetch trips after update
    const res = await axios.get(`http://localhost:5000/trips/${username}`);
    setTrips(res.data); 
  }; 

  return (
    <div className="card">
      <h1>{username}'s Trips</h1>
      {trips.map((trip) => (
        <div key={trip.id} className="trip">
          {editingId === trip.id ? (
            <>
              <h4>Trip info</h4>
              <input name="title" value={form.title} onChange={handleChange} />
              <h4>Hotel info</h4>
              <input name="hotel" value={form.hotel} onChange={handleChange} />
              <input name="hotelAddress" value={form.hotelAddress} onChange={handleChange} />
              <input name="checkIn" value={form.checkIn} onChange={handleChange} />
              <input name="checkOut" value={form.checkOut} onChange={handleChange} />
              <input name="hotelContact" value={form.hotelContact} onChange={handleChange} />
              <input name="hotelBudget" value={form.hotelBudget} onChange={handleChange} />
              <h4>restaurant info</h4>
              <input name="restaurant" value={form.restaurant} onChange={handleChange} />
              <input name="restaurantAddress" value={form.restaurantAddress} onChange={handleChange} />
              <input name="foodNotes" value={form.foodNotes} onChange={handleChange} />
              <input name="restaurantBudget" value={form.restaurantBudget} onChange={handleChange} />
              <h4>transport info</h4>
              <input name="transport" value={form.transport} onChange={handleChange} />
              <input name="transportBudget" value={form.transportBudget} onChange={handleChange} />
              <h4>tourist attractions</h4>
              <input name="attractions" value={form.attractions} onChange={handleChange} />
              <input name="attractionNotes" value={form.attractionNotes} onChange={handleChange} />
              <input name="attractionsBudget" value={form.attractionsBudget} onChange={handleChange} />
              <button onClick={saveUpdate}>Save</button>
            </>
          ) : (
            <>
              <h2>{trip.title}</h2>
              <div className="list">
                <h4>Hotel Info</h4>
                <p>Hotel: {trip.hotel},{trip.hotelAddress}</p>
                <p>checkIn : {trip.checkIn}</p>
                <p>checkOut : {trip.checkOut}</p>
                <p>Hotel Contact : {trip.hotelContact}</p>
                <p>Budget : {trip.hotelBudget}</p>
              </div>
              
              <div className="list">
                <h3>Places that you will visit</h3>
                <h4>Restaurant Info</h4>
                <p>Restaurant: {trip.restaurant},{trip.restaurantAddress}</p>
                <p>Budget : {trip.restaurantBudget}</p>
                <div className="list2">
                  <p>Restaurant Notes : {trip.foodNotes}</p>
                </div>
                <h4>Tourist Attraction</h4>
                <p>Tourist Attractions : {trip.attractions}</p>
                <p>Budget : {trip.attractionsBudget}</p>
                <div className="list2">
                  <p>Tourist Attraction Notes : {trip.attractionNotes}</p>
                </div>
              </div>
              
              <div className="list">
                <h4>Mode of Transport</h4>
                <p>Mode of Transport : {trip.transport}</p>
                <p>Transport Budget : {trip.transportBudget}</p>
              </div>

              <p>Total Budget: ₹{trip.totalBudget}</p>
              <button onClick={() => deleteTrip(trip.id)}>Delete</button>
              <button onClick={() => startEdit(trip)}>Update</button>
            </>
          )}
        </div>
      ))}
    </div>
  );
}

export default TripList;


