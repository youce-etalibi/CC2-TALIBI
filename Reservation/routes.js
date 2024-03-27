const express = require('express');
const router = express.Router();
const Reservation = require('./reservation'); 
const Utilisateur = require('../Auth-service/Utilisateur'); 
const Chambre = require('../Chambre/chambre');

router.post('/reservation', async (req, res) => {
  try {
    const utilisateur = await Utilisateur.findById(req.body.utilisateur_id);
    if (!utilisateur) {
      return res.status(404).json({ message: "Utilisateur  makinchi" });
    }

    const chambre = await Chambre.findById(req.body.chambre_id);
    if (!chambre || !chambre.disponibilite) {
      return res.status(404).json({ message: "Chambre makincah" });
    }

    const nouvelleReservation = new Reservation({
      utilisateur_id: req.body.utilisateur_id,
      chambre_id: req.body.chambre_id
    });

    const reservationAjoutee = await nouvelleReservation.save();
    
    chambre.disponibilite = false;
    await chambre.save();

    res.status(201).json(reservationAjoutee);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
