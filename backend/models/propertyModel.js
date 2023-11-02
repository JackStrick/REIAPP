const mongoose = require('mongoose')

const propertySchema = mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    PropertyType: String,
    PropertyAddress: String,
    StreetName: String,
    City: String,
    State: String,
    ZipCode: String,
    County: String,
    OwnerName: String,
    OwnerAddress: String,
    OwnerCity: String,
    OwnerState: String,
    OwnerZip: String,
    PropUsage: String,
    LotSize: Number,
    YearBuilt: String,
    Style: String,
    Bedroom: Number,
    Bathroom: Number,
    AssessedValue: Number,
    TaxAmount: Number,
    LatestSaleDate: String,
    LatestSalePrice: Number,
    LatestMortgageDate: String,
    LatestMortgageAmount: Number,
    Lat: String,
    Lng: String,
},
{
    timestamps: true
})

module.exports = mongoose.model('Property', propertySchema)