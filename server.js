
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// MongoDB connection URI (for local MongoDB)
const mongoURI = 'mongodb+srv://your adderss'; // For local MongoDB
// const mongoURI = 'mongodb+srv://<username>:<password>@cluster.mongodb.net/phishingDB?retryWrites=true&w=majority'; // For MongoDB Atlas

// Connect to MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB:', err));

// Define a Mongoose schema for storing phishing URLs
const phishingSchema = new mongoose.Schema({
    url: { type: String, unique: true, required: true }
});

// Create a model from the schema
const PhishingLink = mongoose.model('PhishingLink', phishingSchema);

// Middleware
app.use(bodyParser.json()); // For parsing application/json
app.use(express.static('public')); // To serve static files from 'public' directory

// Root endpoint for testing if server is running
app.get('/', (req, res) => {
    res.send('Phishing Detection API is working!');
});

// Endpoint to check if a URL is in the phishing database
app.post('/api/check-url', async (req, res) => {
    const { url } = req.body;
    
    if (!url) {
        return res.status(400).json({ message: 'URL is required' });
    }

    try {
        // Check if the URL exists in the database
        const link = await PhishingLink.findOne({ url });
        if (link) {
            res.json({ isPhishing: true });
        } else {
            res.json({ isPhishing: false });
        }
    } catch (error) {
        console.error('Database error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Endpoint to add a new phishing URL to the database
app.post('/api/add-url', async (req, res) => {
    const { url } = req.body;

    if (!url) {
        return res.status(400).json({ message: 'URL is required' });
    }

    try {
        const newLink = new PhishingLink({ url });
        await newLink.save();
        res.status(201).json({ message: 'Phishing link added successfully' });
    } catch (error) {
        if (error.code === 11000) {  // MongoDB duplicate key error code
            return res.status(400).json({ message: 'This URL is already in the database' });
        }
        console.error('Error adding URL:', error);
        res.status(500).json({ message: 'Could not add URL' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
