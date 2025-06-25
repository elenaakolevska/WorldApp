import React, { useState } from "react";
import { Container, Typography, Box, Button, Card, CardContent, CardActions, TextField, Paper } from "@mui/material";

function CountriesList({ countries, user, onAdd, onEdit, onDelete }) {
  const [adding, setAdding] = useState(false);

  // For adding new country
  const [name, setName] = useState("");
  const [capital, setCapital] = useState("");
  const [population, setPopulation] = useState("");
  const [area, setArea] = useState("");
  const [language, setLanguage] = useState("");
  const [addMsg, setAddMsg] = useState("");

  // For editing country
  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState("");
  const [editCapital, setEditCapital] = useState("");
  const [editPopulation, setEditPopulation] = useState("");
  const [editArea, setEditArea] = useState("");
  const [editLanguage, setEditLanguage] = useState("");
  const [editMsg, setEditMsg] = useState("");

  const handleAddCountry = async (e) => {
    e.preventDefault();
    setAddMsg("");
    if (!name || !capital || !population || !area || !language) {
      setAddMsg("All fields are required");
      return;
    }
    try {
      await onAdd(name, capital, population, area, language, setAddMsg, () => {
        setName(""); setCapital(""); setPopulation(""); setArea(""); setLanguage("");
        setAdding(false);
      });
    } catch (err) {
      setAddMsg("Error adding country");
    }
  };

  const openEdit = (c) => {
    setEditId(c._id);
    setEditName(c.name);
    setEditCapital(c.capital);
    setEditPopulation(c.population);
    setEditArea(c.area);
    setEditLanguage(c.language);
    setEditMsg("");
  };

  const handleEditCountry = async (e) => {
    e.preventDefault();
    setEditMsg("");
    if (!editName || !editCapital || !editPopulation || !editArea || !editLanguage) {
      setEditMsg("All fields are required");
      return;
    }
    try {
      await onEdit(
        editId,
        editName,
        editCapital,
        editPopulation,
        editArea,
        editLanguage,
        setEditMsg,
        () => setEditId(null)
      );
    } catch (err) {
      setEditMsg("Error updating country");
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 6 }}>
      <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
        <Typography variant="h4">All Countries</Typography>
        {user && (
          <Button variant="contained" color="success" onClick={() => setAdding(a => !a)}>
            {adding ? "Cancel" : "Add Country"}
          </Button>
        )}
      </Box>
      {adding && (
        <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
          <Typography variant="h6" gutterBottom>Add a Country</Typography>
          <Box component="form" onSubmit={handleAddCountry} display="flex" flexDirection="column" gap={2}>
            <TextField label="Name" value={name} onChange={e => setName(e.target.value)} required />
            <TextField label="Capital" value={capital} onChange={e => setCapital(e.target.value)} required />
            <TextField label="Population" value={population} onChange={e => setPopulation(e.target.value)} required type="number" />
            <TextField label="Area (km²)" value={area} onChange={e => setArea(e.target.value)} required type="number" />
            <TextField label="Language" value={language} onChange={e => setLanguage(e.target.value)} required />
            <Button type="submit" variant="contained" color="primary">Add Country</Button>
            <Typography color={addMsg.startsWith("Country added") ? "success.main" : "error"}>{addMsg}</Typography>
          </Box>
        </Paper>
      )}
      <Box display="flex" flexWrap="wrap" gap={3}>
        {countries.length === 0 && <Typography>No countries yet.</Typography>}
        {countries.map(country => (
          <Card key={country._id} sx={{ width: 320, p: 1, position: "relative" }}>
            {editId === country._id ? (
              <Box component="form" onSubmit={handleEditCountry} sx={{ p: 2, display: "flex", flexDirection: "column", gap: 1 }}>
                <TextField value={editName} onChange={e => setEditName(e.target.value)} label="Name" required />
                <TextField value={editCapital} onChange={e => setEditCapital(e.target.value)} label="Capital" required />
                <TextField value={editPopulation} onChange={e => setEditPopulation(e.target.value)} label="Population" type="number" required />
                <TextField value={editArea} onChange={e => setEditArea(e.target.value)} label="Area (km²)" type="number" required />
                <TextField value={editLanguage} onChange={e => setEditLanguage(e.target.value)} label="Language" required />
                <Box display="flex" gap={1}>
                  <Button type="submit" variant="contained" color="success">Save</Button>
                  <Button type="button" variant="outlined" onClick={() => setEditId(null)}>Cancel</Button>
                </Box>
                <Typography color="success.main">{editMsg}</Typography>
              </Box>
            ) : (
              <>
                <CardContent>
                  <Typography variant="h6">{country.name}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    <b>Capital:</b> {country.capital}<br />
                    <b>Population:</b> {country.population}<br />
                    <b>Area (km²):</b> {country.area}<br />
                    <b>Language:</b> {country.language}
                  </Typography>
                </CardContent>
                {user && (
                  <CardActions>
                    <Button size="small" onClick={() => openEdit(country)}>Edit</Button>
                    <Button size="small" color="error" onClick={() => onDelete(country._id)}>Delete</Button>
                  </CardActions>
                )}
              </>
            )}
          </Card>
        ))}
      </Box>
    </Container>
  );
}

export default CountriesList;