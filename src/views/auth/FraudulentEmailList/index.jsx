import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  CircularProgress,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@mui/material';
import api from '@/plugins/axios'; // tu instancia con el token configurado

const FraudulentEmailList = () => {
  const [emails, setEmails] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEmails = async () => {
      try {
        const response = await api.get('/emails/');
        setEmails(response.data);
      } catch (error) {
        console.error('Error al obtener correos fraudulentos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEmails();
  }, []);

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h5" gutterBottom>
        Correos fraudulentos detectados
      </Typography>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Paper elevation={3} sx={{ mt: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Message Id</TableCell>
                <TableCell>Remitente</TableCell>
                <TableCell>Asunto</TableCell>
                <TableCell>Score</TableCell>
                <TableCell>Phishing</TableCell>
                <TableCell>Detectado</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {emails.map((email) => (
                <TableRow key={email.email_id}>
                  <TableCell>{email.email_id}</TableCell>
                  <TableCell>{email.sender_email}</TableCell>
                  <TableCell>{email.subject}</TableCell>
                  <TableCell>{email.phishing_score ?? '—'}</TableCell>
                  <TableCell>{email.is_phishing ? 'Sí' : 'No'}</TableCell>
                  <TableCell>{new Date(email.detected_at).toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      )}
    </Box>
  );
};

export default FraudulentEmailList;