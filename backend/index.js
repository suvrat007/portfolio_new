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
const TopFour = require("./models/TopFour")
const Tech = require("./models/Technologies")
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
app.post("/addTopFourProject", async (req, res) => {
    try {
        console.log("Received data:", req.body);  // Debugging line

        const newProject = new TopFour(req.body);
        await newProject.save();

        res.status(201).json({ message: "Added to Top Four", project: newProject });
    } catch (error) {
        console.error("Error adding project:", error);  // Improved error logging
        res.status(500).json({ message: "Error adding project", error: error.message });
    }
});


app.delete("/deleteTopFourProject/:id", async (req, res) => {
    const {id} = req.params;
    try {
        const deletedCategory = await TopFour.findOneAndDelete({_id:id});

        if (!deletedCategory) {
            return res.status(404).json({ message: "Category not found" });
        }

        res.json({ message: `Deleted category '${id}'`, deletedCategory });
    } catch (err) {
        res.status(500).json({ message: "Error deleting category", error: err });
    }
})


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
app.get("/getTopFourProjects", async (req, res) => {
    try {
        const projects = await TopFour.find();
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
app.put("/updateTopFourProject/:id", async (req, res) => {
    const id = req.params.id;
    try{
        const updatedProject = await TopFour.findByIdAndUpdate(id, req.body, {new: true});
        if (!updatedProject) {
            res.status(404).json({ message: "TopFour not found", error: error.message });
        }
        res.status(200).json(updatedProject);
    }catch(error){
        res.status(500).json({ message: "Error updating project", error: error.message });
    }
})

// Technologies
app.get("/technologies", async (req, res) => {
    try {
        const techs = await Tech.find();
        res.status(200).json(techs);
    } catch (err) {
        res.status(500).json({ message: "Error fetching technologies", error: err });
    }
});
app.post("/technologies/add-category", async (req, res) => {
    const { category } = req.body;

    try {
        const existingCategory = await Tech.findOne({ category });
        if (existingCategory) {
            return res.status(400).json({ message: "Category already exists" });
        }

        const newCategory = new Tech({ category, technologies: [] });
        await newCategory.save();

        res.json({ message: `Category '${category}' added successfully!` });
    } catch (err) {
        res.status(500).json({ message: "Error adding category", error: err });
    }
});
app.post("/technologies/:category", async (req, res) => {
    const { category } = req.params;
    const { technology } = req.body;

    try {
        const categoryDoc = await Tech.findOne({ category });

        if (!categoryDoc) {
            return res.status(404).json({ message: "Category not found" });
        }

        if (categoryDoc.technologies.includes(technology)) {
            return res.status(400).json({ message: "Technology already exists" });
        }

        categoryDoc.technologies.push(technology);
        await categoryDoc.save();

        res.json({ message: `Added ${technology} to ${category}`, updatedCategory: categoryDoc });
    } catch (err) {
        res.status(500).json({ message: "Error adding technology", error: err });
    }
});
app.delete("/technologies/:category/:technology", async (req, res) => {
    const { category, technology } = req.params;

    try {
        const categoryDoc = await Tech.findOne({ category });

        if (!categoryDoc) {
            return res.status(404).json({ message: "Category not found" });
        }

        categoryDoc.technologies = categoryDoc.technologies.filter((tech) => tech !== technology);
        await categoryDoc.save();

        res.json({ message: `Removed ${technology} from ${category}`, updatedCategory: categoryDoc });
    } catch (err) {
        res.status(500).json({ message: "Error removing technology", error: err });
    }
});
app.delete("/technologies/:category", async (req, res) => {
    const { category } = req.params;

    try {
        const deletedCategory = await Tech.findOneAndDelete({ category });

        if (!deletedCategory) {
            return res.status(404).json({ message: "Category not found" });
        }

        res.json({ message: `Deleted category '${category}'`, deletedCategory });
    } catch (err) {
        res.status(500).json({ message: "Error deleting category", error: err });
    }
});




const port = process.env.PORT || 3000
app.listen(port);

module.exports = app;


