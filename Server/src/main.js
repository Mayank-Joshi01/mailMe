const express = require('express');
const connectDB = require('./configs/db');
const mailRoutes = require('./routes/mail');
const authRoutes = require('./routes/auth');


const app = express();
app.use(express.json());


// connectDB();

app.get('/', (req, res) => {
  res.send('Hello World! From MailMe');
} );

app.use('/api/mail', mailRoutes);
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});