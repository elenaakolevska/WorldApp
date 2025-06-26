import React from "react";
import { Container, Typography, Box, Button } from "@mui/material";
import { Link } from "react-router-dom";

function Home({ user }) {
  return (
    <Container maxWidth="md" sx={{ mt: 6 }}>
      <Box textAlign="center">
        <Typography variant="h3" gutterBottom sx={{ fontWeight: 700 }}>
          🌍 CountryManager
        </Typography>
        <Typography variant="h6" color="text.secondary" paragraph>
          Discover, add, and manage information about countries of the world. Organize your knowledge and explore global diversity!
        </Typography>
        <Box mt={4}>
          <Button
            component={Link}
            to="/countries"
            variant="contained"
            color="primary"
            size="large"
            sx={{ mr: 2, px: 4 }}
          >
            Browse Countries
          </Button>
          {!user && (
            <Button
              component={Link}
              to="/register"
              variant="outlined"
              color="secondary"
              size="large"
              sx={{ px: 4 }}
            >
              Get Started
            </Button>
          )}
        </Box>
      </Box>
    </Container>
  );
}

export default Home;