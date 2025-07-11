import React, { useState } from "react";
import { Box, Button, TextField, Typography, Paper } from "@mui/material";


function AuthPanel({ currentUser, onRegister, onLogin, onLogout }) {
  const [registerUsername, setRegisterUsername] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [message, setMessage] = useState("");

  return (
    <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
      {currentUser ? (
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Typography variant="body1">
            Logged in as <b>{currentUser}</b>
          </Typography>
          <Button variant="outlined" color="secondary" onClick={onLogout}>
            Logout
          </Button>
        </Box>
      ) : (
        <Box display="flex" gap={3}>
          {/* Register */}
          <Box
            component="form"
            onSubmit={e => {
              e.preventDefault();
              onRegister(registerUsername, registerPassword, setMessage);
            }}
            sx={{ minWidth: 220 }}
          >
            <Typography variant="h6">Register</Typography>
            <TextField
              label="Username"
              value={registerUsername}
              onChange={e => setRegisterUsername(e.target.value)}
              margin="dense"
              fullWidth
            />
            <TextField
              label="Password"
              type="password"
              value={registerPassword}
              onChange={e => setRegisterPassword(e.target.value)}
              margin="dense"
              fullWidth
            />
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Register
            </Button>
          </Box>
          {/* Login */}
          <Box
            component="form"
            onSubmit={e => {
              e.preventDefault();
              onLogin(loginUsername, loginPassword, setMessage);
            }}
            sx={{ minWidth: 220 }}
          >
            <Typography variant="h6">Login</Typography>
            <TextField
              label="Username"
              value={loginUsername}
              onChange={e => setLoginUsername(e.target.value)}
              margin="dense"
              fullWidth
            />
            <TextField
              label="Password"
              type="password"
              value={loginPassword}
              onChange={e => setLoginPassword(e.target.value)}
              margin="dense"
              fullWidth
            />
            <Button type="submit" variant="contained" color="success" fullWidth>
              Login
            </Button>
          </Box>
          <Box minWidth={140} display="flex" alignItems="center">
            <Typography color="error">{message}</Typography>
          </Box>
        </Box>
      )}
    </Paper>
  );
}

export default AuthPanel;