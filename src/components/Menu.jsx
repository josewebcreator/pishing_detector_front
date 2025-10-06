// src/components/Menu.jsx
import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
  Divider,
} from '@mui/material';

const Menu = () => {
  const location = useLocation();

  const menuItems = [
    { label: 'Inicio', path: '/' },
    { label: 'Perfil', path: '/profile' },
    { label: 'Configuración', path: '/settings' },
    { label: 'Cerrar sesión', path: '/logout' },
  ];

  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h6" sx={{ mb: 2, color: 'text.primary' }}>
        Menú principal
      </Typography>
      <Divider sx={{ mb: 2 }} />
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.path} disablePadding>
            <ListItemButton
              component={Link}
              to={item.path}
              selected={location.pathname === item.path}
              sx={{
                borderRadius: 2,
                px: 2,
                py: 1,
                mb: 1,
                bgcolor: location.pathname === item.path ? 'primary.light' : 'transparent',
                '&:hover': {
                  bgcolor: 'action.hover',
                },
              }}
            >
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Menu;