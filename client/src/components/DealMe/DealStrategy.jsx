import React, { useState } from "react";
import {
	Box,
	Grid,
	ToggleButton,
	ToggleButtonGroup,
	Typography,
	useTheme,
} from "@mui/material";
import formsDataStructure from "./Forms/Buy/FormsDataStructure";
import LeaseOptionForm from "./Forms/Buy/BuyLeaseOptionForm";
import BuyWholesaleForm from "./Forms/Buy/BuyWholesaleForm";
import BuyPurchaseForm from "./Forms/Buy/BuyPurchaseForm";
import BuySellerFinanceForm from "./Forms/Buy/BuySellerFinanceForm";
import SellSellFlipForm from "./Forms/Sell/SellSellFlipForm";
import PurchaseRentForm from "./Forms/Sell/PurchaseRentForm";
import SellLeaseOptionForm from "./Forms/Sell/SellLeaseOptionForm";
import SellSellerFinanceForm from "./Forms/Sell/SellSellerFinanceForm";
import SellWholesaleForm from "./Forms/Sell/SellWholesaleForm";
import SellerFinanceSellFlip from "./Forms/Sell/SellerFinanceSellFlip";
import LeaseOptionSellFlip from "./Forms/Sell/LeaseOptionSellFlip";
import LeaseOptionRent from "./Forms/Sell/LeaseOptionRent";
import SellerFinanceRent from "./Forms/Sell/SellerFinanceRent";
import PurchaseLeaseOption from "./Forms/Sell/PurchaseLeaseOption";
import SellerFinanceLeaseOption from "./Forms/Sell/SellerFinanceLeaseOption";
import SellerFinanceSellerFinance from "./Forms/Sell/SellerFinanceSellerFinance";

/**
 * DealStrategy component for selecting buying and selling strategies.
 * Renders toggle buttons for choosing buying and selling strategies.
 * Renders forms based on selected strategies.
 * @returns {JSX.Element} - Rendered DealStrategy component.
 */
function DealStrategy() {
	// Local state to manage selected buying and selling strategies
	const [buyStrategy, setBuyStrategy] = React.useState(null);
	const [sellStrategy, setSellStrategy] = React.useState(null);
	// Local state to store form data based on selected buying strategy
	const [formData, setFormData] = useState(null);

	// Handle buying strategy toggle button change
	const handleBuyerToggle = (event, newAlignment) => {
		setBuyStrategy(newAlignment);
		setFormData(formsDataStructure[newAlignment]);
		setSellStrategy(null);
	};

	// Handle selling strategy toggle button change
	const handleSellerToggle = (event, newAlignment) => {
		setSellStrategy(newAlignment);
	};

	const theme = useTheme();

	return (
		<Box sx={{ marginTop: 2 }}>
			<Grid container spacing={2}>
				<Grid item xs={6}>
					<Typography
						variant="h4"
						sx={{ color: theme.palette.secondary[100] }}
					>
						Choose Buying Strategy
					</Typography>
					<ToggleButtonGroup
						color="primary"
						value={buyStrategy}
						exclusive
						onChange={handleBuyerToggle}
						aria-label="BuyerStrategy"
						sx={{ marginTop: 1, alignItems: "center" }}
					>
						<ToggleButton value="wholesaling">
							Wholesaling
						</ToggleButton>
						<ToggleButton value="purchase">Purchase</ToggleButton>
						<ToggleButton value="lease">Lease Option</ToggleButton>
						<ToggleButton value="seller">
							Seller Finance
						</ToggleButton>
					</ToggleButtonGroup>

					{buyStrategy === "wholesaling" && sellStrategy !== null && (
						<BuyWholesaleForm
							formData={formData}
							onChange={setFormData}
						/>
					)}
					{buyStrategy === "purchase" && sellStrategy !== null && (
						<BuyPurchaseForm
							formData={formData}
							onChange={setFormData}
						/>
					)}
					{buyStrategy === "lease" && sellStrategy !== null && (
						<LeaseOptionForm
							formData={formData}
							onChange={setFormData}
						/>
					)}
					{buyStrategy === "seller" && sellStrategy !== null && (
						<BuySellerFinanceForm
							formData={formData}
							onChange={setFormData}
						/>
					)}
				</Grid>
				<Grid item xs={6}>
					<Typography
						variant="h4"
						sx={{ color: theme.palette.secondary[100] }}
					>
						Choose Selling Strategy
					</Typography>
					<ToggleButtonGroup
						color="primary"
						value={sellStrategy}
						exclusive
						onChange={handleSellerToggle}
						aria-label="SellerStrategy"
						sx={{ marginTop: 1 }}
						disabled={!buyStrategy}
					>
						<ToggleButton
							value="wholesaling"
							disabled={buyStrategy !== "wholesaling"}
						>
							Wholesaling
						</ToggleButton>
						<ToggleButton
							value="sellflip"
							disabled={buyStrategy === "wholesaling"}
						>
							Sell/Flip
						</ToggleButton>
						<ToggleButton
							value="rent"
							disabled={buyStrategy === "wholesaling"}
						>
							Rent
						</ToggleButton>
						<ToggleButton
							value="lease"
							disabled={buyStrategy === "wholesaling"}
						>
							Lease Option
						</ToggleButton>
						<ToggleButton
							value="seller"
							disabled={
								buyStrategy === "wholesaling" ||
								buyStrategy === "lease"
							}
						>
							Seller Finance
						</ToggleButton>
					</ToggleButtonGroup>

					{sellStrategy === "wholesaling" && buyStrategy !== null && (
						<SellWholesaleForm formData={formData} />
					)}
					{sellStrategy === "sellflip" &&
						buyStrategy === "purchase" && (
							<SellSellFlipForm formData={formData} />
						)}
					{sellStrategy === "sellflip" && buyStrategy === "lease" && (
						<LeaseOptionSellFlip formData={formData} />
					)}
					{sellStrategy === "sellflip" &&
						buyStrategy === "seller" && (
							<SellerFinanceSellFlip formData={formData} />
						)}
					{sellStrategy === "rent" && buyStrategy === "purchase" && (
						<PurchaseRentForm formData={formData} />
					)}
					{sellStrategy === "rent" && buyStrategy === "lease" && (
						<LeaseOptionRent formData={formData} />
					)}
					{sellStrategy === "rent" && buyStrategy === "seller" && (
						<SellerFinanceRent formData={formData} />
					)}
					{sellStrategy === "lease" && buyStrategy === "lease" && (
						<SellLeaseOptionForm formData={formData} />
					)}
					{sellStrategy === "lease" && buyStrategy === "purchase" && (
						<PurchaseLeaseOption formData={formData} />
					)}
					{sellStrategy === "lease" && buyStrategy === "seller" && (
						<SellerFinanceLeaseOption formData={formData} />
					)}
					{sellStrategy === "seller" &&
						buyStrategy === "purchase" && (
							<SellSellerFinanceForm formData={formData} />
						)}
					{sellStrategy === "seller" && buyStrategy === "seller" && (
						<SellerFinanceSellerFinance formData={formData} />
					)}
				</Grid>
			</Grid>
		</Box>
	);
}

export default DealStrategy;
