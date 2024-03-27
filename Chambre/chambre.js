const mongoose = require('mongoose');

const chambreSchema = new mongoose.Schema({
  type: { type: String, required: true },
  capacite: { type: Number, required: true },
  prix: { type: Number, required: true },
  disponibilite: { type: Boolean, default: true },
  hotel: {type: String, required: true}
});

const Chambre = mongoose.model('Chambre', chambreSchema);

module.exports = Chambre;
