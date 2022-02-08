const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
const path = require('path');
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
dotenv.config();

//-------------------user---------------------------------------

mongoose.connect(process.env.MONGODB_LINK, () => {
  console.log("connected to mongodb");
});

const userSchema = {
  username: String,
  password: String,
};

const User = mongoose.model("users", userSchema);

app.post("/signup", async (req, res) => {
  const salt = await bcrypt.genSalt(10);
  const password = await bcrypt.hash(req.body.password, salt);
  const newUser = new User({
    username: req.body.username,
    password: password,
  });
  const username = req.body.username;
  const userExist = await User.findOne({ username });
  if (userExist) {
    res.send({
      status: 400,
      message: "User already exist",
    });
  } else {
    res.send({
      status: 200,
      message: "Registration successful",
    });
    newUser.save().catch((err) => res.status(400).json("Error: " + err));
  }
});

app.post("/login", async (req, res) => {
  const username = req.body.username;
  const userExist = await User.findOne({ username });
  if (userExist) {
    const matchpassword = await bcrypt.compare(
      req.body.password,
      userExist.password
    );
    if (matchpassword) {
      const token = jwt.sign(
        {
          username: username,
          password: userExist.password,
        },
        process.env.JWT_SECRET
      );
      return res.json({
        status: 200,
        message: "Login Succesful",
        token: token,
      });
    } else {
      res.send({
        status: 400,
        message: "Incorrect Password",
      });
    }
  } else {
    res.send({
      status: 400,
      message: "User does not exist. Please Register",
    });
  }
});

app.post("/matchpassword", async (req, res) => {
  const username = req.body.username;
  const userExist = await User.findOne({ username });
  if (userExist) {
    if (req.body.password === userExist.password) {
      res.send(true);
    } else {
      res.send(false);
    }
  } else {
    res.send(false);
  }
});

app.put("/changepassword", async (req, res) => {
  const username = req.body.username;
  const user = await User.findOne({ username });
  const matchpassword = await bcrypt.compare(
    req.body.curpassword,
    user.password
  );
  if (matchpassword) {
    
  const salt = await bcrypt.genSalt(10);
  const password = await bcrypt.hash(req.body.newpassword, salt);
    await User.findOneAndUpdate(
      { username: username },
      { password: password }
    ).then(
      res.send({
        status: 200,
        message: "Password changed successfully",
      })
    );
  } else {
    res.send({
      status: 400,
      message: "Wrong Current Password",
    });
  }
});





//----------------------disease-------------------------------


const diseaseSchema = {
  username: String,
  name: String,
  desc: String,
  start: String,
  end: String
};

const Disease = mongoose.model("disease", diseaseSchema);

app.post('/additem',async (req,res) => {
  const newDisease = new Disease({
    username: req.body.username,
    name: req.body.name,
    desc: req.body.desc,
    start: req.body.start,
    end: req.body.end
  });
  await newDisease.save();
  res.send('Added successfully');
})

app.post('/getitem',async (req,res) => {
  const username = req.body.username;
  const data = await Disease.find({username: username});
  res.send(data);
})

app.post('/deleteitem',async (req,res) => {
  await Disease.findOneAndDelete({_id: req.body.id});
  res.send({message: "item deleted successfully"});
})

app.post('/search', async (req,res) => {
  const data = await Disease.find({
    name: req.body.name
  })
  res.send(data);
})









__dirname = path.resolve();
if(process.env.NODE_ENV === "production"){
  app.use(express.static(path.join(__dirname,'/frontend/build')));

  app.get('*',(req,res) => {
    res.sendFile(path.resolve(__dirname,'frontend','build','index.html'));
  })
}
else{
  app.get('/',(req,res)=>{
    res.send("Api running");
  })
}









app.listen(process.env.PORT, function () {
  console.log("Express is running on port: " + process.env.PORT);
});


