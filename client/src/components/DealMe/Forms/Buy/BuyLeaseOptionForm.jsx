import React from 'react';
import {
  Box,
  Divider,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';

function LeaseOptionForm() {
  const theme = useTheme();

  return (
    <Box sx={{marginTop: 1}}>
      {/* Title */}
      <Typography variant="h4" sx={{ color: theme.palette.primary.main, fontWeight: 'bold' }}>
        Purchase Assumptions
      </Typography>
      {/* Colored Bar */}
      <Divider sx={{ backgroundColor: theme.palette.primary.main, height: 3, marginY: 2 }} />

      {/* Subheading */}
      <Typography variant="h5" sx={{ marginBottom: 2 }}>
        Offer Numbers
      </Typography>

      {/* Form Items */}
      <FormControl fullWidth sx={{ marginBottom: 2 }}>
        <TextField
          label="Sales Price"
          type="number"
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
          }}
        />
      </FormControl>

      <FormControl fullWidth sx={{ marginBottom: 2 }}>
        <TextField
          label="Option Payment"
          type="number"
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
          }}
        />
      </FormControl>

      <FormControl fullWidth sx={{ marginBottom: 2 }}>
        <TextField
          label="Monthly Rental Payment"
          type="number"
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
          }}
        />
      </FormControl>

      <FormControl fullWidth sx={{ marginBottom: 2 }}>
        <TextField
          label="Monthly Credit (Optional)"
          type="number"
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
          }}
        />
      </FormControl>

      <FormControl fullWidth sx={{ marginBottom: 2 }}>
        <TextField label="Lease Option Term (# Months)" type="number" />
      </FormControl>
    </Box>
  );
}

export default LeaseOptionForm;
