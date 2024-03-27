const express = require('express');
const router = express.Router();
const Utilisateur = require('./Utilisateur'); 

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// q6

router.post('/register', async (req, res) => {
  try {
    const existingUser = await Utilisateur.findOne({ $or: [{ email: req.body.email }, { login: req.body.login }] });
    if (existingUser) {
      return res.status(400).json({ message: "deja existe" });
    }

    const newUser = new Utilisateur({
      nom: req.body.nom,
      email: req.body.email,
      login: req.body.login,
      mdp: req.body.mdp
    });

    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


 // q7
 
router.post('/login', async (req, res) => {
    try {
      const utilisateur = await Utilisateur.findOne({ login: req.body.login });
      if (!utilisateur) {
        return res.status(400).json({ message: "incorrect" });
      }
  
      const validPassword = await bcrypt.compare(req.body.mdp, utilisateur.mdp);
      if (!validPassword) {
        return res.status(400).json({ message: "incorrect" });
      }

     
      const token = jwt.sign({ _id: utilisateur._id }, process.env.JWT_SECRET);
      
      res.header('auth-token', token).json({ token });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });



  //q10

  router.post('/utilisateurs/exists', async (req, res) => {
    try {
      const utilisateur = await Utilisateur.findOne({ login: req.body.login });
      if (!utilisateur) {
        return res.status(404).json({ message: "Utilisateur makaynchi" });
      }
      res.status(200).json({ message: "Utilisateur Kayn" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

module.exports = router;
