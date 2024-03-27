const express = require('express');
const router = express.Router();
const Chambre = require('./chambre'); 



// q8

router.post('/chambres', async (req, res) => {
  try {
    if (!req.body.prix) {
      return res.status(400).json({ message: "Le prix est obligatoire" });
    }

    if (typeof req.body.disponibilite !== 'boolean') {
      return res.status(400).json({ message: "La disponibilite doit etre un boolean." });
    }

    const nouvelleChambre = new Chambre({
      type: req.body.type,
      capacite: req.body.capacite,
      prix: req.body.prix,
      disponibilite: req.body.disponibilite,
      hotel: req.body.hotel
    });

    const chambreAjoutee = await nouvelleChambre.save();
    res.status(201).json(chambreAjoutee);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// q9

router.get('/chambres/:id', async (req, res) => {
    try {
      const chambre = await Chambre.findById(req.params.id);
      if (!chambre) {
        return res.status(404).json({ message: "Chambre non trouvée." });
      }
  
      res.status(200).json(chambre);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

module.exports = router;
