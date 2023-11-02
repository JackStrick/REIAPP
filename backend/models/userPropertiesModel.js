const mongoose = require('mongoose')

const userPropertySchema = mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    userId: mongoose.Schema.Types.ObjectId,
    propertyId: mongoose.Schema.Types.ObjectId,
    
},
{
    timestamps: true
})

module.exports = mongoose.model('user_properties', userPropertySchema)