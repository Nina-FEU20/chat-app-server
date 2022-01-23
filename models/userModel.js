const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        match: [/^[a-zA-Z\s]*$/, 'Alphabetical characters only']
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        min: [8, 'Password require minimum of 8 characters'],

    },
    isOnline: { type: Boolean, required: true, default: false}
}, 
{ timestamps: true }
)


module.exports = mongoose.model('User', userSchema);