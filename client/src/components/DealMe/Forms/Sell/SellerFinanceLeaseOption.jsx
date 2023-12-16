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

function SellerFinanceLeaseOption({ formData }) {
    const theme = useTheme();
    const [sellerFormState, setSellerFormState] = React.useState({
        salesPrice: 0,
        optionPayment: 0,
        monthlyRental: 0,
        monthlyCredits: 0,
        optionTerm: 0,
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

    const getBackEnd = () => {
        const salesPrice = parseFloat(sellerFormState.salesPrice) || 0;
        const optionPayment = parseFloat(sellerFormState.optionPayment) || 0;
        const optionTerm = parseFloat(sellerFormState.optionTerm) || 0;
        const repairPeriod = parseFloat(formData.repairPeriod) || 0;
        const monthlyLoanPayment = parseFloat(formData.monthlyPayment) || 0;

        const downPayment = parseFloat(formData.downPayment) || 0;
        const loanAmount = parseFloat(formData.loanAmount) || 0;

        return ((salesPrice + downPayment + optionPayment) + ((monthlyLoanPayment * optionTerm) + (monthlyLoanPayment * repairPeriod))) - loanAmount;
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


    const getNetProfit = () => {
      const totalCashFlow = getTotalCashFlow()
      const optionPayment = parseFloat(sellerFormState.optionPayment) || 0;
      //const backend = getBackEnd();

      return (totalCashFlow + optionPayment );
    };

    const getMonthlySideCost = () => {
        const numPropInsurance = parseFloat(formData.propertyInsurance) || 0;
        const numPropertyTaxes = parseFloat(formData.propertyTax) || 0;
        const numHOA = parseFloat(formData.hoa) || 0;
        const holding = parseFloat(formData.monthlyHoldingCost) || 0;
        return numPropInsurance + numPropertyTaxes + numHOA + holding;
    };

    const cashRequired = () => {    
        const purch = parseFloat(formData.estPurchasePrice) || 0;
        const repair = getRepairCost();
        const side = getMonthlySideCost();

        return purch + repair + (side * (parseFloat(formData.repairPeriod) || 0)) + parseFloat(formData.closingCost);

    };

    const getCashRequired = () => {
        const loanPayments = getLoanPayments();
        const allCost = getAllCost();
        const sellingCost = parseFloat(sellerFormState.sellingCost) || 0;
        const purch = parseFloat(formData.estPurchasePrice) || 0;
        const down = parseFloat(formData.downPayment) || 0;

        return down + loanPayments + allCost - purch - sellingCost;
    };

    const getTotalCashFlow = () => {
        const numPropInsurance = parseFloat(formData.propertyInsurance) || 0;
        const numPropertyTaxes = parseFloat(formData.propertyTax) || 0;
        const numHOA = parseFloat(formData.hoa) || 0;

        return (sellerFormState.monthlyRental - (numPropInsurance + numPropertyTaxes + numHOA)) * sellerFormState.optionTerm;
    };

    

    return (
        <Box sx={{marginTop: 2}}>
            {/* Title */}
            <Typography variant="h4" sx={{ color: theme.palette.primary.main, fontWeight: 'bold' }}>
                Seller Finance / Lease Option Analysis
            </Typography>
            {/* Colored Bar */}
            <Divider sx={{ backgroundColor: theme.palette.primary.main, height: 3, marginY: 2 }} />
            <FormControl fullWidth sx={{ marginBottom: 2 }}>
                <TextField 
                label="Sales Price" 
                type="number"
                name='salesPrice'
                value={sellerFormState.salesPrice}
                onChange={handleInputChange}
                InputProps={{
                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                }}
                />
            </FormControl>
            <FormControl fullWidth sx={{ marginBottom: 2 }}>
                <TextField 
                label="Option Payment" 
                type="number"
                name='optionPayment'
                value={sellerFormState.optionPayment}
                onChange={handleInputChange}
                InputProps={{
                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                }}
                />
            </FormControl>
            <FormControl fullWidth sx={{ marginBottom: 2 }}>
                <TextField 
                label="Monthly Rental Payment" 
                type="number"
                name='monthlyRental'
                value={sellerFormState.monthlyRental}
                onChange={handleInputChange}
                InputProps={{
                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                }}
                />
            </FormControl>
            <FormControl fullWidth sx={{ marginBottom: 2 }}>
                <TextField 
                label="Monthly Credits (Optional)" 
                type="number"
                name='monthlyCredits'
                value={sellerFormState.monthlyCredits}
                onChange={handleInputChange}
                InputProps={{
                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                }}
                />
            </FormControl>
            <FormControl fullWidth sx={{ marginBottom: 2 }}>
                <TextField 
                label="Lease Option Term" 
                type="number"
                name='optionTerm'
                value={sellerFormState.optionTerm}
                onChange={handleInputChange}
                InputProps={{
                    startAdornment: <InputAdornment position="start">#</InputAdornment>,
                    endAdornment: <InputAdornment position="end">months</InputAdornment>,
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
                        <Typography position="end" variant="h6" align="left" sx={{ marginBottom: 2 }}>Total All-In Cost For Project</Typography>   
                    </Grid>
                    <Grid item xs={6}>    
                        <Typography position="end" variant="h6" align="right" sx={{ marginBottom: 2 }}>{formatDollarValue((getCashRequired() + parseFloat(formData.estPurchasePrice)) - parseFloat(formData.downPayment))}</Typography>
                    </Grid>
                </Grid>
            </FormControl>
            <FormControl fullWidth sx={{ marginTop: 0, marginBottom: 0 }}>
                <Grid container >
                    <Grid item xs={6} position="end">
                        <Typography position="end" variant="h6" align="left" sx={{ marginBottom: 2 }}>Total Cash Required For Project</Typography>   
                    </Grid>
                    <Grid item xs={6}>    
                        <Typography position="end" variant="h6" align="right" sx={{ marginBottom: 2 }}>{formatDollarValue(getCashRequired())}</Typography>
                    </Grid>
                </Grid>
            </FormControl>
            <FormControl fullWidth sx={{ marginTop: 0, marginBottom: 0 }}>
                <Grid container >
                    <Grid item xs={6} position="end">
                        <Typography position="end" variant="h6" align="left" sx={{ marginBottom: 2 }}>Buyer Sales Price</Typography>   
                    </Grid>
                    <Grid item xs={6}>    
                        <Typography position="end" variant="h6" align="right" sx={{ marginBottom: 2 }}>{formatDollarValue(sellerFormState.salesPrice)}</Typography>
                    </Grid>
                </Grid>
            </FormControl>
            <FormControl fullWidth sx={{ marginTop: 0, marginBottom: 0 }}>
                <Grid container >
                    <Grid item xs={6} position="end">
                        <Typography position="end" variant="h6" align="left" sx={{ marginBottom: 2 }}>Buyer Down Payment</Typography>   
                    </Grid>
                    <Grid item xs={6}>    
                        <Typography position="end" variant="h6" align="right" sx={{ marginBottom: 2 }}>{formatDollarValue(sellerFormState.optionPayment)}</Typography>
                    </Grid>
                </Grid>
            </FormControl>
            <FormControl fullWidth sx={{ marginTop: 0, marginBottom: 0 }}>
                <Grid container >
                    <Grid item xs={6} position="end">
                        <Typography position="end" variant="h6" align="left" sx={{ marginBottom: 2 }}>Buyer Purchase Price</Typography>   
                    </Grid>
                    <Grid item xs={6}>    
                        <Typography position="end" variant="h6" align="right" sx={{ marginBottom: 2 }}>{formatDollarValue((parseFloat(sellerFormState.salesPrice) || 0) - (parseFloat(sellerFormState.optionPayment)) || 0)}</Typography>
                    </Grid>
                </Grid>
            </FormControl>
            <FormControl fullWidth sx={{ marginTop: 0, marginBottom: 0 }}>
                  <Grid container >
                      <Grid item xs={6} position="end">
                          <Typography position="end" variant="h6" align="left" sx={{ marginBottom: 2 }}>Monthly Rent from Buyer</Typography>   
                      </Grid>
                      <Grid item xs={6}>    
                          <Typography position="end" variant="h6" align="right" sx={{ marginBottom: 2 }}>{formatDollarValue(sellerFormState.monthlyRental)}</Typography>
                      </Grid>
                  </Grid>
              </FormControl>
                <FormControl fullWidth sx={{ marginBottom: 0 }}>
                    <Grid container >
                        <Grid item xs={6}>
                            <Typography className="analysis-typography" align="left" variant="h6" sx={{ marginBottom: 2 }}>Loan Payments</Typography>
                        </Grid>
                        <Grid item xs={6}>    
                            <Typography className="analysis-typography" align="right" variant="h6" sx={{ marginBottom: 2 }}>{formatDollarValue(formData.monthlyPayment)}</Typography>
                        </Grid>
                    </Grid>
                </FormControl>
              <FormControl fullWidth sx={{ marginBottom: 0 }}>
                <Grid container >
                    <Grid item xs={6}>
                        <Typography className="analysis-typography" align="left" variant="h6" sx={{ marginBottom: 2 }}>Monthly Insurance, Taxes, & HOA</Typography>
                    </Grid>
                    <Grid item xs={6}>    
                        <Typography className="analysis-typography" align="right" variant="h6" sx={{ marginBottom: 2 }}>{formatDollarValue((parseFloat(formData.propertyInsurance) + parseFloat(formData.propertyTax) + parseFloat(formData.hoa)))}</Typography>
                    </Grid>
                </Grid>
            </FormControl>
            <FormControl fullWidth sx={{ marginTop: 0, marginBottom: 0 }}>
                  <Grid container >
                      <Grid item xs={6} position="end">
                          <Typography position="end" variant="h6" align="left" sx={{ marginBottom: 2 }}>Monthly Cash Flow Received</Typography>   
                      </Grid>
                      <Grid item xs={6}>    
                          <Typography position="end" variant="h6" align="right" sx={{ marginBottom: 2 }}>{formatDollarValue(sellerFormState.monthlyRental - (parseFloat(formData.propertyInsurance) + parseFloat(formData.propertyTax) + parseFloat(formData.hoa) + parseFloat(formData.monthlyPayment)))}</Typography>
                      </Grid>
                  </Grid>
              </FormControl>
              <FormControl fullWidth sx={{ marginTop: 0, marginBottom: 0 }}>
                  <Grid container >
                      <Grid item xs={6} position="end">
                          <Typography position="end" variant="h6" align="left" sx={{ marginBottom: 2 }}>Out - Monthly Credits to Buyer</Typography>   
                      </Grid>
                      <Grid item xs={6}>    
                          <Typography position="end" variant="h6" align="right" sx={{ marginBottom: 2 }}>{formatDollarValue(sellerFormState.monthlyCredits)}</Typography>
                      </Grid>
                  </Grid>
              </FormControl>
            
              


            <hr />

             

              {/* Subheading */}
              <Typography variant="h4" fontWeight="bold" sx={{ marginTop: 2, marginBottom: 1 }}>
                Profit Centers
              </Typography>

              <FormControl fullWidth sx={{ marginTop: 0, marginBottom: 0 }}>
                  <Grid container >
                      <Grid item xs={6} position="end">
                          <Typography position="end" variant="h6" align="left" sx={{ marginBottom: 2 }}>Option Payment Received</Typography>   
                      </Grid>
                      <Grid item xs={6}>    
                          <Typography position="end" variant="h6" align="right" sx={{ marginBottom: 2 }}>{formatDollarValue(sellerFormState.optionPayment)}</Typography>
                      </Grid>
                  </Grid>
              </FormControl>
              
              <FormControl fullWidth sx={{ marginTop: 0, marginBottom: 0 }}>
                  <Grid container >
                      <Grid item xs={6} position="end">
                          <Typography position="end" variant="h6" align="left" sx={{ marginBottom: 2 }}>Total Cash Flow Received</Typography>   
                      </Grid>
                      <Grid item xs={6}>    
                          <Typography position="end" variant="h6" align="right" sx={{ marginBottom: 2 }}>{formatDollarValue((sellerFormState.monthlyRental - (parseFloat(formData.propertyInsurance) + parseFloat(formData.propertyTax) + parseFloat(formData.hoa) + parseFloat(formData.monthlyPayment))) * parseFloat(sellerFormState.optionTerm))}</Typography>
                      </Grid>
                  </Grid>
              </FormControl>
              <FormControl fullWidth sx={{ marginTop: 0, marginBottom: 0 }}>
                  <Grid container >
                      <Grid item xs={6} position="end">
                          <Typography position="end" variant="h6" align="left" sx={{ marginBottom: 2 }}>Monthly Credits</Typography>   
                      </Grid>
                      <Grid item xs={6}>    
                          <Typography position="end" variant="h6" align="right" sx={{ marginBottom: 2 }}>{formatDollarValue(-(sellerFormState.monthlyCredits * sellerFormState.optionTerm))}</Typography>
                      </Grid>
                  </Grid>
              </FormControl>
              


            <FormControl fullWidth  sx={{ marginTop: 0, marginBottom: 0, backgroundColor: '#00c02178' }}>
                <Grid container color={"success"}>
                    <Grid item xs={12} sx={{ marginTop: 2, marginRight: 2}}>
                        <Typography className="analysis-typography" align="right" variant="h6" >TOTAL NET PROFIT</Typography>
                        <Typography className="analysis-typography" align="right" variant="h4" fontWeight="bold" sx={{ marginBottom: 2 }}>{formatDollarValue(getNetProfit())}</Typography>
                    </Grid>
                </Grid>
            </FormControl>
        </Box>
    )
}

export default SellerFinanceLeaseOption