import React, { useState } from "react";
import {
  Box, Card, CardContent, Typography, Button, TextField, CardActions
} from "@mui/material";

function CountryList({ countries, currentUser, onEdit, onDelete }) {
  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState("");
  const [editCapital, setEditCapital] = useState("");
  const [editPopulation, setEditPopulation] = useState("");
  const [editArea, setEditArea] = useState("");
  const [editLanguage, setEditLanguage] = useState("");
  const [editMessage, setEditMessage] = useState("");

  const startEdit = (country) => {
    setEditId(country._id);
    setEditName(country.name);
    setEditCapital(country.capital);
    setEditPopulation(country.population);
    setEditArea(country.area);
    setEditLanguage(country.language);
    setEditMessage("");
  };

  const handleEdit = (e, id) => {
    e.preventDefault();
    onEdit(id, editName, editCapital, editPopulation, editArea, editLanguage, setEditMessage, () => setEditId(null));
  };

  return (
    <Box display="flex" flexWrap="wrap" gap={3}>
      {countries.length === 0 && (
        <Typography>No countries yet.</Typography>
      )}
      {countries.map(country => (
        <Card key={country._id} sx={{ width: 320, p: 1, position: "relative" }}>
          {editId === country._id ? (
            <Box component="form" onSubmit={e => handleEdit(e, country._id)} sx={{ p: 2, display: "flex", flexDirection: "column", gap: 1 }}>
              <TextField value={editName} onChange={e => setEditName(e.target.value)} label="Name" required />
              <TextField value={editCapital} onChange={e => setEditCapital(e.target.value)} label="Capital" required />
              <TextField value={editPopulation} onChange={e => setEditPopulation(e.target.value)} label="Population" type="number" required />
              <TextField value={editArea} onChange={e => setEditArea(e.target.value)} label="Area (km²)" type="number" required />
              <TextField value={editLanguage} onChange={e => setEditLanguage(e.target.value)} label="Language" required />
              <Box display="flex" gap={1}>
                <Button type="submit" variant="contained" color="success">Save</Button>
                <Button type="button" variant="outlined" onClick={() => setEditId(null)}>Cancel</Button>
              </Box>
              <Typography color="success.main">{editMessage}</Typography>
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
              <CardActions>
                <Button size="small" onClick={() => startEdit(country)}>Edit</Button>
                <Button size="small" color="error" onClick={() => onDelete(country._id)}>Delete</Button>
              </CardActions>
            </>
          )}
        </Card>
      ))}
    </Box>
  );
}

export default CountryList;