const mongoose = require('mongoose')
const express = require('express')
const cors = require('cors')
const config = require('./config.json')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv');
dotenv.config();

mongoose.connect(config.connectionString)

const app = express()
app.use(cors({
    origin: "*",
}))
app.use(express.json())


app.get("/",(req, res) => {
    res.json({data: "hello"})
})

const {authenticateToken} = require('./utilities');


const FullStack = require("./models/FullStack")
const ReactJS = require("./models/ReactJS")
const JS = require("./models/JSProjects")
const TopFour = require("./models/TopFour")
const Tech = require("./models/Technologies")
const User = require("./models/User")
const error = require("jsonwebtoken/lib/JsonWebTokenError");


app.post("/addFullStackProject",authenticateToken, async (req, res) => {
    try {
        const newProject = new FullStack(req.body);
        await newProject.save();
        res.status(201).json({ message: "FullStack Project added", project: newProject });
    } catch (error) {
        res.status(500).json({ message: "Error adding project", error: error.message });
    }
});
app.post("/addReactJSProject",authenticateToken, async (req, res) => {
    try {
        const newProject = new ReactJS(req.body);
        await newProject.save();
        res.status(201).json({ message: "ReactJS Project added", project: newProject });
    } catch (error) {
        res.status(500).json({ message: "Error adding project", error: error.message });
    }
});
app.post("/addJSProject",authenticateToken, async (req, res) => {
    try {
        const newProject = new JS(req.body);
        await newProject.save();
        res.status(201).json({ message: "JS Project added", project: newProject });
    } catch (error) {
        res.status(500).json({ message: "Error adding project", error: error.message });
    }
});
app.post("/addTopFourProject",authenticateToken, async (req, res) => {
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

app.delete("/deleteTopFourProject/:id",authenticateToken, async (req, res) => {
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
app.delete("/deleteJSProject/:id",authenticateToken, async (req, res) => {
    const { id } = req.params;

    try {
        const deletedCategory = await JS.findOneAndDelete({ _id: id });
        console.log(deletedCategory);
        if (!deletedCategory) {
            return res.status(404).json({ message: "Project not found" });
        }

        res.json({ message: `Deleted project '${id}' successfully`, deletedCategory });
    } catch (err) {
        console.error("Error deleting project:", err); // Improved error logging
        res.status(500).json({ message: "Error deleting project", error: err.message });
    }
});
app.delete("/deleteReactJSProject/:id", authenticateToken,async (req, res) => {
    const { id } = req.params;

    try {
        const deletedCategory = await ReactJS.findOneAndDelete({ _id: id });
        console.log(deletedCategory);
        if (!deletedCategory) {
            return res.status(404).json({ message: "Project not found" });
        }

        res.json({ message: `Deleted project '${id}' successfully`, deletedCategory });
    } catch (err) {
        console.error("Error deleting project:", err); // Improved error logging
        res.status(500).json({ message: "Error deleting project", error: err.message });
    }
});
app.delete("/deleteFullStackProject/:id",authenticateToken, async (req, res) => {
    const { id } = req.params;

    try {
        const deletedCategory = await FullStack.findOneAndDelete({ _id: id });
        console.log(deletedCategory);
        if (!deletedCategory) {
            return res.status(404).json({ message: "Project not found" });
        }

        res.json({ message: `Deleted project '${id}' successfully`, deletedCategory });
    } catch (err) {
        console.error("Error deleting project:", err); // Improved error logging
        res.status(500).json({ message: "Error deleting project", error: err.message });
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
app.get("/getTopFourProjects", async (req, res) => {
    try {
        const projects = await TopFour.find();
        res.status(200).json(projects);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});
app.get("/technologies", async (req, res) => {
    try {
        const techs = await Tech.find();
        res.status(200).json(techs);
    } catch (err) {
        res.status(500).json({ message: "Error fetching technologies", error: err });
    }
});

app.put("/updateFullStackProject/:id",authenticateToken, async (req, res) => {
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
app.put("/updateReactJSProject/:id", authenticateToken,async (req, res) => {
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
app.put("/updateJSProject/:id",authenticateToken, async (req, res) => {
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
app.put("/updateTopFourProject/:id", authenticateToken,async (req, res) => {
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

app.post("/technologies/add-category",authenticateToken, async (req, res) => {
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
app.post("/technologies/:category",authenticateToken, async (req, res) => {
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
app.delete("/technologies/:category/:technology", authenticateToken,async (req, res) => {
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
app.delete("/technologies/:category",authenticateToken, async (req, res) => {
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

//User Authentication
app.post("/login", async (req, res) => {
    const {email, password} = req.body

    if(!email){
        return res.status(400).json({error:true , message: "Email Required"})
    }

    if(!password){
        return res.status(400).json({error:true , message: "Password Required"})
    }

    const userInfo = await User.findOne({email: email})

    if(!userInfo){
        res.status(400).json({
            error:true ,
            message:"User Doesn't exist"
        })
    }

    if (userInfo.email===email && userInfo.password===password){
        const user = {user:userInfo};
        const accessToken = jwt.sign(user, process.env.VITE_ACCESS_TOKEN_SECRET, {
            expiresIn: '36000m'
        })
        return res.json({
            error:false,
            message:"Login Successful",
            email,
            accessToken
        })
    } else {
        return res.status(400).json({
            error:true ,
            message:"Invalid Credentials"
        })
    }


})

//CREATE ACCOUNT
app.post("/create-account", async(req, res) => {
    const { fullName , email ,password } = req.body;

    if(!fullName){
        return res.status(400).json({error:true , message: "Full Name Required"})
    }
    if(!email){
        return res.status(400).json({error:true , message: "Email Required"})
    }
    if(!password){
        return res.status(400).json({error:true , message: "Password Required"})
    }

    const isUser = await User.findOne({email: email})
    if(isUser){
        return res.json({error:true , message:"User already exists"})
    }

    const user = new User({
        fullName,
        email,
        password,
    })

    await user.save();

    const accessToken = jwt.sign({user} , process.env.VITE_ACCESS_TOKEN_SECRET, {
        expiresIn: '36000m'
    });
    return res.json({
        error:false,
        user,
        accessToken,
        message: "Registration Successful",
    })

})


const port = process.env.PORT || 3000
app.listen(port);

module.exports = app;


