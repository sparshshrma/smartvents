const mongoose = require("mongoose");
const express = require('express');
const ventModel = require('../../models/vents.js');
const app = express.Router();


app.get("/vents/:id", async (req,res)=>{
try {
    const vent = await ventModel.find({deviceID: req.params.deviceID}).exec();
    res.json(vent);
  } catch (error) {
    res.status(500).send({ error: 'An error occurred while retrieving the vents.' });
  }
});

app.get("/vents",async (req,res)=>{ 
    const vents = await ventModel.find();  
    try{
        res.send(vents);
    }catch(error){
        res.status(500).send(error);
    }
});

app.post("/vents", async (req, res) => {
    const roomModel = require('../../models/room.js');
    console.log("closeModal=====>",req.body)
    const vent = new ventModel(req.body);
   // const roomObj = await roomModel.findById(vent.room);
    
   /* if (!roomObj) {
      res.status(404).send({ error: 'Room does not exist' });
      return;
    } */
  
    try {
     // roomObj.vents.push(vent._id);
      await vent.save();
   //   await roomObj.save();
      console.log("vent=====>",vent)
      res.send(vent);
    } catch (error) {
      console.log("error=====>",error);
      res.status(500).send({ error: 'An error occurred while adding the vent' });
    }
  });
  
app.patch("/vents/:id", async (req,res)=>{
    try{
        await findByIdAndUpdate(req.params.id, req.body);
        await save();
    }catch (error){
        response.status(500).send(error);
    }
});

app.delete("/vents", async (req, res) => {
    try {
      console.log(req.body.id);
      const vent = await findByIdAndDelete(req.body.id);
  
      if (!vent) {
        res.status(404).send("No vent found");
        return;
      }
  
      res.status(200).send();
    } catch (error) {
      res.status(500).send({ error: 'An error occurred while deleting the vent' });
    }
  });      

module.exports = app;