const Publication = require("../Models/publication");
const Message = require("../Models/message");
const http = require('http');
const socketIo = require('socket.io');

exports.acceptOffer = async (req, res) => {
  try {
    const offerId = req.params.offerId;
    const offer = await publication.findById(offerId);
    if (!offer) {
      return res.status(404).json({ status: 'failed', msg: 'Offer not found' });
    }
    offer.status = 'accepted';
    await offer.save();
    return res.status(200).json({ status: 'success', msg: 'Offer accepted' });
  } catch (err) {
    return res.status(500).json({ status: 'failed', err });
  }
};

exports.suggestNegotiation = async (req, res) => {
    try {
        const offerId = req.params.offerId;
        const { senderId, receiverId, messageText } = req.body;

        const senderMessage = new Message({
            offerId: offerId,
            senderId: senderId,
            receiverId: receiverId,
            message: messageText,
            isSender: true
        });

        await senderMessage.save();

        io.to(senderId).emit('messageSent', senderMessage);

        const receiverMessage = new Message({
            offerId: offerId,
            senderId: senderId,
            receiverId: receiverId,
            message: messageText,
            isSender: false
        });

        await receiverMessage.save();

        const receiverSocket = io.sockets.sockets.get(receiverId);
        if (receiverSocket) {
            receiverSocket.emit('messageReceived', receiverMessage);

            receiverMessage.seen = true;
            await receiverMessage.save();
        }

        return res.status(200).json({ status: 'success', msg: 'Negotiation suggested and messages sent' });
    } catch (err) {
        return res.status(500).json({ status: 'failed', err });
    }
};
