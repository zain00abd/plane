const express = require("express");
const mongoose = require("mongoose")
const moment = require("moment")
const index = express();
const port = process.env.PORT || 3001;
const methodOverriade = require("method-override")
index.use(methodOverriade("_method"))
index.use(express.urlencoded({ extended:true }));
index.use(express.static("public"))
index.set("view engine", "ejs")
index.use(express.static("public"))
const Alldata = require("./models/schema")

// Auto refresh
function AutoRef(){
    const path = require("path");
    const livereload = require("livereload");
    const liveReloadServer = livereload.createServer();
    liveReloadServer.watch(path.join(__dirname, 'public'));
     
     
    const connectLivereload = require("connect-livereload");
    index.use(connectLivereload());
     
    liveReloadServer.server.once("connection", () => {
      setTimeout(() => {
        liveReloadServer.refresh("/");
      }, 100);
    });
}
AutoRef()



index.get('/', (req,res) =>{
    res.render("index")
})
index.get('/view', (req,res) =>{
    Alldata.find()
    .then((result) =>{
        res.render("view", {arr: result, moment: moment})
    })
    .catch(() =>{

    })
})
// post requst
index.post("/", (req,res) =>{
    Alldata.create(req.body)
    .then(() =>{
        res.redirect("/")
    })
    .catch((err) =>{
    })

})



mongoose.connect("mongodb+srv://zaindiv:SK7A2fOZbLeJ08Ix@cluster0.32r5dqe.mongodb.net/all-data?retryWrites=true&w=majority")
.then(() =>{
    index.listen(port,() =>{
        console.log(`http://localhost:${port}/`)
    })
})
.catch(() =>{

})