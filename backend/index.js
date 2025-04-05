const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const config = require('./config.json');
dotenv.config();

const { authenticateToken } = require('./utilities');

const FullStack = require("./models/FullStack");
const ReactJS = require("./models/ReactJS");
const JS = require("./models/JSProjects");
const TopFour = require("./models/TopFour");
const Tech = require("./models/Technologies");
const User = require("./models/User");

// Connect to MongoDB
mongoose.connect(config.connectionString);

// Initialize Express
const app = express();
app.use(cors({ origin: "*" }));
app.use(express.json());

app.get("/", (req, res) => {
    res.json({ data: "hello" });
});

// ======================= POST ROUTES =======================

// ADD PROJECTS
app.post("/addFullStackProject", authenticateToken, async (req, res) => {
    try {
        const newProject = new FullStack(req.body);
        await newProject.save();
        res.status(201).json({ message: "FullStack Project added", project: newProject });
    } catch (error) {
        res.status(500).json({ message: "Error adding project", error: error.message });
    }
});
app.post("/addReactJSProject", authenticateToken, async (req, res) => {
    try {
        const newProject = new ReactJS(req.body);
        await newProject.save();
        res.status(201).json({ message: "ReactJS Project added", project: newProject });
    } catch (error) {
        res.status(500).json({ message: "Error adding project", error: error.message });
    }
});
app.post("/addJSProject", authenticateToken, async (req, res) => {
    try {
        const newProject = new JS(req.body);
        await newProject.save();
        res.status(201).json({ message: "JS Project added", project: newProject });
    } catch (error) {
        res.status(500).json({ message: "Error adding project", error: error.message });
    }
});
app.post("/addTopFourProject", authenticateToken, async (req, res) => {
    try {
        const newProject = new TopFour(req.body);
        await newProject.save();
        res.status(201).json({ message: "Added to Top Four", project: newProject });
    } catch (error) {
        console.error("Error adding project:", error);
        res.status(500).json({ message: "Error adding project", error: error.message });
    }
});

// ======================= DELETE ROUTES =======================

const deleteRoute = (Model, name) => async (req, res) => {
    const { id } = req.params;
    try {
        const deleted = await Model.findByIdAndDelete(id);
        if (!deleted) return res.status(404).json({ message: `${name} not found` });
        res.json({ message: `${name} '${id}' deleted`, deleted });
    } catch (error) {
        res.status(500).json({ message: `Error deleting ${name}`, error: error.message });
    }
};

app.delete("/deleteTopFourProject/:id", authenticateToken, deleteRoute(TopFour, "TopFour project"));
app.delete("/deleteJSProject/:id", authenticateToken, deleteRoute(JS, "JS project"));
app.delete("/deleteReactJSProject/:id", authenticateToken, deleteRoute(ReactJS, "ReactJS project"));
app.delete("/deleteFullStackProject/:id", authenticateToken, deleteRoute(FullStack, "FullStack project"));

// ======================= GET ROUTES =======================

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
    } catch (error) {
        res.status(500).json({ message: "Error fetching technologies", error: error.message });
    }
});

// ======================= UPDATE ROUTES =======================

const updateRoute = (Model, name) => async (req, res) => {
    const { id } = req.params;
    try {
        const updated = await Model.findByIdAndUpdate(id, req.body, { new: true });
        if (!updated) return res.status(404).json({ message: `${name} not found` });
        res.status(200).json(updated);
    } catch (error) {
        res.status(500).json({ message: `Error updating ${name}`, error: error.message });
    }
};

app.put("/updateFullStackProject/:id", authenticateToken, updateRoute(FullStack, "FullStack project"));
app.put("/updateReactJSProject/:id", authenticateToken, updateRoute(ReactJS, "ReactJS project"));
app.put("/updateJSProject/:id", authenticateToken, updateRoute(JS, "JS project"));
app.put("/updateTopFourProject/:id", authenticateToken, updateRoute(TopFour, "TopFour project"));

// ======================= TECHNOLOGIES =======================

app.post("/technologies/add-category", authenticateToken, async (req, res) => {
    const { category } = req.body;
    try {
        const exists = await Tech.findOne({ category });
        if (exists) return res.status(400).json({ message: "Category already exists" });

        const newCategory = new Tech({ category, technologies: [] });
        await newCategory.save();
        res.json({ message: `Category '${category}' added successfully!` });
    } catch (error) {
        res.status(500).json({ message: "Error adding category", error: error.message });
    }
});
app.post("/technologies/:category", authenticateToken, async (req, res) => {
    const { category } = req.params;
    const { technology } = req.body;

    try {
        const doc = await Tech.findOne({ category });
        if (!doc) return res.status(404).json({ message: "Category not found" });

        if (doc.technologies.includes(technology)) {
            return res.status(400).json({ message: "Technology already exists" });
        }

        doc.technologies.push(technology);
        await doc.save();
        res.json({ message: `Added ${technology} to ${category}`, updatedCategory: doc });
    } catch (error) {
        res.status(500).json({ message: "Error adding technology", error: error.message });
    }
});
app.delete("/technologies/:category/:technology", authenticateToken, async (req, res) => {
    const { category, technology } = req.params;
    try {
        const doc = await Tech.findOne({ category });
        if (!doc) return res.status(404).json({ message: "Category not found" });

        doc.technologies = doc.technologies.filter(tech => tech !== technology);
        await doc.save();
        res.json({ message: `Removed ${technology} from ${category}`, updatedCategory: doc });
    } catch (error) {
        res.status(500).json({ message: "Error removing technology", error: error.message });
    }
});
app.delete("/technologies/:category", authenticateToken, async (req, res) => {
    const { category } = req.params;
    try {
        const deleted = await Tech.findOneAndDelete({ category });
        if (!deleted) return res.status(404).json({ message: "Category not found" });

        res.json({ message: `Deleted category '${category}'`, deletedCategory: deleted });
    } catch (error) {
        res.status(500).json({ message: "Error deleting category", error: error.message });
    }
});

// ======================= AUTH =======================

app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: true, message: "Email and Password Required" });

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: true, message: "User doesn't exist" });

    if (user.password !== password) return res.status(400).json({ error: true, message: "Invalid Credentials" });

    const accessToken = jwt.sign({ user }, process.env.VITE_ACCESS_TOKEN_SECRET, { expiresIn: "36000m" });
    return res.json({ error: false, message: "Login Successful", email, accessToken });
});

app.post("/create-account", async (req, res) => {
    const { fullName, email, password } = req.body;

    if (!fullName || !email || !password) {
        return res.status(400).json({ error: true, message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ error: true, message: "User already exists" });

    const newUser = new User({ fullName, email, password });
    await newUser.save();

    const accessToken = jwt.sign({ user: newUser }, process.env.VITE_ACCESS_TOKEN_SECRET, { expiresIn: "36000m" });
    return res.json({ error: false, user: newUser, accessToken, message: "Registration Successful" });
});

// ======================= START SERVER =======================

const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

module.exports = app;
