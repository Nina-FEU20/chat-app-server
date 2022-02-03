const Chat = require('../models/chatModel');
const User = require('../models/userModel');
const Message = require('../models/messageModel');

const getOrCreateOneOnOneChat = async (req, res) => {
  const verifiedUserId = req.verifiedUser.id;
  const { user } = req.body;

  if (!user) {
    return res.status(400).send('UserId param not sent with request');
  }

  var isChat = await Chat.find({
    isGroupChat: false,
    $and: [{ users: { _id: verifiedUserId } }, { users: { _id: user._id } }],
  }).populate('users', '-password');

  if (isChat.length > 0) {
    res.status(200).send(isChat[0]);
  } else {
    const newChat = {
      chatName: '',
      isGroupChat: false,
      users: [verifiedUserId, user._id],
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
  if (!req.body.users) {
    return res.status(400).send('Please add users');
  }

  const verifiedUserId = req.verifiedUser.id;

  let users = req.body.users;

  users.push(verifiedUserId);

  try {
    const groupChat = await Chat.create({
      chatName: req.body.name || '',
      users: users,
      isGroupChat: true,
    });

    const fullGroupChat = await Chat.findOne({ _id: groupChat._id }).populate('users', '-password');

    res.status(200).json(fullGroupChat);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getChatById = async (req, res) => {
  const id = req.params.id;

  try {
    const chat = await Chat.findOne({ _id: id }).populate('users', '-password');
    res.status(200).json(chat);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getChatsForCurrentUser = async (req, res) => {
  const verifiedUserId = req.verifiedUser.id;

  try {
    const chats = await Chat.find({ users: { _id: verifiedUserId } }).populate('users', '-password');

    res.status(200).json(chats);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

module.exports = {
  getChatsForCurrentUser,
  createGroupChat,
  getChatById,
  getOrCreateOneOnOneChat,
};
