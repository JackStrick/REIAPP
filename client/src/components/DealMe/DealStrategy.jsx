import React, {useState} from 'react'
import FlexBetween from '../Misc/FlexBetween'
import { Box, Grid, ToggleButton, ToggleButtonGroup, Typography, useTheme, FormControl, InputLabel } from '@mui/material'
import LeaseOptionForm from './Forms/Buy/BuyLeaseOptionForm';
import formsDataStructure from './Forms/Buy/FormsDataStructure';
import SellSellFlipForm from './Forms/Sell/SellSellFlipForm';
import SellRentForm from './Forms/Sell/SellRentForm';
import SellLeaseOptionForm from './Forms/Sell/SellLeaseOptionForm';
import SellSellerFinanceForm from './Forms/Sell/SellSellerFinanceForm';
import BuyWholesaleForm from './Forms/Buy/BuyWholesaleForm';
import SellWholesaleForm from './Forms/Sell/SellWholesaleForm';

function DealStrategy() {
    
    const [buyStrategy, setBuyStrategy] = React.useState(null);
    const [sellStrategy, setSellStrategy] = React.useState(null);
    const [formData, setFormData] = useState(null);

    const handleBuyerToggle = (event, newAlignment) => {
        setBuyStrategy(newAlignment);
        setFormData(formsDataStructure[newAlignment]);
        setSellStrategy(null);
    };

    const handleSellerToggle = (event, newAlignment) => {
        setSellStrategy(newAlignment);
    };


    const theme = useTheme();
    return (
        <Box sx={{marginTop: 2}}>
            <Grid container spacing={2}>
                <Grid item xs={6} >
                    <Typography variant="h4" sx={{ color: theme.palette.secondary[100] }}>
                        Choose Buying Strategy
                    </Typography>
                    <ToggleButtonGroup 
                        color="primary"
                        value={buyStrategy}
                        exclusive
                        onChange={handleBuyerToggle}
                        aria-label="BuyerStrategy"
                        sx={{ marginTop: 1, alignItems: 'center'}}
                    >
                        <ToggleButton value="wholesaling">Wholesaling</ToggleButton>
                        <ToggleButton value="purchase">Purchase</ToggleButton>
                        <ToggleButton value="lease">Lease Option</ToggleButton>
                        <ToggleButton value="seller">Seller Finance</ToggleButton>
                    </ToggleButtonGroup>

                    {buyStrategy === 'wholesaling' && sellStrategy !== null && (
                        <BuyWholesaleForm formData={formData} onChange={setFormData} />
                    )}
                    {buyStrategy === 'lease' && sellStrategy !== null && (
                        <LeaseOptionForm formData={formData} onChange={setFormData} />
                    )}


                </Grid>
                <Grid item xs={6} >
                    <Typography variant="h4" sx={{ color: theme.palette.secondary[100] }}>
                        Choose Selling Strategy
                    </Typography>
                    <ToggleButtonGroup
                        color="primary"
                        value={sellStrategy}
                        exclusive
                        onChange={handleSellerToggle}
                        aria-label="SellerStrategy"
                        sx={{ marginTop: 1}}
                        disabled={!buyStrategy}
                    >
                        <ToggleButton value="wholesaling" disabled={buyStrategy !== 'wholesaling'}>Wholesaling</ToggleButton>
                        <ToggleButton value="sellflip" disabled={buyStrategy === 'wholesaling'}>Sell/Flip</ToggleButton>
                        <ToggleButton value="rent" disabled={buyStrategy === 'wholesaling'}>Rent</ToggleButton>
                        <ToggleButton value="lease" disabled={buyStrategy === 'wholesaling'}>Lease Option</ToggleButton>
                        <ToggleButton value="seller"disabled={buyStrategy === 'wholesaling' || buyStrategy === 'lease'}>Seller Finance</ToggleButton>
                    </ToggleButtonGroup>
                    
                    {sellStrategy === 'wholesaling' && buyStrategy !== null && (
                        <SellWholesaleForm formData={formData}  />
                    )}
                    {sellStrategy === 'sellflip' && buyStrategy !== null && (
                        <SellSellFlipForm formData={formData}  />
                    )}
                    {sellStrategy === 'rent' && buyStrategy !== null && (
                        <SellRentForm formData={formData}  />
                    )}
                    {sellStrategy === 'lease' && buyStrategy !== null && (
                        <SellLeaseOptionForm formData={formData}  />
                    )}
                    {sellStrategy === 'seller' && buyStrategy !== null && (
                        <SellSellerFinanceForm formData={formData}  />
                    )}

                
                </Grid>
            </Grid>
        
        </Box>
    )
}

export default DealStrategy