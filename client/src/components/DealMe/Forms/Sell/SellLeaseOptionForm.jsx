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
 * SellLeaseOptionForm is a React component that performs financial analysis
 * for a property sold through a lease option. It calculates various profit
 * centers and the total net profit based on user input.
 *
 * @component
 * @param {Object} props - The properties of the component.
 * @param {Object} props.formData - The form data required for analysis.
 * @returns {JSX.Element} SellLeaseOptionForm component.
 */
function SellLeaseOptionForm({ formData }) {
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
        const salesPrice = (parseFloat(sellerFormState.salesPrice) || 0) - (parseFloat(formData.salesPrice) || 0);
        const optionPayment = (parseFloat(formData.optionPayment) || 0) - (parseFloat(sellerFormState.optionPayment) || 0);
        const credits = (parseFloat(formData.monthlyCredit) || 0) - (parseFloat(sellerFormState.monthlyCredits) || 0);
        const leaseTerm = parseFloat(sellerFormState.optionTerm) || 0;

        return (salesPrice + optionPayment + (credits * leaseTerm));


    };

    const getNetProfit = () => {
      const totalCashFlow = (sellerFormState.monthlyRental - formData.monthlyRental) * sellerFormState.optionTerm
      const creditsDifference = (formData.monthlyCredit - sellerFormState.monthlyCredits) * sellerFormState.optionTerm

      return (totalCashFlow + creditsDifference)
    };

    
    


    return (
        <Box sx={{marginTop: 2}}>
            {/* Title */}
            <Typography variant="h4" sx={{ color: theme.palette.primary.main, fontWeight: 'bold' }}>
                Lease Option Analysis
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
                        <Typography position="end" variant="h6" align="left" sx={{ marginBottom: 2 }}>Out - Us to Seller Sales Price</Typography>   
                    </Grid>
                    <Grid item xs={6}>    
                        <Typography position="end" variant="h6" align="right" sx={{ marginBottom: 2 }}>{formatDollarValue(formData.salesPrice)}</Typography>
                    </Grid>
                </Grid>
            </FormControl>
            <FormControl fullWidth sx={{ marginTop: 0, marginBottom: 0 }}>
                <Grid container >
                    <Grid item xs={6} position="end">
                        <Typography position="end" variant="h6" align="left" sx={{ marginBottom: 2 }}>Out - Option Payment To Seller</Typography>   
                    </Grid>
                    <Grid item xs={6}>    
                        <Typography position="end" variant="h6" align="right" sx={{ marginBottom: 2 }}>{formatDollarValue(formData.optionPayment)}</Typography>
                    </Grid>
                </Grid>
            </FormControl>
            <FormControl fullWidth sx={{ marginTop: 0, marginBottom: 0 }}>
                <Grid container >
                    <Grid item xs={6} position="end">
                        <Typography position="end" variant="h6" align="left" sx={{ marginBottom: 2 }}>Out - Monthly Rent To Seller</Typography>   
                    </Grid>
                    <Grid item xs={6}>    
                        <Typography position="end" variant="h6" align="right" sx={{ marginBottom: 2 }}>{formatDollarValue(formData.monthlyRental)}</Typography>
                    </Grid>
                </Grid>
            </FormControl>
              <FormControl fullWidth sx={{ marginTop: 0, marginBottom: 0 }}>
                  <Grid container >
                      <Grid item xs={6} position="end">
                          <Typography position="end" variant="h6" align="left" sx={{ marginBottom: 2 }}>In - Monthly Credits From Seller</Typography>   
                      </Grid>
                      <Grid item xs={6}>    
                          <Typography position="end" variant="h6" align="right" sx={{ marginBottom: 2 }}>{formatDollarValue(formData.monthlyCredit)}</Typography>
                      </Grid>
                  </Grid>
              </FormControl>
              <FormControl fullWidth sx={{ marginTop: 0, marginBottom: 0 }}>
                  <Grid container >
                      <Grid item xs={6} position="end">
                          <Typography position="end" variant="h6" align="left" sx={{ marginBottom: 2 }}>In - Buyer to Us Sales Price</Typography>   
                      </Grid>
                      <Grid item xs={6}>    
                          <Typography position="end" variant="h6" align="right" sx={{ marginBottom: 2 }}>{formatDollarValue(sellerFormState.salesPrice)}</Typography>
                      </Grid>
                  </Grid>
              </FormControl>
              <FormControl fullWidth sx={{ marginTop: 0, marginBottom: 0 }}>
                  <Grid container >
                      <Grid item xs={6} position="end">
                          <Typography position="end" variant="h6" align="left" sx={{ marginBottom: 2 }}>In - Option Payment from Buyer</Typography>   
                      </Grid>
                      <Grid item xs={6}>    
                          <Typography position="end" variant="h6" align="right" sx={{ marginBottom: 2 }}>{formatDollarValue(sellerFormState.optionPayment)}</Typography>
                      </Grid>
                  </Grid>
              </FormControl>
              <FormControl fullWidth sx={{ marginTop: 0, marginBottom: 0 }}>
                  <Grid container >
                      <Grid item xs={6} position="end">
                          <Typography position="end" variant="h6" align="left" sx={{ marginBottom: 2 }}>In - Monthly Rent from Buyer</Typography>   
                      </Grid>
                      <Grid item xs={6}>    
                          <Typography position="end" variant="h6" align="right" sx={{ marginBottom: 2 }}>{formatDollarValue(sellerFormState.monthlyRental)}</Typography>
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
                          <Typography position="end" variant="h6" align="right" sx={{ marginBottom: 2 }}>{formatDollarValue(sellerFormState.optionPayment - formData.optionPayment)}</Typography>
                      </Grid>
                  </Grid>
              </FormControl>
              <FormControl fullWidth sx={{ marginTop: 0, marginBottom: 0 }}>
                  <Grid container >
                      <Grid item xs={6} position="end">
                          <Typography position="end" variant="h6" align="left" sx={{ marginBottom: 2 }}>Monthly Cash Flow Received</Typography>   
                      </Grid>
                      <Grid item xs={6}>    
                          <Typography position="end" variant="h6" align="right" sx={{ marginBottom: 2 }}>{formatDollarValue(sellerFormState.monthlyRental - formData.monthlyRental)}</Typography>
                      </Grid>
                  </Grid>
              </FormControl>
              <FormControl fullWidth sx={{ marginTop: 0, marginBottom: 0 }}>
                  <Grid container >
                      <Grid item xs={6} position="end">
                          <Typography position="end" variant="h6" align="left" sx={{ marginBottom: 2 }}>Total Cash Flow Received</Typography>   
                      </Grid>
                      <Grid item xs={6}>    
                          <Typography position="end" variant="h6" align="right" sx={{ marginBottom: 2 }}>{formatDollarValue((sellerFormState.monthlyRental - formData.monthlyRental) * sellerFormState.optionTerm)}</Typography>
                      </Grid>
                  </Grid>
              </FormControl>
              <FormControl fullWidth sx={{ marginTop: 0, marginBottom: 0 }}>
                  <Grid container >
                      <Grid item xs={6} position="end">
                          <Typography position="end" variant="h6" align="left" sx={{ marginBottom: 2 }}>Monthly Credits Difference</Typography>   
                      </Grid>
                      <Grid item xs={6}>    
                          <Typography position="end" variant="h6" align="right" sx={{ marginBottom: 2 }}>{formatDollarValue((formData.monthlyCredit - sellerFormState.monthlyCredits) * sellerFormState.optionTerm)}</Typography>
                      </Grid>
                  </Grid>
              </FormControl>
              <FormControl fullWidth sx={{ marginTop: 0, marginBottom: 0 }}>
                  <Grid container >
                      <Grid item xs={6} position="end">
                          <Typography position="end" variant="h6" align="left" sx={{ marginBottom: 2 }}>Backend Sales Price Received</Typography>   
                      </Grid>
                      <Grid item xs={6}>    
                          <Typography position="end" variant="h6" align="right" sx={{ marginBottom: 2 }}>{formatDollarValue(getBackEnd())}</Typography>
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

export default SellLeaseOptionForm