// ROOM ROUTING

const express = require('express');
const router = express.Router();
const Room = require('../../models/room.js');

 

// Get all rooms
router.get('/rooms', async (req, res) => {
  try {
    const rooms = await Room.find();
    res.json(rooms);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while retrieving the rooms.' });
  }
});

 

// Get a specific room by ID
router.get('/rooms/:id', async (req, res) => {
  try {
    
    const room = await Room.findById(req.params.id);
    if (!room) {
      return res.status(404).json({ error: 'Room not found.' });
    }
    res.json(room);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while retrieving the room.' });
  }
});

 

// Create a new room
router.post('/rooms', async (req, res) => {
  try {
    const buildingModel = require('../../models/building.js');
    const room = new Room(req.body);
    const buildingObj = await buildingModel.findById(room.building); //changed await
    //validates that the building exists
    console.log(room,buildingObj); //changed

    if(!buildingObj){
      throw Error("Building does not exist");
    }
    //validates that the floor that the room is on isn't higher than the the buildings floors
    if(room.floor>buildingObj.floors){
      throw Error("Floor is greater than the number of floors that the building has");
    }
    //adds rooms to the buildings array
    await room.save();
    buildingObj.rooms.addToSet(room._id);
    await buildingObj.save();
    res.status(201).json(room);
  } catch (error) {
    res.status(500).json({ error:'An error occurred while creating the room.' });
  }
});

 

// Update a room by ID
router.patch('/rooms/:id', async (req, res) => {
  try {
    const room = await Room.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!room) {
      return res.status(404).json({ error: 'Room not found.' });
    }
    res.json(room);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while updating the room.' });
  }
});

 

// Delete a room by ID
router.delete('/rooms/:id', async (req, res) => {
  try {
    console.log(req.params.id)
    const room = await Room.findByIdAndDelete(req.params.id);
    if (!room) {
      return res.status(404).json({ error: 'Room not found.' });
    }
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while deleting the room.' });
  }
});

module.exports = router;