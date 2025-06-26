import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CountriesList from "./pages/CountriesList";
import API from "./Api";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    API.get("/api/me")
      .then(res => setCurrentUser(res.data.username))
      .catch(() => setCurrentUser(null));
    fetchCountries().catch(() => {});
  }, []);

  const fetchCountries = async () => {
    try {
      const res = await API.get("/api/countries");
      setCountries(res.data);
    } catch {
      setCountries([]);
    }
  };

  const handleLogout = async () => {
    await API.post("/api/logout");
    setCurrentUser(null);
  };


  const handleAddCountry = (name, capital, population, area, language, setMsg, resetForm) => {
    if (!name || !capital || !population || !area || !language) {
      setMsg("All fields are required");
      return;
    }
    API.post("/api/countries", {
      name,
      capital,
      population: Number(population),
      area: Number(area),
      language,
    })
      .then(() => {
        setMsg("Country added!");
        resetForm();
        return fetchCountries();
      })
      .catch(err => {
        setMsg(err.response?.data?.error || "Error adding country");
      });
  };

  const handleEditCountry = (id, name, capital, population, area, language, setMsg, closeEdit) => {
    if (!name || !capital || !population || !area || !language) {
      setMsg("All fields are required");
      return;
    }
    API.put(`/api/countries/${id}`, {
      name,
      capital,
      population: Number(population),
      area: Number(area),
      language,
    })
      .then(() => {
        setMsg("Country updated!");
        closeEdit();
        return fetchCountries();
      })
      .catch(err => {
        setMsg(err.response?.data?.error || "Error updating country");
      });
  };

  const handleDeleteCountry = (id) => {
    if (!window.confirm("Delete this country?")) return;
    API.delete(`/api/countries/${id}`)
      .then(() => {
        return fetchCountries();
      })
      .catch(err => {
        alert(err.response?.data?.error || "Error deleting country");
      });
  };

  return (
    <Router>
      <Navbar user={currentUser} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Home user={currentUser} />} />
        <Route path="/login" element={currentUser ? <Navigate to="/" /> : <Login setUser={setCurrentUser} />} />
        <Route path="/register" element={currentUser ? <Navigate to="/" /> : <Register />} />
        <Route
          path="/countries"
          element={
            <CountriesList
              countries={countries}
              user={currentUser}
              onAdd={handleAddCountry}
              onEdit={handleEditCountry}
              onDelete={handleDeleteCountry}
            />
          }
        />

      </Routes>
    </Router>
  );
}

export default App;