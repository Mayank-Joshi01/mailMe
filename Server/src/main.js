const express = require('express');
const connectDB = require('./configs/db');
const mailRoutes = require('./routes/mail');
const authRoutes = require('./routes/auth');
const formRoutes = require('./routes/form');
const cors = require('cors');


const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set('trust proxy', 1);
// app.use(cors({
//   origin: process.env.FRONTEND_URL || 'http://localhost:5731',
//   credentials: true
// }));

connectDB();

app.get('/', (req, res) => {
  res.send('Hello World! From MailMe');
} );

app.use('/api/mail', mailRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/form', formRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});