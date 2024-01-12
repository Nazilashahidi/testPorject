const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const User = require("./models/user.model");
const UserValidator = require("./validators/user.validator");
const { validate } = require("./middleware/validate");
const userService = require("./services/user.service");


const app = express();
const userList = [];
app.use(bodyParser.json());

app.get("/users/list", async (req, res) => { 
    const users = await User.find({});
    res.json(users)
    // const username = req.query?.username || "";
    // const email = req.query?.email || "";
    // res.json ([
    //     // {
    //     //     username: "nazila",
    //     //     email: "nazila@gmail",
    //     // },
    //     // {
    //     //     username: username,
    //     //     email: email,
    //     // },
//    ]) ;
});  


app.post("/users/add",UserValidator.create(),validate, userService.createUser);
//  async (req, res) => {
//     const username = req.body.username;
//     const email = req.body.email;
//     const password = req.body.password;

//     const user = await User.create({username, email, password})
//     res.json(user);
// });

app.put("/users/:id", async (req, res) => {
    const _id = req.params.id;
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;

    const user = await User.updateOne({ _id }, {username, email, password})
    res.json(user);
});

app.delete("/users/:id", async (req, res) => { 
    const id = req.params.id
    const user = await User.deleteOne({ _id: id});
    res.json(user);

});
app.get("/users/:id", async (req, res) => { 
    const id = req.params.id
    const user = await User.findOne({ _id: id});
    res.json(user)
    // hamishe axar bashe

});
const server = app.listen(3000, async () => {
    await mongoose.connect("mongodb://127.0.0.1:27017/todoList").then(() => { 
        console.log("DB is connected!");
    }).catch((err)=>{
        console.log(err);
    })
    console.log("server is listening to port 3000");
});
