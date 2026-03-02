import { useState } from "react"; 
import axios from "axios"; 
import { useNavigate } from "react-router-dom"; 

function TripForm({ username }) { 
    const [trip, setTrip] = useState({ 
        title: "", hotel: "", hotelAddress: "", checkIn: "", checkOut: "", hotelContact: "", hotelBudget: "", 
        restaurant: "", restaurantAddress: "", foodNotes: "", restaurantBudget: "", 
        transport: "", transportBudget: "", 
        attractions: "", attractionNotes: "", attractionsBudget: "" 
    }); 
    const navigate = useNavigate(); 

    const handleChange = (e) => setTrip({ ...trip, [e.target.name]: e.target.value }); 

    const handleSubmit = async (e) => { 
        e.preventDefault(); 
        await axios.post("http://localhost:5000/trips", { ...trip, username }); // Include username in the request
        alert("Trip added"); 
        setTrip({ 
            title: "", hotel: "", hotelAddress: "", checkIn: "", checkOut: "", hotelContact: "", hotelBudget: "", 
            restaurant: "", restaurantAddress: "", foodNotes: "", restaurantBudget: "", 
            transport: "", transportBudget: "", 
            attractions: "", attractionNotes: "", attractionsBudget: "" 
        }); 
    }; 

    return ( 
        <div className="card"> 
            <h2>Welcome, {username}</h2> 
            <form onSubmit={handleSubmit}> 
                <h3>Trip Info</h3> 
                <input name="title" placeholder="Trip Title" onChange={handleChange} value={trip.title} required /> 
                <h4>Hotel Info</h4> 
                <input name="hotel" placeholder="Hotel Name" onChange={handleChange} value={trip.hotel} /> 
                <input name="hotelAddress" placeholder="Hotel Address" onChange={handleChange} value={trip.hotelAddress} /> 
                <input type="date" name="checkIn" onChange={handleChange} value={trip.checkIn} /> 
                <input type="date" name="checkOut" onChange={handleChange} value={trip.checkOut} /> 
                <input name="hotelContact" placeholder="Hotel Contact" onChange={handleChange} value={trip.hotelContact} /> 
                <input name="hotelBudget" placeholder="Hotel Budget" onChange={handleChange} value={trip.hotelBudget} /> 
                <h4>Restaurant Info</h4> 
                <input name="restaurant" placeholder="Restaurant Name" onChange={handleChange} value={trip.restaurant} /> 
                <input name="restaurantAddress" placeholder="Restaurant Address" onChange={handleChange} value={trip.restaurantAddress} /> 
                <input name="foodNotes" placeholder="Food Notes" onChange={handleChange} value={trip.foodNotes} /> 
                <input name="restaurantBudget" placeholder="Restaurant Budget" onChange={handleChange} value={trip.restaurantBudget} /> 
                <h4>Transport</h4> 
                <input name="transport" placeholder="Transport Mode" onChange={handleChange} value={trip.transport} /> 
                <input name="transportBudget" placeholder="Transport Budget" onChange={handleChange} value={trip.transportBudget} /> 
                <h4>Tourist attractions</h4> 
                <input name="attractions" placeholder="Places to Visit" onChange={handleChange} value={trip.attractions} /> 
                <input name="attractionNotes" placeholder="Notes" onChange={handleChange} value={trip.attractionNotes} /> 
                <input name="attractionsBudget" placeholder="Attractions Budget" onChange={handleChange} value={trip.attractionsBudget} /> 
                <button type="submit">Add Trip</button> 
            </form> 
            <p> 
                <button onClick={() => navigate("/triplist")}>View Trips</button> 
            </p> 
        </div> 
    ); 
} 

export default TripForm;
