const User = require('../models/userModel');
var bcrypt = require('bcryptjs');
const { createToken } = require('../utils/createToken');

const createUser = async(req, res) => {
    const { username, password } = req.body

    if(!username || !password) { 
        return res.status(400).send("All fields are required") 
    }

    if(await User.exists({ username })) return res.status(400).send("User already exists")

    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds = 10);

    try{
        const user = await User.create({
            username, 
            password: hashedPassword,
        })

        await createToken(user._id, res)
   
        res.status(201).json({ id: user._id, username: user.username })
    } catch(err){
        res.status(400).json("Something went wrong, try again or come back later")
    }

}

const loginUser = async(req, res) => {
    const { username, password } = req.body

    try {
        const user = await User.findOne({ username });
        const correctPassword = await bcrypt.compare(password, user.password)
        if (!correctPassword || !user) return res.status(400).send("Invalid username or password")

        await createToken(user._id, res)
    
        res.status(200).json({ id: user._id, username: user.username })
        
    } catch(err) {
        res.status(400).json(err)
    }

}

const getAllUsers = async(req, res) => {
    try{
        const allUsers = await User.find({}, {username: 1, _id: 1})
        res.status(200).json(allUsers)
    } catch(err){
        return res.status(400).json("Something went wrong, try again or come back later")
    }
}

const getSingleUser = async(req, res) => {

    try{
        const user = await User.find({ _id: req.params.id }, {username: 1, _id: 1})
        res.status(200).json(user)
    } catch(err){
        return res.status(400).json("Something went wrong, try again or come back later")
    }
}

const searchUser = async(req, res) => {

    try{
        const users = await User.find({ username: { $regex: req.params.search, $options: 'i' }, _id: { $ne: req.verifiedUser.id}}, {username: 1, _id: 1})
        res.status(200).json(users)
    } catch(err){
        return res.status(400).json(err.message)
    }
}

const logoutUser = async(req, res) => {
 
    try{
        res.cookie('jwt', "goodbye", { maxAge: 1, httpOnly: true })
        res.send("cleared")
    } catch(err) {
        res.send(err.message)
    }
    
}



module.exports = { createUser, loginUser, getAllUsers, getSingleUser, logoutUser, searchUser }