const mongoose = require('mongoose')
const express = require('express')
const cors = require('cors')
const config = require('./config.json')

mongoose.connect(config.connectionString)

const app = express()
app.use(cors({
    origin: "*",
}))
app.use(express.json())


app.get("/",(req, res) => {
    res.json({data: "hello"})
})

const FullStack = require("./models/FullStack")
const ReactJS = require("./models/ReactJS")
const JS = require("./models/JSProjects")
const error = require("jsonwebtoken/lib/JsonWebTokenError");


app.post("/addFullStackProject", async (req, res) => {
    try {
        const newProject = new FullStack(req.body);
        await newProject.save();
        res.status(201).json({ message: "FullStack Project added", project: newProject });
    } catch (error) {
        res.status(500).json({ message: "Error adding project", error: error.message });
    }
});
app.post("/addReactJSProject", async (req, res) => {
    try {
        const newProject = new ReactJS(req.body);
        await newProject.save();
        res.status(201).json({ message: "ReactJS Project added", project: newProject });
    } catch (error) {
        res.status(500).json({ message: "Error adding project", error: error.message });
    }
});
app.post("/addJSProject", async (req, res) => {
    try {
        const newProject = new JS(req.body);
        await newProject.save();
        res.status(201).json({ message: "JS Project added", project: newProject });
    } catch (error) {
        res.status(500).json({ message: "Error adding project", error: error.message });
    }
});


app.get("/getFullStackProjects", async (req, res) => {
    try {
        const projects = await FullStack.find();
        res.status(200).json(projects);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});
app.get("/getReactJSProjects", async (req, res) => {
    try {
        const projects = await ReactJS.find();
        res.status(200).json(projects);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});
app.get("/getJSProjects", async (req, res) => {
    try {
        const projects = await JS.find();
        res.status(200).json(projects);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});


app.put("/updateFullStackProject/:id", async (req, res) => {
    const id = req.params.id;
    try{
        const updatedProject = await FullStack.findByIdAndUpdate(id, req.body, {new: true});
        if (!updatedProject) {
            res.status(404).json({ message: "FullStack not found", error: error.message });
        }
        res.status(200).json(updatedProject);
    }catch(error){
        res.status(500).json({ message: "Error updating project", error: error.message });
    }
})
app.put("/updateReactJSProject/:id", async (req, res) => {
    const id = req.params.id;
    try{
        const updatedProject = await ReactJS.findByIdAndUpdate(id, req.body, {new: true});
        if (!updatedProject) {
            res.status(404).json({ message: "ReactJS not found", error: error.message });
        }
        res.status(200).json(updatedProject);
    }catch(error){
        res.status(500).json({ message: "Error updating project", error: error.message });
    }
})
app.put("/updateJSProject/:id", async (req, res) => {
    const id = req.params.id;
    try{
        const updatedProject = await JS.findByIdAndUpdate(id, req.body, {new: true});
        if (!updatedProject) {
            res.status(404).json({ message: "JS not found", error: error.message });
        }
        res.status(200).json(updatedProject);
    }catch(error){
        res.status(500).json({ message: "Error updating project", error: error.message });
    }
})




const port = process.env.PORT || 3000
app.listen(port);

module.exports = app;


