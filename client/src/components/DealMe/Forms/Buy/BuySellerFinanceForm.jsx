import React from 'react';
import {
  Box,
  Divider,
  FormControl,
  InputAdornment,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';

/**
 * BuySellerFinanceForm Component
 * 
 * A React component representing a form for entering purchase assumptions,
 * including financing details related to buying a property with seller financing.
 * 
 * @component
 * @props {Object} formData - The form data object containing purchase and financing assumptions.
 * @props {Function} onChange - Callback function triggered on input changes.
 * 
 * @description
 * The component includes sections for basic numbers, repair costs, other costs, and financing details.
 * It provides input fields for various financial parameters such as ARV, purchase price, repair costs,
 * monthly expenses, and seller financing details like loan amount, down payment, interest rate, etc.
 * 
 * Note: The component includes utility functions to format dollar values and calculate loan monthly payments.
 * 
 * @see formatDollarValue - Utility function to format a numeric value as a currency string.
 * @see getLoanPayment - Utility function to calculate the monthly loan payment based on financing details.
 */
function BuySellerFinanceForm({ formData, onChange}) {
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
        value = parseFloat(value) || 0;
        return value.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
        });
    };

    const getLoanPayment = () => {
        const loanAmount = parseFloat(formData.loanAmount) || 0;
        const downPayment = parseFloat(formData.downPayment) || 0;  
        const interestRate = parseFloat(formData.interestRate) || 0;
        const amortizationTerm = parseFloat(formData.amortizationTerm) || 0;
        const monthlyInterestRate = interestRate / 1200;
        const monthlyPayment = (loanAmount - downPayment) * (monthlyInterestRate / (1 - Math.pow(1 / (1 + monthlyInterestRate), amortizationTerm * 12)));
        formData.monthlyPayment = monthlyPayment;
        return monthlyPayment;
    };

  return (
    <Box sx={{marginTop: 2}}>
        {/* Title */}
        <Typography variant="h4" sx={{ color: theme.palette.primary.main, fontWeight: 'bold' }}>
            Purchase Assumptions
        </Typography>
        {/* Colored Bar */}
        <Divider sx={{ backgroundColor: theme.palette.primary.main, height: 3, marginY: 2 }} />

        {/* Subheading */}
        <Typography variant="h5" sx={{ marginBottom: 2 }}>
            Basic Numbers
        </Typography>

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
        <FormControl fullWidth sx={{ marginBottom: 2 }}>
            <TextField
            label="Esitmated Purchase Price"
            type="number"
            name='estPurchasePrice'
            value={formData.estPurchasePrice}
            onChange={handleInputChange}
            InputProps={{
                startAdornment: <InputAdornment position="start">$</InputAdornment>,
            }}
            />
        </FormControl>
        <FormControl fullWidth sx={{ marginBottom: 2 }}>
            <TextField 
            label="Property Square Footage" 
            type="number"
            name='propSqft'
            value={formData.propSqft}
            onChange={handleInputChange}
            InputProps={{
                startAdornment: <InputAdornment position="start">#</InputAdornment>,
            }}
            />
        </FormControl>
        <FormControl fullWidth sx={{ marginBottom: 0 }}>
            <Grid container >
                <Grid item xs={6} position="end">
                    <Typography position="end" variant="h5" align="left" sx={{ marginBottom: 2 }}>Cost Per Square Foot</Typography>   
                </Grid>
                <Grid item xs={6}>    
                    <Typography position="end" variant="h5" align="right" sx={{ marginBottom: 2 }}>{formatDollarValue(formData.estPurchasePrice / formData.propSqft) || 0}</Typography>
                </Grid>
            </Grid>
        </FormControl>



        {/* Subheading */}
        <Typography variant="h5" sx={{ marginBottom: 2 }}>
            Repair Cost
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
        

        {/* Subheading */}
        <Typography variant="h5" sx={{ marginBottom: 2 }}>
            Other Cost
        </Typography>

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
            label="Property Insurance"
            type="number"
            name='propertyInsurance'
            value={formData.propertyInsurance}
            onChange={handleInputChange}
            InputProps={{
                startAdornment: <InputAdornment position="start">$</InputAdornment>,
                endAdornment: <InputAdornment position="end">/mo</InputAdornment>,
            }}
            />
        </FormControl>
        <FormControl fullWidth sx={{ marginBottom: 2 }}>
            <TextField
            label="Property Tax"
            type="number"
            name='propertyTax'
            value={formData.propertyTax}
            onChange={handleInputChange}
            InputProps={{
                startAdornment: <InputAdornment position="start">$</InputAdornment>,
                endAdornment: <InputAdornment position="end">/mo</InputAdornment>,
            }}
            />
        </FormControl>
        <FormControl fullWidth sx={{ marginBottom: 2 }}>
            <TextField
            label="HOA Dues"
            type="number"
            name='hoa'
            value={formData.hoa}
            onChange={handleInputChange}
            InputProps={{
                startAdornment: <InputAdornment position="start">$</InputAdornment>,
                endAdornment: <InputAdornment position="end">/mo</InputAdornment>,
            }}
            />
        </FormControl>

        {/* Subheading */}
        <Typography variant="h5" sx={{ marginBottom: 2 }}>
            Financing
        </Typography>

        <FormControl fullWidth sx={{ marginBottom: 2 }}>
            <TextField
            label="Loan Amount"
            type="number"
            name='loanAmount'
            value={formData.loanAmount}
            onChange={handleInputChange}
            InputProps={{
                startAdornment: <InputAdornment position="start">$</InputAdornment>,
                //endAdornment: <InputAdornment position="end">/mo</InputAdornment>,
            }}
            />
        </FormControl>
        <FormControl fullWidth sx={{ marginBottom: 2 }}>
            <TextField
            label="Down Payment"
            type="number"
            name='downPayment'
            value={formData.downPayment}
            onChange={handleInputChange}
            InputProps={{
                startAdornment: <InputAdornment position="start">$</InputAdornment>,
                //endAdornment: <InputAdornment position="end">/mo</InputAdornment>,
            }}
            />
        </FormControl>
        <FormControl fullWidth sx={{ marginBottom: 2 }}>
            <TextField
            label="Interest Rate"
            type="number"
            name='interestRate'
            value={formData.interestRate}
            onChange={handleInputChange}
            InputProps={{
                startAdornment: <InputAdornment position="start">%</InputAdornment>,
                endAdornment: <InputAdornment position="end">%</InputAdornment>,
            }}
            />
        </FormControl>
        <FormControl fullWidth sx={{ marginBottom: 2 }}>
            <TextField
            label="Amortization Term"
            type="number"
            name='amortizationTerm'
            value={formData.amortizationTerm}
            onChange={handleInputChange}
            InputProps={{
                endAdornment: <InputAdornment position="end">years</InputAdornment>,
            }}
            />
        </FormControl>
        <FormControl fullWidth sx={{ marginBottom: 2 }}>
            <TextField
            label="Loan Balloon Term"
            type="number"
            name='ballonTerm'
            value={formData.ballonTerm}
            onChange={handleInputChange}
            InputProps={{
                endAdornment: <InputAdornment position="end">years</InputAdornment>,
            }}
            />
        </FormControl>
        <FormControl fullWidth sx={{ marginBottom: 0 }}>
            <Grid container >
                <Grid item xs={6} position="end">
                    <Typography position="end" variant="h5" align="left" sx={{ marginBottom: 2 }}>Loan Monthly Payment</Typography>   
                </Grid>
                <Grid item xs={6}>    
                    <Typography position="end" variant="h5" align="right" sx={{ marginBottom: 2 }}>{formatDollarValue(getLoanPayment()) || 0}</Typography>
                </Grid>
            </Grid>
        </FormControl>

    </Box>
  );
}

export default BuySellerFinanceForm;
