const eventsModel = require("../models/events");
const notificationModel = require("../models/notification");

const addEvent = async (req, res) => {
    try {
        let event = await eventsModel.create(req.body)
        res.status(200).send({ success: "Event added",event})
       await notificationModel.create({body:event._id})

    } catch (err) {
        console.log(err);
        if (err.name === 'ValidationError') {
            res.status(400).send({ error: "Validation Error", message: err.message })
        } else if (err.code === 11000) {
            res.status(420).send({ error: "Duplicate Event Error", message: 'Event already exists' })
        } else if (err.name === 'CastError') {
        res.status(469).send({ error: "Cast Error", message: `Enter proper data format` })
        } else {
            res.status(500).send({ error: "Server Error", message:  err.message })
        }
    }
}


const updateEvent = async (req, res) => {
    const { eventName, participants, type, description, rounds, guidlines, contact, maxTeamSize, minTeamSize } = req.body
        let change = false
        let prevEventData = await eventsModel.findOne({ eventName })
        await notificationModel.create({body:prevEventData._id})

        if (participants && prevEventData.participants !== participants) {
            prevEventData.participants = participants
            change = !change
        }
        if (type && prevEventData.type !== type) {
            prevEventData.type = type
            change = !change
        }
        if (description && prevEventData.description !== description) {
            prevEventData.description = description
            change = !change
        }
        if (rounds && prevEventData.rounds !== rounds) {
            prevEventData.rounds = rounds
            change = !change
        }
        if (guidlines && prevEventData.guidlines !== guidlines) {
            prevEventData.guidlines = guidlines
            change = !change
        }
        if (contact && JSON.stringify(prevEventData.contact) !== JSON.stringify(contact)) {
            prevEventData.contact = contact
            change = !change
        }
        if (maxTeamSize && prevEventData.maxTeamSize !== maxTeamSize) {
            prevEventData.maxTeamSize = maxTeamSize
            change = !change
        }
        if (minTeamSize && prevEventData.minTeamSize !== minTeamSize) {
            prevEventData.minTeamSize = minTeamSize
            change = !change
        }
         if(change){
            try {
                await prevEventData.save()   
            } catch (error) {
                res.status(401).send({ error: "Internal Error", message: "please try again" })
            }
           
            res.status(200).send({ success: "Event updated"})
        } else {
            res.status(200).send({ success: "Event updated" })}
        
}

const deleteEvent = async (req, res) => {
     const deletedEvent  = await eventsModel.findOneAndDelete({ eventName: req.body.eventName })
     await notificationModel.create({body:deletedEvent._id})
    res.status(200).send({ success: "Event deleted successfully" })
}

 const getEvents = async (req, res) => {
  try {
    const Events = await eventsModel.find();
    res.json(Events);
    // console.log(projects);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error:' });
  }
};



module.exports = { addEvent,updateEvent,deleteEvent,getEvents}