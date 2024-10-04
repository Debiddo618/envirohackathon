const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const usersRouter = require('./controllers/users');
const path = require('path')


mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on('connected', () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

// middleware
app.use(cors());

app.use(express.json());
// app.use(express.static(path.join(path.dirname(__dirname), 'Front-end-Buzzpage', 'dist')))



app.use('/api/users', usersRouter);



// Routes go here
// Any other route not matching the routes above gets routed by React
// app.get('*', (req, res) => {
//     res.sendFile(path.join(path.dirname(__dirname), 'Front-end-Buzzpage', 'dist', 'index.html'));
// });


// app.listen(process.env.PORT, () => {
//     console.log('The express app is ready!');
// });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log('The express app is ready!');
});