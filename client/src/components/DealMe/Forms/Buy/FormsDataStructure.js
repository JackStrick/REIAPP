/**
 * formsDataStructure Module
 *
 * @module formsDataStructure
 * @description
 * This module exports an object representing the structure of form data for different scenarios.
 * Each scenario (wholesaling, purchase, lease, seller) has specific fields associated with it.
 * The initial values for each field are set to an empty string.
 *
 * @exports {Object} formsDataStructure - The structure of form data for different scenarios.
 * @property {Object} wholesaling - Form data structure for wholesaling scenario.
 * @property {Object} purchase - Form data structure for purchase scenario.
 * @property {Object} lease - Form data structure for lease scenario.
 * @property {Object} seller - Form data structure for seller financing scenario.
 */
const formsDataStructure = {
	wholesaling: {
		arv: "",
		repairCost: "",
		hedgeExpense: "",
		closingCost: "",
		monthlyHoldingCost: "",
		repairPeriod: "",
		marketingCost: "",
		sellingCost: "",
	},
	purchase: {
		arv: "",
		estPurchasePrice: "",
		propSqft: "",
		costSqft: "",
		repairCost: "",
		hedgeExpense: "",
		repairPeriod: "",
		monthlyHoldingCost: "",
		closingCost: "",
		propertyInsurance: "",
		propertyTax: "",
		hoa: "",
	},
	lease: {
		salesPrice: "",
		optionPayment: "",
		monthlyRental: "",
		monthlyCredit: "",
		leaseTerm: "",
	},
	seller: {
		arv: "",
		estPurchasePrice: "",
		propSqft: "",
		costSqft: "",
		repairCost: "",
		hedgeExpense: "",
		repairPeriod: "",
		monthlyHoldingCost: "",
		closingCost: "",
		propertyInsurance: "",
		propertyTax: "",
		hoa: "",
		loanAmount: "",
		downPayment: "",
		interestRate: "",
		amortizationTerm: "",
		balloonTerm: "",
		monthlyPayment: "",
	},
};

export default formsDataStructure;
