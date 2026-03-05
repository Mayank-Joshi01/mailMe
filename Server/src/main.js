const express = require('express');
const connectDB = require('./configs/db');
const authRoutes = require('./routes/auth');
const Entries = require('./routes/entries');
const projectRoutes = require('./routes/project');
const summaryRoutes = require('./routes/summary');


const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set('trust proxy', 1);

connectDB();

app.get('/', (req, res) => {
  res.send('Hello World! From MailMe');
} );

app.use('/api/auth', authRoutes);
app.use('/api/entries', Entries);
app.use('/api/projects', projectRoutes);
app.use('/api/summary', summaryRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});