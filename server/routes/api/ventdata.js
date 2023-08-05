/**
 * Author Juniper Grunow
 * Date: 6/6/2023
 */
const mongoose = require('mongoose');
const express = require('express');
const ventDataModel = require("../../models/ventdata.js");
const app = express();

//Retrieves a vent data object
app.get("/ventData/:owner", async (req, res) =>{
    //this needs to validated, passing user's id
    const ventData = await ventDataModel.find({owner: req.params.user.id});

    try{
        res.send(ventData);
    }catch (error){
        res.status(500).send(error);
    }
});
app.get("/ventDataByDeviceId/:deviceId", async (req, res) => {
    //this needs to validate, passing user's id
    const ventData = await ventDataModel.find({deviceID: req.params.deviceId});
    console.log("ventData", ventData);
    if (ventData && ventData.length && ventData[0].data && ventData[0].data.length > 0) {
        const data = ventData[0].data.filter((vent) => vent.length === 2 && vent[0] < 90 && vent[1] < 90 && vent[0] > -20 && vent[1] > -20);
        ventData[0].data = data;
        try {
            res.send(
              ...ventData
            );
        } catch (error) {
            res.status(500).send(error);
        }
    }
});
//Creates a new vent data object
app.post("/ventData", async (req, res) =>{  
    const ventData = new ventDataModel(req.body);

    try{
        await ventData.save();
        response.send(ventData);
    }catch(error){
        res.status(500).send(error);
    }
});

app.delete("/ventData/:id", async(req,res)=>{
    try{
        const ventData = await ventDataModel.findByIdAndDelete(req.params.id).exec();
        res.send(ventData);
    }catch (error){
        res.status(500).send(error);
    }
});



module.exports=app;