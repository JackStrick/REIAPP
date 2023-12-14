import React, { useEffect } from 'react'
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
    Grid,
    useTheme,
  } from '@mui/material';


function LeaseOptionSellFlip({ formData }) {
    const theme = useTheme();
    const [sellerFormState, setSellerFormState] = React.useState({
        askingPrice: 0,
        monthsToSell: 0,
        marketingCost: 0,
        monthlyHoldingCost: 0,
        sellingCost: 0,
        estimatedRepairCost: 0,
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


    const getHoldingTime = () => {
        const numMonthsToSell = parseFloat(sellerFormState.monthsToSell) || 0;
        return numMonthsToSell;
    };

    const getMonthlyCost = () => {
        const numMonthlyHoldingCost = parseFloat(sellerFormState.monthlyHoldingCost) || 0;
        const numHoldingTime = getHoldingTime();
        return numMonthlyHoldingCost * numHoldingTime;
    };

    const getOutOfPocketCost = () => {
        const optionPayment = parseFloat(formData.optionPayment) || 0;
        const rentalPayment = parseFloat(formData.monthlyRental) || 0;
        const monthsToSell = parseFloat(sellerFormState.monthsToSell) || 0;
        const marketing = parseFloat(sellerFormState.marketingCost) || 0;
        const holdingCost = parseFloat(sellerFormState.monthlyHoldingCost) || 0;
        const repairCost = parseFloat(sellerFormState.estimatedRepairCost) || 0;

        return optionPayment + (rentalPayment * monthsToSell) + marketing + (holdingCost * monthsToSell) + repairCost;

    };

    const getAllInCost = () => {
        const cost = getOutOfPocketCost();
        const option = parseFloat(formData.optionPayment) || 0;
        const sales = parseFloat(formData.salesPrice) || 0;
        const selling = parseFloat(sellerFormState.sellingCost) || 0;
        const credit = parseFloat(formData.monthlyCredit) || 0;
        const monthsToSell = parseFloat(sellerFormState.monthsToSell) || 0;
        return sales + cost + selling - option - (credit * monthsToSell);
    };

    const getNetProfit = () => {  
        const ask = parseFloat(sellerFormState.askingPrice) || 0;
        const allin = getAllInCost();
        return ask - allin;
    };

    const getROI = () => {
        const allin = getAllInCost() || 0;
        const profit = getNetProfit() || 0;
        
        const final = (profit / allin) * 100;

        return final;

    };

    const getCashOnCash = () => {
        const allin = getOutOfPocketCost();
        const profit = getNetProfit();
  
        return (profit / allin) * 100;
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
                label="Monthly Holding Costs" 
                type="number"
                name='monthlyHoldingCost'
                value={sellerFormState.monthlyHoldingCost}
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
            <FormControl fullWidth sx={{ marginBottom: 2 }}>
                <TextField 
                label="Estimated Repair Cost" 
                type="number"
                name='estimatedRepairCost'
                value={sellerFormState.estimatedRepairCost}
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
                        <Typography position="end" variant="h6" align="right" sx={{ marginBottom: 2 }}>{formatDollarValue(formData.salesPrice)}</Typography>
                    </Grid>
                </Grid>
            </FormControl>
            <FormControl fullWidth sx={{ marginBottom: 0 }}>
                <Grid container >
                    <Grid item xs={6}>
                        <Typography className="analysis-typography" align="left" variant="h6" sx={{ marginBottom: 2 }}>Total Repairs</Typography>
                    </Grid>
                    <Grid item xs={6}>    
                        <Typography className="analysis-typography" align="right" variant="h6" sx={{ marginBottom: 2 }}>{formatDollarValue(sellerFormState.estimatedRepairCost)}</Typography>
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
                        <Typography className="analysis-typography" align="left" variant="h6" sx={{ marginBottom: 2 }}>Total Holding Costs</Typography>
                    </Grid>
                    <Grid item xs={6}>    
                        <Typography className="analysis-typography" align="right" variant="h6" sx={{ marginBottom: 2 }}>{formatDollarValue(getMonthlyCost())}</Typography>
                    </Grid>
                </Grid>
            </FormControl>
            <FormControl fullWidth sx={{ marginBottom: 0 }}>
                <Grid container >
                    <Grid item xs={6}>
                        <Typography className="analysis-typography" align="left" variant="h6" sx={{ marginBottom: 2 }}>Total Marketing Cost</Typography>
                    </Grid>
                    <Grid item xs={6}>    
                        <Typography className="analysis-typography" align="right" variant="h6" sx={{ marginBottom: 2 }}>{formatDollarValue(sellerFormState.marketingCost)}</Typography>
                    </Grid>
                </Grid>
            </FormControl>
            <FormControl fullWidth sx={{ marginBottom: 0 }}>
                <Grid container >
                    <Grid item xs={6}>
                        <Typography className="analysis-typography" align="left" variant="h6" sx={{ marginBottom: 2 }}>Total Selling Cost</Typography>
                    </Grid>
                    <Grid item xs={6}>    
                        <Typography className="analysis-typography" align="right" variant="h6" sx={{ marginBottom: 2 }}>{formatDollarValue(sellerFormState.sellingCost)}</Typography>
                    </Grid>
                </Grid>
            </FormControl>
            <FormControl fullWidth sx={{ marginBottom: 1 }}>
                <Grid container >
                    <Grid item xs={6}>
                        <Typography className="analysis-typography" align="left" variant="h6" sx={{ marginBottom: 2 }}>Total Cash Out Of Pocket</Typography>
                    </Grid>
                    <Grid item xs={6}>    
                        <Typography className="analysis-typography" align="right" variant="h6" sx={{ marginBottom: 2 }}>{formatDollarValue(getOutOfPocketCost())}</Typography>
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
                        <Typography className="analysis-typography" align="right" variant="h6" fontWeight="bold" sx={{ marginBottom: 2 }}>{formatDollarValue(getAllInCost())}</Typography>
                    </Grid>
                </Grid>
            </FormControl>
            <FormControl fullWidth sx={{ marginBottom: 0 }}>
                <Grid container >
                    <Grid item xs={6}>
                        <Typography className="analysis-typography" align="left" variant="h6" fontWeight="bold" sx={{ marginBottom: 2 }}>Total Cash Required For Project</Typography>
                    </Grid>
                    <Grid item xs={6}>    
                        <Typography className="analysis-typography" align="right" variant="h6" fontWeight="bold" sx={{ marginBottom: 2 }}>{formatDollarValue(getOutOfPocketCost())}</Typography>
                    </Grid>
                </Grid>
            </FormControl>

            

            <FormControl fullWidth  sx={{ marginTop: 0, marginBottom: 0, backgroundColor: '#00c02178' }}>
                <Grid container color={"success"}>
                    <Grid item xs={4} sx={{ marginTop: 2}}>
                        <Typography className="analysis-typography" align="center" variant="h6" >TOTAL NET PROFIT</Typography>
                        <Typography className="analysis-typography" align="center" variant="h4" fontWeight="bold" sx={{ marginBottom: 2 }}>{formatDollarValue(getNetProfit())}</Typography>
                    </Grid>
                    <Grid item xs={4} sx={{ marginTop: 2}}>
                        <Typography className="analysis-typography" align="center" variant="h6" >ROI</Typography>
                        <Typography className="analysis-typography" align="center" variant="h4" fontWeight="bold" sx={{ marginBottom: 2 }}>{getROI().toFixed(2)}%</Typography>
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

export default LeaseOptionSellFlip