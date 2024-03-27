const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Db bien connecte'))
  .catch(err => console.error('Error', err));

const authRoutes = require('./Auth-service/routes');
const chambreRoutes = require('./Chambre/routes');
const reservationRoutes = require('./Reservation/routes');

app.use('/api/auth', authRoutes); 
app.use('/api/chambre', chambreRoutes); 
app.use('/api/reservation', reservationRoutes); 

const PORT = process.env.PORT ;
app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
