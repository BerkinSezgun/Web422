const mongoose = require('mongoose');

// Connect to MongoDB (ensure you have your MongoDB URI in the .env file)
const mongoURI = process.env.MONGODB_URI || 'your_default_mongodb_uri_here';

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected successfully!'))
    .catch(err => console.error('MongoDB connection error:', err));

// Example Schema (modify as needed)
const movieSchema = new mongoose.Schema({
    title: String,
    director: String,
    releaseYear: Number,
    genre: [String],
});

// Create a model based on the schema
const Movie = mongoose.model('Movie', movieSchema);

// Export the model for use in other modules
module.exports = { Movie };