const express = require("express");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const moment = require("moment");
const Alldata = require("./models/schema");

const index = express();
const port = process.env.PORT || 3000;

// Middleware
index.use(methodOverride("_method"));
index.use(express.urlencoded({ extended:true }));
index.use(express.static("public"));
index.set("view engine", "ejs");

// Routes
index.get('/', async (req, res) =>{
    try {
        res.render("index");
    } catch (error) {
        console.error("Error rendering index:", error);
        res.status(500).send("Internal Server Error");
    }
});

index.get('/view', async (req, res) =>{
    try {
        const result = await Alldata.find();
        res.render("view", { arr: result, moment: moment });
    } catch (error) {
        console.error("Error rendering view:", error);
        res.status(500).send("Internal Server Error");
    }
});

index.post("/", async (req, res) =>{
    try {
        await Alldata.create(req.body);
        res.redirect("/");
    } catch (error) {
        console.error("Error creating data:", error);
        res.status(500).send("Internal Server Error");
    }
});

// MongoDB Connection
mongoose.connect("mongodb+srv://zaindiv:SK7A2fOZbLeJ08Ix@cluster0.32r5dqe.mongodb.net/all-data?retryWrites=true&w=majority")
    .then(() =>{
        index.listen(port,() =>{
            console.log(`Server is running on http://localhost:${port}/`);
        });
    })
    .catch((error) =>{
        console.error("Error connecting to MongoDB:", error);
    });
