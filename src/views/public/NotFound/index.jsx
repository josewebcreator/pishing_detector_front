import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'grey.100',
        textAlign: 'center',
        px: 2,
      }}
    >
      <Typography variant="h1" color="primary" gutterBottom>
        404
      </Typography>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Página no encontrada
      </Typography>
      <Typography variant="body1" sx={{ mb: 4 }}>
        Lo sentimos, la página que estás buscando no existe o fue movida.
      </Typography>
      <Button variant="contained" color="primary" onClick={() => navigate('/')}>
        Volver al inicio
      </Button>
    </Box>
  );
};

export default NotFound;