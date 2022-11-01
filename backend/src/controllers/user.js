const user = require("../models/user");
const bcrypt = require("bcrypt");
const instructor = require("../models/instructor");
const corporate = require("../models/corporate");
const admin = require("../models/admin");
const trainee = require("../models/trainee");

exports.createUser = async (req, res) => {
  if (!req.body.userName || !req.body.password || !req.body.role) {
    return res.status(400).send({
      message: "content can not be empty",
    });
  }
  //validate request

  const newUser = new user({
    userName: req.body.userName,
    password: req.body.password,
    email: req.body.email,

    role: req.body.role,
  });

  const salt = await bcrypt.genSalt(10);
  newUser.password = await bcrypt.hash(newUser.password, salt);
  try {
    await newUser.save();
    res.send(newUser);
  } catch (err) {
    return res.status(500).send({
      message: err.message || "Some error occurred while creating the user.",
    });
  }

  if (req.body.role === "INSTRUCTOR") {
    const newInstructor = new instructor({
      user: newUser._id,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      gender: req.body.gender,
    });
    await newInstructor.save().catch((err) => {
      res
        .status(500)
        .send({
          message:
            err.message || "Some error occurred while creating the instructor.",
        });
    });
  } else if (req.body.role === "CORPORATE") {
    const newCorporate = new corporate({
      user: newUser._id,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      gender: req.body.gender,
    });
    await newCorporate.save().catch((err) => {
      res
        .status(500)
        .send({
          message:
            err.message ||
            "Some error occurred while creating the corporate trainee.",
        });
    });
  } else if (req.body.role === "ADMIN") {
    const newAdmin = new admin({
      user: newUser._id,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      gender: req.body.gender,
    });
    await newAdmin.save().catch((err) => {
      res
        .status(500)
        .send({
          message:
            err.message || "Some error occurred while creating the admin.",
        });
    });
  } else if (req.body.role === "TRAINEE") {
    const newTrainee = new trainee({
      user: newUser._id,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      gender: req.body.gender,
    });
    await newTrainee.save().catch((err) => {
      res
        .status(500)
        .send({
          message:
            err.message || "Some error occurred while creating the trainee.",
        });
    });
  }
};

exports.deleteUser = async (req, res) => {
    const id = req.params.id;
    try {
        await user.findByIdAndRemove(id).then((data) => {
        if (!data) {
            res.status(404).send({
            message: `Cannot delete user with id=${id}. Maybe user was not found!`,
            });
        } else {
            res.send({
            message: "user was deleted successfully!",
            });
        }
        });
    } catch (err) {
        res.status(500).send({
        message: "Could not delete user with id=" + id,
        });
    }
  
    }; 


exports.getAllUsers= async (req, res) => {
    try {
        await user.find().then((data) => {
        res.send(data);
        });
    } catch (err) {
        res.status(500).send({
        message:
            err.message || "Some error occurred while retrieving users.",
        });
    }
  
    };
    
    exports.getUserById = async (req, res) => {
    const id = req.params.id;
    try {
        await user.findById(id).then((data) => {
        if (!data)
            res.status(404).send({ message: "Not found user with id " + id });
        else res.send(data);
        });
    } catch (err) {
        res.status(500).send({ message: "Error retrieving user with id=" + id });
    }
  
    }

exports.updateUser = async (req, res) => {
    if (!req.body) {
        return res.status(400).send({
        message: "Data to update can not be empty!",
        });
    }
    const id = req.params.id;
    try {
        await user.findByIdAndUpdate(id, req.body, { useFindAndModify: false ,new: true})
        .then((data) => {
        if (!data) {
            res.status(404).send({
            message: `Cannot update user with id=${id}. Maybe user was not found!`,
            });
        } else res.send({ message: "user was updated successfully.", data }); 
        });
    } catch (err) {
        res.status(500).send({
        message: "Error updating user with id=" + id,
        });
    }
  
    }

exports.login = async (req, res) => {
    const { userName, password } = req.body;
    try {
        await user.findOne({ userName }).then(async (data) => {
        if (!data) {
            res.status(404).send({ message: "Not found user with userName " + userName });
        } else {
            const validPassword = await bcrypt.compare(password, data.password);
            if (!validPassword) {
            res.status(401).send({ message: "Invalid Password!" });
            } else {
            res.send({ message: "Login Successfully!", data });
            //create jwt token
          }
        }
        });
    } catch (err) {
        res.status(500).send({ message: "Error retrieving user with userName=" + userName });
    }
  
    }

exports.getUserByRole = async (req, res) => {
    const role = req.params.role;
    try {
        await user.find({ role }).then((data) => {
        if (!data)
            res.status(404).send({ message: "Not found user with role " + role });
        else res.send(data);
        });
    } catch (err) {
        res.status(500).send({ message: "Error retrieving user with role=" + role });
    }
  
    }

