import React from 'react'
import {
    Box,
    Divider,
    FormControl,
    InputAdornment,
    TextField,
    Typography,
    Grid,
    useTheme,
  } from '@mui/material';

function PurchaseRentForm({ formData }) {
  const theme = useTheme();
  const [sellerFormState, setSellerFormState] = React.useState({
      monthlyOperating: 0,
      percentVacant: 0,
      monthlyOpCost: 0,
  });
 

  const handleInputChange = (event) => {
      const { name, value } = event.target;
      setSellerFormState((prevFormState) => ({
          ...prevFormState,
          [name]: parseFloat(value),
      }));
  };
  
  const formatDollarValue = (value) => {
    if (value === '') {
      return '$0.00';
    }
    value = parseFloat(value) || 0;
    return value.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    });
  };
  
  const getMonthlySideCost = () => {
    const numPropInsurance = parseFloat(formData.propertyInsurance) || 0;
    const numPropertyTaxes = parseFloat(formData.propertyTax) || 0;
    const numHOA = parseFloat(formData.hoa) || 0;
    return numPropInsurance + numPropertyTaxes + numHOA;
  };

  const netOpIncome = () => {
    const numMonthlyOperating = parseFloat(sellerFormState.monthlyOperating) || 0;
    const numPercentVacant = parseFloat(sellerFormState.percentVacant) || 0;
    const numMonthlyOpCost = parseFloat(sellerFormState.monthlyOpCost) || 0;
    return numMonthlyOperating - ((numMonthlyOperating * (numPercentVacant / 100)) + numMonthlyOpCost + getMonthlySideCost());
  };

  const getRepairCost = () => {
      const numRepairCost = parseFloat(formData.repairCost) || 0;
      const numHedgeExpense = parseFloat(formData.hedgeExpense) || 0;
      return numRepairCost + numRepairCost * (numHedgeExpense / 100);

  };

  const getAllCost = () => {
      const repair = getRepairCost();
      const other = getOtherCosts();
      const purch  = parseFloat(formData.estPurchasePrice) || 0;

      return repair + other + purch;
  };

  const getHoldingTime = () => {
      const numRepairPeriod = parseFloat(formData.repairPeriod) || 0;
      //const numMonthsToSell = parseFloat(sellerFormState.monthsToSell) || 0;
      return numRepairPeriod;
  };
  
  const getOtherCosts = () => { 
    const numHoldingTime = getHoldingTime();
    const numMonthlyHoldingCost = parseFloat(formData.monthlyHoldingCost) || 0;
    const numClosingCost = parseFloat(formData.closingCost) || 0;
    const numPropInsurance = parseFloat(formData.propertyInsurance) || 0;
    const numPropertyTaxes = parseFloat(formData.propertyTax) || 0;
    const numHOA = parseFloat(formData.hoa) || 0;


    return (
      numHoldingTime * numMonthlyHoldingCost +
      numClosingCost +
      (numHoldingTime * numPropInsurance) +
      (numHoldingTime * numPropertyTaxes) +
      (numHoldingTime * numHOA)
    );
  };

  const getCashOnCash = () => {
    const cash = getAllCost()
    const profit = netOpIncome() * 12;

    return (profit / cash) * 100;
  };


  return (
      <Box sx={{marginTop: 2}}>
          {/* Title */}
          <Typography variant="h4" sx={{ color: theme.palette.primary.main, fontWeight: 'bold' }}>
              Rental Analysis
          </Typography>
          {/* Colored Bar */}
          <Divider sx={{ backgroundColor: theme.palette.primary.main, height: 3, marginY: 2 }} />

          <FormControl fullWidth sx={{ marginBottom: 2 }}>
              <TextField 
              label="Monthly Operating Income" 
              type="number"
              name='monthlyOperating'
              value={sellerFormState.monthlyOperating}
              onChange={handleInputChange}
              InputProps={{
                  startAdornment: <InputAdornment position="start">$</InputAdornment>,
              }}
              />
          </FormControl>
          <FormControl fullWidth sx={{ marginBottom: 2 }}>
              <TextField 
              label="Estimated Vacancy Percentage" 
              type="number"
              name='percentVacant'
              value={sellerFormState.percentVacant}
              onChange={handleInputChange}
              InputProps={{
                  startAdornment: <InputAdornment position="start">%</InputAdornment>,
              }}
              />
          </FormControl>
          <FormControl fullWidth sx={{ marginBottom: 2 }}>
              <TextField 
              label="Monthly Operating Expenses" 
              type="number"
              name='monthlyOpCost'
              value={sellerFormState.monthlyOpCost}
              onChange={handleInputChange}
              InputProps={{
                  startAdornment: <InputAdornment position="start">$</InputAdornment>,
              }}
              />
          </FormControl>

          <hr />

          {/* Subheading */}
          <Typography variant="h4" fontWeight="bold" sx={{ marginTop: 2, marginBottom: 1 }}>
            Analysis
          </Typography>

          <FormControl fullWidth sx={{ marginTop: 0, marginBottom: 0 }}>
              <Grid container >
                  <Grid item xs={6} position="end">
                      <Typography position="end" variant="h6" align="left" sx={{ marginBottom: 2 }}>Total Cash Required For Project</Typography>   
                  </Grid>
                  <Grid item xs={6}>    
                      <Typography position="end" variant="h6" align="right" sx={{ marginBottom: 2 }}>{formatDollarValue(getAllCost())}</Typography>
                  </Grid>
              </Grid>
          </FormControl>
          <FormControl fullWidth sx={{ marginBottom: 0 }}>
              <Grid container >
                  <Grid item xs={6} position="end">
                      <Typography position="end" variant="h6" align="left" sx={{ marginBottom: 2 }}>Total All-In Cost For Project</Typography>   
                  </Grid>
                  <Grid item xs={6}>    
                      <Typography position="end" variant="h6" align="right" sx={{ marginBottom: 2 }}>{formatDollarValue(getAllCost())}</Typography>
                  </Grid>
              </Grid>
          </FormControl>
          <FormControl fullWidth sx={{ marginBottom: 0 }}>
              <Grid container >
                  <Grid item xs={6}>
                      <Typography className="analysis-typography" align="left" variant="h6" sx={{ marginBottom: 2 }}>Monthly Rental Income</Typography>
                  </Grid>
                  <Grid item xs={6}>    
                      <Typography className="analysis-typography" align="right" variant="h6" sx={{ marginBottom: 2 }}>{formatDollarValue(sellerFormState.monthlyOperating)}</Typography>
                  </Grid>
              </Grid>
          </FormControl>
          <FormControl fullWidth sx={{ marginBottom: 0 }}>
              <Grid container >
                  <Grid item xs={6}>
                      <Typography className="analysis-typography" align="left" variant="h6" sx={{ marginBottom: 2 }}>Vacancy Expense</Typography>
                  </Grid>
                  <Grid item xs={6}>    
                      <Typography className="analysis-typography" align="right" variant="h6" sx={{ marginBottom: 2 }}>{formatDollarValue(sellerFormState.monthlyOperating * (sellerFormState.percentVacant / 100))}</Typography>
                  </Grid>
              </Grid>
          </FormControl>

          <FormControl fullWidth sx={{ marginBottom: 0 }}>
              <Grid container >
                  <Grid item xs={6}>
                      <Typography className="analysis-typography" align="left" variant="h6" sx={{ marginBottom: 2 }}>Monthly Operating Expenses</Typography>
                  </Grid>
                  <Grid item xs={6}>    
                      <Typography className="analysis-typography" align="right" variant="h6" sx={{ marginBottom: 2 }}>{formatDollarValue(sellerFormState.monthlyOpCost)}</Typography>
                  </Grid>
              </Grid>
          </FormControl>
          <FormControl fullWidth sx={{ marginBottom: 0 }}>
              <Grid container >
                  <Grid item xs={6}>
                      <Typography className="analysis-typography" align="left" variant="h6" sx={{ marginBottom: 2 }}>Insurance, Taxes & HOA Payments</Typography>
                  </Grid>
                  <Grid item xs={6}>    
                      <Typography className="analysis-typography" align="right" variant="h6" sx={{ marginBottom: 2 }}>{formatDollarValue(getMonthlySideCost())}</Typography>
                  </Grid>
              </Grid>
          </FormControl>
          <FormControl fullWidth sx={{ marginBottom: 0 }}>
              <Grid container >
                  <Grid item xs={6}>
                      <Typography className="analysis-typography" align="left" variant="h6" sx={{ marginBottom: 2 }}>Net Operating Income</Typography>
                  </Grid>
                  <Grid item xs={6}>    
                      <Typography className="analysis-typography" align="right" variant="h6" sx={{ marginBottom: 2 }}>{formatDollarValue(netOpIncome())}</Typography>
                  </Grid>
              </Grid>
          </FormControl>
          <FormControl fullWidth sx={{ marginBottom: 0 }}>
              <Grid container >
                  <Grid item xs={6}>
                      <Typography className="analysis-typography" align="left" variant="h6" sx={{ marginBottom: 2 }}>Monthy Cash Flow</Typography>
                  </Grid>
                  <Grid item xs={6}>    
                      <Typography className="analysis-typography" align="right" variant="h6" sx={{ marginBottom: 2 }}>{formatDollarValue(netOpIncome())}</Typography>
                  </Grid>
              </Grid>
          </FormControl>

          <FormControl fullWidth  sx={{ marginTop: 0, marginBottom: 0, backgroundColor: '#00c02178' }}>
              <Grid container color={"success"}>
                  <Grid item xs={6} sx={{ marginTop: 2}}>
                      <Typography className="analysis-typography" align="center" variant="h6" >ANNUAL CASH FLOW</Typography>
                      <Typography className="analysis-typography" align="center" variant="h4" fontWeight="bold" sx={{ marginBottom: 2 }}>{formatDollarValue(netOpIncome() * 12)}</Typography>
                  </Grid>
                  <Grid item xs={6} sx={{ marginTop: 2}}>
                      <Typography className="analysis-typography" align="center" variant="h6" >CASH ON CASH</Typography>
                      <Typography className="analysis-typography" align="center" variant="h4" fontWeight="bold" sx={{ marginBottom: 2 }}>{getCashOnCash().toFixed(2)}%</Typography>
                  </Grid>
              </Grid>
          </FormControl>

          

      </Box>
  )
}

export default PurchaseRentForm