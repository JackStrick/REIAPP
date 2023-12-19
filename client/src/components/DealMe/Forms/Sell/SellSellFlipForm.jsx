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

/**
 * SellSellFlipForm Component
 * 
 * A React component for analyzing the financial aspects of selling/flipping a property.
 *
 * @param {Object} formData - Object containing form data for analysis.
 * @returns {JSX.Element} - Rendered component.
 */
function SellSellFlipForm({ formData }) {
    const theme = useTheme();
    const [sellerFormState, setSellerFormState] = React.useState({
        askingPrice: 0,
        monthsToSell: 0,
        marketingCost: 0,
        sellingCost: 0,
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
    
    const getPercentageOfARV = () => {
        const estPurch = parseFloat(formData.estPurchasePrice) || 0;
        const marketing = parseFloat(sellerFormState.marketingCost) || 0;
        const selling = parseFloat(sellerFormState.sellingCost) || 0;
        const arv = parseFloat(formData.arv) || 0;

        const value = ((estPurch + marketing + selling + getRepairCost() + getOtherCosts()) / arv) * 100;
        if (value <= 100 && value >= 0) {
          return value;
        }
        return 0;
        
    }; 

    const getRepairCost = () => {
        const numRepairCost = parseFloat(formData.repairCost) || 0;
        const numHedgeExpense = parseFloat(formData.hedgeExpense) || 0;
        return numRepairCost + numRepairCost * (numHedgeExpense / 100);

    };

    const getAllCost = () => {
        const repair = getRepairCost();
        const other = getOtherCosts();
        const marketing = parseFloat(sellerFormState.marketingCost) || 0;
        const selling = parseFloat(sellerFormState.sellingCost) || 0;
        const purch  = parseFloat(formData.estPurchasePrice) || 0;

        return repair + other + marketing + selling + purch;
    };

    const getHoldingTime = () => {
        const numRepairPeriod = parseFloat(formData.repairPeriod) || 0;
        const numMonthsToSell = parseFloat(sellerFormState.monthsToSell) || 0;
        return numRepairPeriod + numMonthsToSell;
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

    const getNetProfit = () => {  
        const ask = parseFloat(sellerFormState.askingPrice) || 0;
        const allin = getAllCost();
        return ask - allin;
    };

    const getCashOnCash = () => {
      const allin = getAllCost();
      const sell = parseFloat(sellerFormState.sellingCost) || 0;
      const profit = getNetProfit();

      return (profit / (allin - sell)) * 100;
    };

    const getBuyerROI = () => {
        const allin = getAllCost() || 0;
        const profit = getNetProfit() || 0;
        
        const final = (profit / allin) * 100;

        return final;

    };

    return (
        <Box sx={{marginTop: 2}}>
            {/* Title */}
            <Typography variant="h4" sx={{ color: theme.palette.primary.main, fontWeight: 'bold' }}>
                Sell/Flip Analysis
            </Typography>
            {/* Colored Bar */}
            <Divider sx={{ backgroundColor: theme.palette.primary.main, height: 3, marginY: 2 }} />

            <FormControl fullWidth sx={{ marginBottom: 2 }}>
                <TextField 
                label="Estimated Asking Price" 
                type="number"
                name='askingPrice'
                value={sellerFormState.askingPrice}
                onChange={handleInputChange}
                InputProps={{
                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                }}
                />
            </FormControl>
            <FormControl fullWidth sx={{ marginBottom: 2 }}>
                <TextField 
                label="Estimated Months To Sell" 
                type="number"
                name='monthsToSell'
                value={sellerFormState.monthsToSell}
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
                value={sellerFormState.marketingCost}
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
                value={sellerFormState.sellingCost}
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
                        <Typography position="end" variant="h6" align="left" sx={{ marginBottom: 2 }}>Purchase Price</Typography>   
                    </Grid>
                    <Grid item xs={6}>    
                        <Typography position="end" variant="h6" align="right" sx={{ marginBottom: 2 }}>{formatDollarValue(formData.estPurchasePrice)}</Typography>
                    </Grid>
                </Grid>
            </FormControl>
            <FormControl fullWidth sx={{ marginBottom: 0 }}>
                <Grid container >
                    <Grid item xs={6}>
                        <Typography className="analysis-typography" align="left" variant="h6" sx={{ marginBottom: 2 }}>Total Repairs</Typography>
                    </Grid>
                    <Grid item xs={6}>    
                        <Typography className="analysis-typography" align="right" variant="h6" sx={{ marginBottom: 2 }}>{formatDollarValue(getRepairCost())}</Typography>
                    </Grid>
                </Grid>
            </FormControl>
            <FormControl fullWidth sx={{ marginBottom: 0 }}>
                <Grid container >
                    <Grid item xs={6}>
                        <Typography className="analysis-typography" align="left" variant="h6" sx={{ marginBottom: 2 }}>Total Holding Time</Typography>
                    </Grid>
                    <Grid item xs={6}>    
                        <Typography className="analysis-typography" align="right" variant="h6" sx={{ marginBottom: 2 }}>{getHoldingTime()} months</Typography>
                    </Grid>
                </Grid>
            </FormControl>
            <FormControl fullWidth sx={{ marginBottom: 0 }}>
                <Grid container >
                    <Grid item xs={6}>
                        <Typography className="analysis-typography" align="left" variant="h6" sx={{ marginBottom: 2 }}>Total Other Costs</Typography>
                    </Grid>
                    <Grid item xs={6}>    
                        <Typography className="analysis-typography" align="right" variant="h6" sx={{ marginBottom: 2 }}>{formatDollarValue(getOtherCosts())}</Typography>
                    </Grid>
                </Grid>
            </FormControl>
            <FormControl fullWidth sx={{ marginBottom: 0 }}>
                <Grid container >
                    <Grid item xs={6}>
                        <Typography className="analysis-typography" align="left" variant="h6" sx={{ marginBottom: 2 }}>Marketing Cost</Typography>
                    </Grid>
                    <Grid item xs={6}>    
                        <Typography className="analysis-typography" align="right" variant="h6" sx={{ marginBottom: 2 }}>{formatDollarValue(sellerFormState.marketingCost)}</Typography>
                    </Grid>
                </Grid>
            </FormControl>
            <FormControl fullWidth sx={{ marginBottom: 0 }}>
                <Grid container >
                    <Grid item xs={6}>
                        <Typography className="analysis-typography" align="left" variant="h6" sx={{ marginBottom: 2 }}>Selling Cost</Typography>
                    </Grid>
                    <Grid item xs={6}>    
                        <Typography className="analysis-typography" align="right" variant="h6" sx={{ marginBottom: 2 }}>{formatDollarValue(sellerFormState.sellingCost)}</Typography>
                    </Grid>
                </Grid>
            </FormControl>
            <FormControl fullWidth sx={{ marginBottom: 1 }}>
                <Grid container >
                    <Grid item xs={6}>
                        <Typography className="analysis-typography" align="left" variant="h6" sx={{ marginBottom: 2 }}>% of ARV</Typography>
                    </Grid>
                    <Grid item xs={6}>    
                        <Typography className="analysis-typography" align="right" variant="h6" sx={{ marginBottom: 2 }}>{getPercentageOfARV().toFixed(2)}%</Typography>
                    </Grid>
                </Grid>
            </FormControl>

            <hr />
            <FormControl fullWidth sx={{ marginTop: 1, marginBottom: 0 }}>
                <Grid container >
                    <Grid item xs={6}>
                        <Typography className="analysis-typography" align="left" variant="h6" fontWeight="bold" sx={{ marginBottom: 2 }}>Asking Price</Typography>
                    </Grid>
                    <Grid item xs={6}>    
                        <Typography className="analysis-typography" align="right" variant="h6" fontWeight="bold" sx={{ marginBottom: 2 }}>{formatDollarValue(sellerFormState.askingPrice)}</Typography>
                    </Grid>
                </Grid>
            </FormControl>
            <FormControl fullWidth sx={{ marginBottom: 0 }}>
                <Grid container >
                    <Grid item xs={6}>
                        <Typography className="analysis-typography" align="left" variant="h6" fontWeight="bold" sx={{ marginBottom: 2 }}>Total All-in Cost</Typography>
                    </Grid>
                    <Grid item xs={6}>    
                        <Typography className="analysis-typography" align="right" variant="h6" fontWeight="bold" sx={{ marginBottom: 2 }}>-{formatDollarValue(getAllCost())}</Typography>
                    </Grid>
                </Grid>
            </FormControl>

            <FormControl fullWidth  sx={{ marginTop: 0, marginBottom: 0, backgroundColor: '#00c02178' }}>
                <Grid container color={"success"}>
                    <Grid item xs={4} sx={{ marginTop: 2}}>
                        <Typography className="analysis-typography" align="center" variant="h6" >YOUR NET PROFIT</Typography>
                        <Typography className="analysis-typography" align="center" variant="h4" fontWeight="bold" sx={{ marginBottom: 2 }}>{formatDollarValue(getNetProfit())}</Typography>
                    </Grid>
                    <Grid item xs={4} sx={{ marginTop: 2}}>
                        <Typography className="analysis-typography" align="center" variant="h6" >ROI</Typography>
                        <Typography className="analysis-typography" align="center" variant="h4" fontWeight="bold" sx={{ marginBottom: 2 }}>{getBuyerROI().toFixed(2)}%</Typography>
                    </Grid>
                    <Grid item xs={4} sx={{ marginTop: 2}}>
                        <Typography className="analysis-typography" align="center" variant="h6" >CASH ON CASH</Typography>
                        <Typography className="analysis-typography" align="center" variant="h4" fontWeight="bold" sx={{ marginBottom: 2 }}>{getCashOnCash().toFixed(2)}%</Typography>
                    </Grid>
                </Grid>
            </FormControl>
        </Box>
    )
}

export default SellSellFlipForm