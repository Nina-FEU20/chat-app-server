const Chat = require('../models/chatModel');
const User = require('../models/userModel');
const Message = require ('../models/messageModel');


const accessChat = async (req, res) => {
  const { userId } = req.body;
  const tempId = '61ee06332ce9392a507e4680'

  if (!userId) {
    return res.status(400).send('UserId param not sent with request');
  }

  var isChat = await Chat.find({
    isGroupChat: false,
    $and: [{ users: { _id: tempId } }, { users: { _id: userId } } ],
  })
  .populate('users', '-password')

  if (isChat.length > 0) {
    res.status(200).send(isChat[0]);
  } else {
    const newChat = {
      chatName: '',
      isGroupChat: false,
      users: [tempId, userId],
    };

    try {
      const createdChat = await Chat.create(newChat);
      const FullChat = await Chat.findOne({ _id: createdChat._id }).populate('users', '-password');
      res.status(201).json(FullChat);
    } catch (error) {
      res.status(400).send(error.message);
    }
  }
};


const createGroupChat = async (req, res) => {
  if (!req.body.users || !req.body.name) {
    return res.status(400).send('Please add users and a groupname');
  }

  const tempId = '61ee06332ce9392a507e4680'

  var users = JSON.parse(req.body.users);

  if (users < 2) {
    return res.status(400).send('More than 2 users are required to form a group chat');
  }

  console.log(users)

  users.push(tempId);

  try {
    const groupChat = await Chat.create({
      chatName: req.body.name,
      users: users,
      isGroupChat: true,
    });

    const fullGroupChat = await Chat.findOne({ _id: groupChat._id }).populate('users', '-password')

    res.status(200).json(fullGroupChat);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getChatById = async(req, res) => {
    const id = req.params.id
    console.log(id)

    try{
        const chat = await Chat.findOne({ _id: id }).populate('users', '-password')
        res.status(200).json(chat)
    } catch(error){
        res.status(400).send(error.message)
    }
}

const getChatsForCurrentUser = async (req, res) => {
    const tempId = '61ee06332ce9392a507e4680'
  try {
      const chats = await Chat.find({ users: { _id: tempId }}).populate('users', '-password')
      res.status(200).json(chats)
  } catch (error) {
    res.status(400).json(error.message);
  }
};


module.exports = {
  accessChat,
  getChatsForCurrentUser,
  createGroupChat,
  getChatById,
};