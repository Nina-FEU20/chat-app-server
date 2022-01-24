const User = require('../models/userModel');
var bcrypt = require('bcryptjs');

const createUser = async(req, res) => {
    const { username, password } = req.body

    if(!username || !password) return res.status(400).json({ error: "Name and password is required"})

    if(await User.exists({ username })) return res.status(400).send({error: "User already exists"})

    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds = 10);

    try{
        const user = await User.create({
            username, 
            password: hashedPassword,
        })
   
        res.status(201).json({ id: user._id, username: user.username })
    } catch(err){
        res.status(400).json({error: err})
    }

}

const loginUser = async(req, res) => {
    const { username, password } = req.body

    const user = await User.findOne({ username });
    if (!user) return res.status(400).send("Invalid username or password")

    const correctPassword = await bcrypt.compare(password, user.password)
    if (!correctPassword) return res.status(400).send("Invalid username or password")

    if(user) res.send({ id: user._id, username: user.username })
    else res.send("Something went wrong")

}

module.exports = { createUser, loginUser }