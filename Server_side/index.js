//Modules
const express = require('express');
const cors = require('cors');
const mongoose = require("mongoose");

const app  = express();

const UserModel = require('./models/Users');

mongoose.connect('mongodb://127.0.0.1:27017/crud')


//Middlewares
app.use(cors());
app.use(express.json());


//Routes

//Show user on Ui
app.get("/" , async (req , res) => {
    try {
        const users = await UserModel.find({});
        res.json(users)
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch users" }) 
    }
})

//Creare new user
app.post("/createUser" , async (req , res) => {
   try {
     const {name , email , age} = req.body;

     //create a new user
    const newUser = await UserModel.create({
        name,
        email,
        age
    });
    res.json(newUser);

   } catch (err) {
        res.status(500).json({error: err.message})
   }
});


// Fetch User
app.get("/getUser/:id" , async (req , res) => {
    try {
        const id = req.params.id;
        const user = await UserModel.findById(id);
        if (!user){
            return res.status(404).json({ error: "User not found" });
        }
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

// update user
app.put('/updateUser/:id' , async (req , res) => {
    try {
        const id = req.params.id;
        const {name , email , age} = req.body;
        const updatedUser = await UserModel.findByIdAndUpdate(id , {
            name,
            email,
            age
        });
        if(!updatedUser){
            return res.status(404).json({ error: "User not found" })
        }
        res.json(updatedUser);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
})


//delete user
app.delete("/deleteUser/:id" , async (req , res) => {
    try {
        const id = req.params.id;
    const deleteUser = await UserModel.findByIdAndDelete(id);
    if(!deleteUser) {
        return res.status(400).json({ error: "User not found" })
    };
    res.json({ message: "User deleted successfully" })
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
})




app.listen(3000 , () => {
    console.log("Server Started at PORT: 3000")
})
 