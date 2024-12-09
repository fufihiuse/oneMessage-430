const models = require('../models');
const io = require('../io');
const { Message } = models;

let currentMessage = 'N/A'
let currentName = 'N/A'

const getMessage = async () => {
    try {
        const doc = await Message.findOne({}).sort({ 'createdDate': 'descending' }).lean().exec();

        if (doc) {
            currentMessage = doc.message;
            currentName = doc.name;
        }
    } catch (err) {
        console.log(err);
    }
};
getMessage();

const index = (req, res) => {
    return res.render('index', {
        currentName,
        currentMessage,
    });
};

const setMessage = async (req, res) => {
    if (!req.body.name || !req.body.message) {
        return res.status(400).json({ error: 'Name and Message are required.' });
    }

    currentName = req.body.name.slice(0, 1000);
    currentMessage = req.body.message.slice(0, 10000);

    try {
        const messageData = {
            name: currentName,
            message: currentMessage,
        };

        const firstMessage = new Message(messageData);
        await firstMessage.save();
        io.handleNewMessage(messageData);
    } catch (err) {
        console.log(err);
        throw err;
    }

    return res.redirect('/'); // Too lazy to override default form behavior
}

module.exports = {
    index,
    setMessage,
}