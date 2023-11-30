const mongoose = require('mongoose')

const propertyAnalyticsSchema = mongoose.Schema({
    
    
    zpid: {
        type: String,
        required: true,
    },
    
    estimatedValue: {
        type: String,
    },
    valuePrevMonth: {
        type: String,
    },
    potentialEquity: {
        type: String,
    },
    estimatedLoanBalance: {
        type: String,
    },
    medianPrice: {
        type: String,
    },
    estimatedMortgage: {
        type: String,
    },
    rentZestimate: {
        type: String,
    },
    potentialCashFlow: {
        type: String,
    },
    lastSoldDate: {
        type: String,
    },        
    primarySchool: {
        type: String,
    },
    middleSchool: {
        type: String,
    },
    highSchool: {
        type: String,
    },
   
},
{
    timestamps: false
})

module.exports = mongoose.model('property_analytics', propertyAnalyticsSchema)