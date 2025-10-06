import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useForm, Controller } from 'react-hook-form'
import {
  TextField,
  Button,
  Paper,
  Typography,
  Box,
  CircularProgress,
  Stack,
} from '@mui/material'

import api from '../../../plugins/axios'
import { login } from '../../../plugins/redux/slices/authSlice'

const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: { email: '', password: '' },
  })

  const onSubmit = async (data) => {
    setIsLoading(true)
    try {
      const response = await api.post('/auth/login', data)
      const access_token = response.data?.access_token
      if (access_token) {
        localStorage.setItem('access_token', access_token)
        dispatch(login())
        navigate('/')
      } else {
        console.error('Inicio de sesión fallido: API no regresó access_token en la respuesta.')
      }
    } catch (error) {
      console.error('Error durante el inicio de sesión:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        px: 2,
        bgcolor: '#f5f7fb',
      }}
    >
      <Paper
        elevation={12}
        sx={{
          width: '100%',
          maxWidth: 440,
          p: { xs: 4, sm: 5 },
          borderRadius: 3,
          boxShadow: '0 12px 35px rgba(16, 24, 40, 0.08)',
          border: '1px solid #e7e9ee',
          bgcolor: 'white',
        }}
      >
        <Typography
          variant="h4"
          component="h1"
          sx={{ mb: 4, textAlign: 'center', fontWeight: 800, color: '#1f2937' }}
        >
          Acceso
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={3}>
            <Controller
              name="email"
              control={control}
              rules={{
                required: 'El correo electrónico es requerido',
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: 'Formato de correo no válido',
                },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Correo Electrónico"
                  variant="outlined"
                  fullWidth
                  disabled={isLoading}
                  error={!!errors.email}
                  helperText={errors.email ? errors.email.message : ''}
                  InputLabelProps={{ sx: { color: '#6b7280' } }}
                  sx={{
                    '& .MuiOutlinedInput-input': { py: 1.5 }, // aumenta padding interno
                  }}
                />
              )}
            />

            <Controller
              name="password"
              control={control}
              rules={{
                required: 'La contraseña es requerida',
                minLength: {
                  value: 6,
                  message: 'La contraseña debe tener al menos 6 caracteres',
                },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Contraseña"
                  type="password"
                  variant="outlined"
                  fullWidth
                  disabled={isLoading}
                  error={!!errors.password}
                  helperText={errors.password ? errors.password.message : ''}
                  InputLabelProps={{ sx: { color: '#6b7280' } }}
                  sx={{
                    '& .MuiOutlinedInput-input': { py: 1.5 },
                  }}
                />
              )}
            />

            <Button
              type="submit"
              variant="contained"
              size="large"
              disabled={isLoading}
              fullWidth
              sx={{
                py: 1.5,
                fontWeight: 600,
                borderRadius: 2,
                boxShadow: '0 8px 22px rgba(37, 99, 235, 0.25)',
                background: 'linear-gradient(90deg, #2563eb 0%, #4f46e5 100%)',
                '&:hover': {
                  background: 'linear-gradient(90deg, #1d4ed8 0%, #4338ca 100%)',
                  boxShadow: '0 10px 28px rgba(37, 99, 235, 0.35)',
                },
              }}
              startIcon={isLoading && <CircularProgress size={20} color="inherit" />}
            >
              {isLoading ? 'Verificando...' : 'Entrar'}
            </Button>
          </Stack>
        </form>

        <Typography
          variant="caption"
          sx={{ mt: 3, display: 'block', textAlign: 'center', color: '#9ca3af' }}
        >
          Sistema de Autenticación Segura v1.0
        </Typography>
      </Paper>
    </Box>
  )
}

export default Login