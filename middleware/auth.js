const jwt = require('jsonwebtoken')


const requireAuth = async (req, res, next) => {

    const token = req.cookies.jwt;
    if (!token) return res.status(401).send("Access denied")

    try {
        const verifiedUser = await jwt.verify(token, process.env.JWT_SECRET);
        req.verifiedUser = verifiedUser;
        next();
    } catch (err) {
        res.status(401).send(err.message)
    }
}

module.exports = { requireAuth }