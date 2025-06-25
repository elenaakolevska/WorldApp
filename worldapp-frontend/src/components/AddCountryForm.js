import React, { useState } from "react";
import { Box, Button, TextField, Typography, Paper } from "@mui/material";


function AddCountryForm({ onAdd }) {
  const [name, setName] = useState("");
  const [capital, setCapital] = useState("");
  const [population, setPopulation] = useState("");
  const [area, setArea] = useState("");
  const [language, setLanguage] = useState("");
  const [message, setMessage] = useState("");

  return (
    <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
      <Typography variant="h6" gutterBottom>Add a Country</Typography>
      <Box
        component="form"
        onSubmit={e => {
          e.preventDefault();
          onAdd(name, capital, population, area, language, setMessage, () => {
            setName(""); setCapital(""); setPopulation(""); setArea(""); setLanguage("");
          });
        }}
        display="flex"
        flexDirection="column"
        gap={2}
      >
        <TextField
          label="Name"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />
        <TextField
          label="Capital"
          value={capital}
          onChange={e => setCapital(e.target.value)}
          required
        />
        <TextField
          label="Population"
          type="number"
          value={population}
          onChange={e => setPopulation(e.target.value)}
          required
        />
        <TextField
          label="Area (km²)"
          type="number"
          value={area}
          onChange={e => setArea(e.target.value)}
          required
        />
        <TextField
          label="Official Language"
          value={language}
          onChange={e => setLanguage(e.target.value)}
          required
        />
        <Button type="submit" variant="contained" color="primary">
          Add Country
        </Button>
        <Typography color="success.main">{message}</Typography>
      </Box>
    </Paper>
  );
}

export default AddCountryForm;