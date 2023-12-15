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
import { get } from 'mongoose';


function SellerFinanceSellFlip({ formData }) {
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

    const getAllCost = () => {
        const repair = getRepairCost();
        const other = getOtherCosts();
        const marketing = parseFloat(sellerFormState.marketingCost) || 0;
        const selling = parseFloat(sellerFormState.sellingCost) || 0;
        const purch  = parseFloat(formData.estPurchasePrice) || 0;

        return repair + other + marketing + selling + purch;
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

      const getRepairCost = () => {
        const numRepairCost = parseFloat(formData.repairCost) || 0;
        const numHedgeExpense = parseFloat(formData.hedgeExpense) || 0;
        return numRepairCost + numRepairCost * (numHedgeExpense / 100);

    };
    const getHoldingTime = () => {
        const numRepairPeriod = parseFloat(formData.repairPeriod) || 0;
        const numMonthsToSell = parseFloat(sellerFormState.monthsToSell) || 0;
        return numRepairPeriod + numMonthsToSell;
    };

    const getLoanPayments = () => { 
        const monthlyPayment = parseFloat(formData.monthlyPayment) || 0;
        const numHoldingTime = getHoldingTime();

        return monthlyPayment * numHoldingTime;
    };

    const getCashRequired = () => {
        const loanPayments = getLoanPayments();
        const allCost = getAllCost();
        const sellingCost = parseFloat(sellerFormState.sellingCost) || 0;
        const purch = parseFloat(formData.estPurchasePrice) || 0;
        const down = parseFloat(formData.downPayment) || 0;

        return down + loanPayments + allCost - purch - sellingCost;
    };


    const getLoanBalance = () => {  
        const loan = parseFloat(formData.loanAmount) || 0;
        const down = parseFloat(formData.downPayment) || 0;
        const monthly = parseFloat(formData.monthlyPayment) || 0;
        const rate = parseFloat(formData.interestRate) || 0;
        const months = getHoldingTime();

        let balance = loan - down;

        for (let i = 0; i < months; i++) {
            if (balance <= 0) {
                return 0;
            }
            balance = balance * (1 + (rate / 12 / 100)) - monthly;
        }

        return balance;
    };

    const getNetProfit = () => {  
        const ask = parseFloat(sellerFormState.askingPrice) || 0;
        const balance = getLoanBalance();
        const cash = getCashRequired();
        const sellCost = parseFloat(sellerFormState.sellingCost) || 0;
        return ask - (balance + cash + sellCost);
    };


    const getROI = () => {
        const loan = getLoanBalance() || 0;
        const profit = getNetProfit() || 0;
        const cash = getCashRequired() || 0;   


        return (profit / (loan + cash)) * 100;

    };


    const getCashOnCash = () => {
        const profit = getNetProfit() || 0;
        const cash = getCashRequired() || 0;

        return (profit / cash) * 100;
    };


    return (
        <Box sx={{marginTop: 2}}>
            {/* Title */}
            <Typography variant="h4" sx={{ color: theme.palette.primary.main, fontWeight: 'bold' }}>
                Seller Finance/Flip Analysis
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
            <Typography variant="h6" fontWeight="bold">Loan with seller</Typography>
            <FormControl fullWidth sx={{ marginBottom: 0 }}>
                <Grid container >
                    <Grid item xs={6} position="end">
                        <Typography position="end" variant="h6" align="left" sx={{ marginBottom: 2 }}>Total Loan Amount</Typography>   
                    </Grid>
                    <Grid item xs={6}>    
                        <Typography position="end" variant="h6" align="right" sx={{ marginBottom: 2 }}>{formatDollarValue(formData.loanAmount - formData.downPayment)}</Typography>
                    </Grid>
                </Grid>
            </FormControl>
            <FormControl fullWidth sx={{ marginBottom: 0 }}>
                <Grid container >
                    <Grid item xs={6} position="end">
                        <Typography position="end" variant="h6" align="left" sx={{ marginBottom: 2 }}>Cash Required For Project</Typography>   
                    </Grid>
                    <Grid item xs={6}>    
                        <Typography position="end" variant="h6" align="right" sx={{ marginBottom: 2 }}>{formatDollarValue(getCashRequired())}</Typography>
                    </Grid>
                </Grid>
            </FormControl>
            <FormControl fullWidth sx={{ marginBottom: 0 }}>
                <Grid container >
                    <Grid item xs={6} position="end">
                        <Typography position="end" variant="h6" align="left" sx={{ marginBottom: 2 }}>Total Loan Payments</Typography>   
                    </Grid>
                    <Grid item xs={6}>    
                        <Typography position="end" variant="h6" align="right" sx={{ marginBottom: 2 }}>{formatDollarValue(getLoanPayments())}</Typography>
                    </Grid>
                </Grid>
            </FormControl>
            <FormControl fullWidth sx={{ marginBottom: 0 }}>
                <Grid container >
                    <Grid item xs={6} position="end">
                        <Typography position="end" variant="h6" align="left" sx={{ marginBottom: 2 }}>Term with Seller</Typography>   
                    </Grid>
                    <Grid item xs={6}>    
                        <Typography position="end" variant="h6" align="right" sx={{ marginBottom: 2 }}>{formData.ballonTerm ? formData.ballonTerm : formData.amortizationTerm} years</Typography>
                    </Grid>
                </Grid>
            </FormControl>
            <FormControl fullWidth sx={{ marginBottom: 0 }}>
                <Grid container >
                    <Grid item xs={6} position="end">
                        <Typography position="end" variant="h6" align="left" sx={{ marginBottom: 2 }}>Balance after {getHoldingTime()} months</Typography>   
                    </Grid>
                    <Grid item xs={6}>    
                        <Typography position="end" variant="h6" align="right" sx={{ marginBottom: 2 }}>{formatDollarValue(getLoanBalance())}</Typography>
                    </Grid>
                </Grid>
            </FormControl>



            <hr />

            <FormControl fullWidth sx={{ marginTop: 2, marginBottom: 0 }}>
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
                        <Typography className="analysis-typography" align="left" variant="h6" sx={{ marginBottom: 2 }}>Total Marketing Cost</Typography>
                    </Grid>
                    <Grid item xs={6}>    
                        <Typography className="analysis-typography" align="right" variant="h6" sx={{ marginBottom: 2 }}>{formatDollarValue(sellerFormState.marketingCost)}</Typography>
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
            <FormControl fullWidth sx={{ marginTop: 1, marginBottom: 0 }}>
                <Grid container >
                    <Grid item xs={6}>
                        <Typography className="analysis-typography" align="left" variant="h6" fontWeight="bold" sx={{ marginBottom: 2 }}>Balance at Sell</Typography>
                    </Grid>
                    <Grid item xs={6}>    
                        <Typography className="analysis-typography" align="right" variant="h6" fontWeight="bold" sx={{ marginBottom: 2 }}>-{formatDollarValue(getLoanBalance())}</Typography>
                    </Grid>
                </Grid>
            </FormControl>
            <FormControl fullWidth sx={{ marginBottom: 0 }}>
                <Grid container >
                    <Grid item xs={6}>
                        <Typography className="analysis-typography" align="left" variant="h6" fontWeight="bold" sx={{ marginBottom: 2 }}>Cash Required For Project</Typography>
                    </Grid>
                    <Grid item xs={6}>    
                        <Typography className="analysis-typography" align="right" variant="h6" fontWeight="bold" sx={{ marginBottom: 2 }}>-{formatDollarValue(getCashRequired())}</Typography>
                    </Grid>
                </Grid>
            </FormControl>
            <FormControl fullWidth sx={{ marginBottom: 0 }}>
                <Grid container >
                    <Grid item xs={6}>
                        <Typography className="analysis-typography" align="left" variant="h6" fontWeight="bold" sx={{ marginBottom: 2 }}>Total Selling Cost</Typography>
                    </Grid>
                    <Grid item xs={6}>    
                        <Typography className="analysis-typography" align="right" variant="h6" fontWeight="bold" sx={{ marginBottom: 2 }}>{formatDollarValue(sellerFormState.sellingCost)}</Typography>
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

export default SellerFinanceSellFlip