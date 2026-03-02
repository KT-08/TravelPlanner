const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

const tripsFile = path.join(__dirname, "trips.json");
const usersFile = path.join(__dirname, "users.json");

// Helper functions to read/write JSON files
const loadData = (file) => (fs.existsSync(file) ? JSON.parse(fs.readFileSync(file)) : []);
const saveData = (file, data) => fs.writeFileSync(file, JSON.stringify(data, null, 2));

// ----------------- AUTH ROUTES -----------------
app.post("/signup", (req, res) => {
  const { username, password } = req.body;
  const users = loadData(usersFile);
  if (users.find(u => u.username === username)) {
    return res.status(400).json({ message: "User already exists" });
  }
  users.push({ username, password });
  saveData(usersFile, users);
  res.status(201).json({ message: "Account created" });
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const users = loadData(usersFile);
  const user = users.find(u => u.username === username && u.password === password);
  if (user) res.json({ message: "Login successful" });
  else res.status(401).json({ message: "Invalid credentials" });
});

// ----------------- TRIP ROUTES -----------------
app.get("/trips/:username", (req, res) => {
  const trips = loadData(tripsFile);
  const userTrips = trips.filter(trip => trip.username === req.params.username);
  res.json(userTrips);
});

app.post("/trips", (req, res) => {
  const { username, ...tripData } = req.body;
  const trips = loadData(tripsFile);
  const newTrip = { ...tripData, id: Date.now(), username };
  newTrip.totalBudget = calculateTotalBudget(newTrip);
  trips.push(newTrip);
  saveData(tripsFile, trips);
  res.status(201).json(newTrip);
});

app.put("/trips/:id", (req, res) => {
  const trips = loadData(tripsFile);
  const id = Number(req.params.id);
  const index = trips.findIndex(t => t.id === id);
  if (index !== -1) {
    trips[index] = { ...req.body, id, totalBudget: calculateTotalBudget(req.body) };
    saveData(tripsFile, trips);
    res.json(trips[index]);
  } else {
    res.status(404).json({ message: "Trip not found" });
  }
});

app.delete("/trips/:id", (req, res) => {
  const trips = loadData(tripsFile).filter(t => t.id !== Number(req.params.id));
  saveData(tripsFile, trips);
  res.json({ message: "Trip deleted" });
});

// ----------------- HELPER FUNCTION -----------------
function calculateTotalBudget(trip) {
  return (
    Number(trip.hotelBudget || 0) +
    Number(trip.restaurantBudget || 0) +
    Number(trip.transportBudget || 0) +
    Number(trip.attractionsBudget || 0)
  );
}

// ----------------- START SERVER -----------------
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));