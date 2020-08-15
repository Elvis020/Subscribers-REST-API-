const express = require('express')
const router = express.Router();
const SubscribersModel = require('../model/dbModel');


// Creating a middleware- a default handler function 🥰 
async function getSubscriber(req, res, next) {
    let subscriber
    try {
        subscriber = await SubscribersModel.findById(req.params.id)
        if (subscriber == null) {
            return res.status(404).json({ message: "Cannot find subscriber" })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }

    res.subscriber = subscriber;
    // This allows use to move on to  the next 
    // function that follows. It illustrates that the function is done and moves on.
    next();
}



// List of routers we need
// 1. For getting all subscribers
router.get('/', async (req, res) => {
    try {
        const subscribers = await SubscribersModel.find();
        res.json(subscribers);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})
// 2. For getting one subscriber
router.get('/:id', getSubscriber, (req, res) => {
    res.send(res.subscriber)
})


// 3. For creating  subscriber
router.post('/', async (req, res) => {
    const subscriber = new SubscribersModel({
        name: req.body.name,
        subcribeToChannel: req.body.subcribeToChannel
    })
    try {
        const newSubscriber = await subscriber.save();
        res.status(201).json(newSubscriber)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})



// 4. For updating  subscriber
router.patch('/:id', getSubscriber,async (req, res) => {
    if(req.body.name != null){
        res.subscriber.name = req.body.name 
    }
    if(req.body.subcribeToChannel != null){
        res.subscriber.subcribeToChannel = req.body.subcribeToChannel
    }
    try {
        // Saves updated content to db
        const updatedSubscriber = await res.subscriber.save();
        res.json(updatedSubscriber)
    }catch(err) {
        res.status(400).json({message: err.message})
    }

})


// 5. For deleting subscriber
router.delete('/:id', getSubscriber, async (req, res) => {
    try {
        res.subscriber.remove();
        res.json({ message: "Subscriber deleted! 🥰" })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})




module.exports = router