import React, { useEffect } from 'react'
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

function SellWholesaleForm({ formData }) {
    const theme = useTheme();
    const [sellerFormState, setSellerFormState] = React.useState({
        wholesaleProfit: 0,
        buyerProfit: 0,
    });
    const [maxCashOffer, setMaxCashOffer] = React.useState(0);
    const [percOfARV, setPercOfARV] = React.useState(0);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setSellerFormState((prevFormState) => ({
            ...prevFormState,
            [name]: parseFloat(value),
        }));
    };
    
    const formatDollarValue = (value) => {
        return value.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
        });
    };

    const getNetProfit = () => {  
        const arv = parseFloat(formData.arv) || 0;
        const wholesaleProfit = sellerFormState.wholesaleProfit / 100 || 0;
        return arv * wholesaleProfit;
    };

    const getBuyerROI = () => {
        const arv = parseFloat(formData.arv) || 0;
        const profit = getBuyerNetProfit() || 0;
        
        return (profit / (arv - profit)) * 100;

    };

    const getBuyerNetProfit = () => {
        const arv = parseFloat(formData.arv) || 0;
        const wholesaleProfit = sellerFormState.buyerProfit / 100 || 0;
        return arv * wholesaleProfit;
    };

    const getExpenses = () => {
        const numericRepairCost = parseFloat(formData.repairCost)  || 0;
        const numericHedgeExpense = parseFloat(formData.hedgeExpense) || 0;
        const numericClosingCost = parseFloat(formData.closingCost) || 0;
        const numericMonthlyHoldingCost = parseFloat(formData.monthlyHoldingCost) || 0;
        const numericRepairPeriod = parseFloat(formData.repairPeriod) || 0;
        const numericMarketingCost = parseFloat(formData.marketingCost) || 0;
        const numericSellingCost = parseFloat(formData.sellingCost) || 0;
       
        
        
        
        return (
            numericRepairCost +
            numericRepairCost * (numericHedgeExpense / 100) +
            numericClosingCost +
            numericMonthlyHoldingCost * numericRepairPeriod +
            numericMarketingCost +
            numericSellingCost
        );
    };

    const getMaxOffer = (arv) => {
        let expenses = getExpenses();
        let wholesaleProfit = sellerFormState.wholesaleProfit / 100 || 0;
        let buyerProfit = sellerFormState.buyerProfit / 100 || 0;
        let maxCashOffer =
            expenses > 0
                ? (arv - expenses) - getNetProfit() - (arv * (buyerProfit))
                : arv - getNetProfit() - (arv * (buyerProfit));
        return maxCashOffer;
    };

    const getPercentageOfARV = (arv) => {
        let maxOffer = getMaxOffer(arv);
        let percOfARV = maxOffer > 0 ? (maxOffer / arv) * 100 : 0;
        return percOfARV;
    };

    useEffect(() => {
        const arv = parseFloat(formData.arv) || 0;

        if (!isNaN(arv)) {
            setMaxCashOffer(getMaxOffer(arv));
            setPercOfARV(getPercentageOfARV(arv));
        } else {
            setMaxCashOffer(0);
            setPercOfARV(0);
        }
    }, [formData, sellerFormState]);

    return (
        <Box sx={{marginTop: 2}}>
            {/* Title */}
            <Typography variant="h4" sx={{ color: theme.palette.primary.main, fontWeight: 'bold' }}>
                Wholesale Analysis
            </Typography>
            {/* Colored Bar */}
            <Divider sx={{ backgroundColor: theme.palette.primary.main, height: 3, marginY: 2 }} />

            <FormControl fullWidth sx={{ marginBottom: 2 }}>
                <TextField 
                label="Wholesaler Profit" 
                type="number"
                name='wholesaleProfit'
                value={sellerFormState.wholesaleProfit}
                onChange={handleInputChange}
                InputProps={{
                    startAdornment: <InputAdornment position="start">%</InputAdornment>,
                }}
                />
            </FormControl>
            <FormControl fullWidth sx={{ marginBottom: 4 }}>
                <TextField 
                label="Buyer Profit" 
                type="number"
                name='buyerProfit'
                value={sellerFormState.buyerProfit}
                onChange={handleInputChange}
                InputProps={{
                    startAdornment: <InputAdornment position="start">%</InputAdornment>,
                }}
                />
            </FormControl>

            <hr />

            <FormControl fullWidth sx={{ marginTop: 4, marginBottom: 0 }}>
                <Grid container >
                    <Grid item xs={6} position="end">
                        <Typography position="end" variant="h5" align="left" sx={{ marginBottom: 2 }}>Maximum Cash Offer</Typography>   
                    </Grid>
                    <Grid item xs={6}>    
                        <Typography position="end" variant="h5" align="right" sx={{ marginBottom: 2 }}>{formatDollarValue(maxCashOffer)}</Typography>
                    </Grid>
                </Grid>
            </FormControl>
            <FormControl fullWidth sx={{ marginBottom: 2 }}>
                <Grid container >
                    <Grid item xs={6}>
                        <Typography className="analysis-typography" align="left" variant="h5" sx={{ marginBottom: 2 }}>Percentage of ARV</Typography>
                    </Grid>
                    <Grid item xs={6}>    
                        <Typography className="analysis-typography" align="right" variant="h5" sx={{ marginBottom: 2 }}>{percOfARV.toFixed(2)}%</Typography>
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
                        <Typography className="analysis-typography" align="center" variant="h6" >BUYER ROI</Typography>
                        <Typography className="analysis-typography" align="center" variant="h4" fontWeight="bold" sx={{ marginBottom: 2 }}>{getBuyerROI().toFixed(2)}%</Typography>
                    </Grid>
                    <Grid item xs={4} sx={{ marginTop: 2}}>
                        <Typography className="analysis-typography" align="center" variant="h6" >BUYER NET PROFIT</Typography>
                        <Typography className="analysis-typography" align="center" variant="h4" fontWeight="bold" sx={{ marginBottom: 2 }}>{formatDollarValue(getBuyerNetProfit())}</Typography>
                    </Grid>
                </Grid>
            </FormControl>

            

        </Box>
    )
}

export default SellWholesaleForm