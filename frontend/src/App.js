import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import TripForm from "./pages/TripForm";
import TripList from "./pages/TripList";
import { useState } from "react";
import "./App.css";
function App() {
  const [username, setUsername] = useState(localStorage.getItem("username") || "");

  return (
    <div
        style={{
        backgroundImage: `url(${process.env.PUBLIC_URL + "/background.png"})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        minHeight: "100vh",
      }}
    >
    <Router>
      <div className="container">
        <Routes>
          <Route path="/" element={<Login setUsername={setUsername} />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/tripform" element={<TripForm username={username} />} />
          <Route path="/triplist" element={<TripList username={username} />} />
        </Routes>
      </div>
    </Router>
    </div>
  );
}
export default App;
