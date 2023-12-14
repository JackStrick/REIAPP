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

function BuyWholesaleForm({ formData, onChange}) {
  const theme = useTheme();

  const handleInputChange = (e) => {
    // Update the specific field in formData when the input changes
    const { name, value } = e.target;
    onChange((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

    const formatDollarValue = (value) => {
        return value.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
        });
    };

  return (
    <Box sx={{marginTop: 2}}>
      {/* Title */}
      <Typography variant="h4" sx={{ color: theme.palette.primary.main, fontWeight: 'bold' }}>
        Purchase Assumptions
      </Typography>
      {/* Colored Bar */}
      <Divider sx={{ backgroundColor: theme.palette.primary.main, height: 3, marginY: 2 }} />

      {/* Form Items */}
      <FormControl fullWidth sx={{ marginBottom: 2 }}>
        <TextField
          label="After Repair Value (ARV)"
          type="number"
          name='arv'
          value={formData.arv}
          onChange={handleInputChange}
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
          }}
        />
      </FormControl>

      {/* Subheading */}
      <Typography variant="h5" sx={{ marginBottom: 2 }}>
        Buyer's Estimated Expenses
      </Typography>

      <FormControl fullWidth sx={{ marginBottom: 2 }}>
        <TextField
          label="Estimated Repair Costs"
          type="number"
          name='repairCost'
          value={formData.repairCost}
          onChange={handleInputChange}
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
          }}
        />
      </FormControl>

      <FormControl fullWidth sx={{ marginBottom: 2 }}>
        <TextField
          label="Hedge Expense"
          type="number"
          name='hedgeExpense'
          value={formData.hedgeExpense}
          onChange={handleInputChange}
          InputProps={{
            startAdornment: <InputAdornment position="start">%</InputAdornment>,
          }}
        />
      </FormControl>

      <FormControl fullWidth sx={{ marginBottom: 2 }}>
        <TextField
          label="Closing Costs"
          type="number"
          name='closingCost'
          value={formData.closingCost}
          onChange={handleInputChange}
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
          }}
        />
      </FormControl>

      <FormControl fullWidth sx={{ marginBottom: 2 }}>
        <TextField 
          label="Monthly Holding Costs" 
          type="number"
          name='monthlyHoldingCost'
          value={formData.monthlyHoldingCost}
          onChange={handleInputChange}
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
          }}
        />
      </FormControl>

      <FormControl fullWidth sx={{ marginBottom: 2 }}>
        <TextField 
          label="Repair Period" 
          type="number"
          name='repairPeriod'
          value={formData.repairPeriod}
          onChange={handleInputChange}
          InputProps={{
            startAdornment: <InputAdornment position="start">#</InputAdornment>,
            endAdornment: <InputAdornment position="end">months</InputAdornment>,
          }}
        />
      </FormControl>

      <FormControl fullWidth sx={{ marginBottom: 2 }}>
        <TextField 
          label="Marketing Costs" 
          type="number"
          name='marketingCost'
          value={formData.marketingCost}
          onChange={handleInputChange}
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
          }}
        />
      </FormControl>

      <FormControl fullWidth sx={{ marginBottom: 2 }}>
        <TextField 
          label="Selling Costs" 
          type="number"
          name='sellingCost'
          value={formData.sellerCost}
          onChange={handleInputChange}
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
          }}
        />
      </FormControl>
    </Box>
  );
}

export default BuyWholesaleForm;
