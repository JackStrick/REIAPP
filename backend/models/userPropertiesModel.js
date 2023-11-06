const mongoose = require('mongoose')

const userPropertySchema = mongoose.Schema({
    
    
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    
    propertyId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    
    }
        
},
{
    timestamps: true
})

module.exports = mongoose.model('user_properties', userPropertySchema)