const jwt = require('jsonwebtoken')

const createToken = async (id, res) => {
    
    const maxAge = 3 * 24 * 60 * 60 // 3 days
    try {
        const token = await jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: maxAge })
        res.cookie('jwt', token, { maxAge: maxAge * 1000, httpOnly: true })
        return token;
    } catch(err){
        console.log(err)
    }
    
}

module.exports = { createToken }
