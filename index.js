require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const moment = require('moment');
const Alldata = require('./models/schema'); // تأكد من أن هذا النموذج موجود ومعرف بشكل صحيح

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

// Routes
app.get('/', async (req, res) => {
    try {
        res.render('index');
    } catch (error) {
        console.error('Error rendering index:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/view', async (req, res) => {
    try {
        const result = await Alldata.find({});
        res.render('view', { arr: result, moment: moment });
    } catch (error) {
        console.error('Error rendering view:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.post('/', async (req, res) => {
    try {
        await Alldata.create(req.body);
        res.redirect('/');
    } catch (error) {
        console.error('Error creating data:', error);
        res.status(500).send('Internal Server Error');
    }
});

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(port, () => console.log(`Server running on http://localhost:${port}`)))
    .catch(error => console.error('Error connecting to MongoDB:', error));

// Global Error Handler
app.use((error, req, res, next) => {
    console.error(error);
    res.status(500).send('Server Error');
});
