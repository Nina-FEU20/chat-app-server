const jwt = require('jsonwebtoken')

const createToken = async (id, res) => {

    const payload = {
        exp: Math.floor(Date.now() / 1000) + (60 * 60), // makes the token valid for one hour
        id: id,
    }
    
    try {
        const token = await jwt.sign(payload, process.env.JWT_SECRET)

        res.cookie('auth-token', token)
        return token;
    } catch(err){
        console.log(err)
    }
    
}

module.exports = { createToken }