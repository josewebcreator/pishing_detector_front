import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box, Paper } from '@mui/material';
import Menu from '@/components/Menu';

const Home = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        minHeight: '100vh',
        bgcolor: 'grey.100',
        p: 4,
      }}
    >
      {/* Menú lateral */}
      <Box
        sx={{
          width: 250,
          mr: 4,
        }}
      >
        <Menu />
      </Box>

      {/* Área de contenido */}
      <Paper
        elevation={3}
        sx={{
          flexGrow: 1,
          p: 4,
          borderRadius: 3,
          bgcolor: 'background.paper',
        }}
      >
        <Outlet />
      </Paper>
    </Box>
  );
};

export default Home;