/*********************************************************************************
*  WEB422 – Assignment 1
*  I declare that this assignment is my own work in accordance with Seneca  Academic Policy.  
*  No part of this assignment has been copied manually or electronically from any other source
*  (including web sites) or distributed to other students.
* 
*  Name: Berkin Sezgun Student ID: 112346226 Date: 09/30/2024
*  Cyclic Link: _______________________________________________________________
*
********************************************************************************/ 


const express = require('express');
const cors = require('cors');
require('dotenv').config();

const MoviesDB = require("./modules/moviesDB.js");
const db = new MoviesDB();

const app = express();
const HTTP_PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize the database connection and start the server
db.initialize(process.env.MONGODB_CONN_STRING) // Use MONGODB_URI from .env
    .then(() => {
        app.listen(HTTP_PORT, () => {
            console.log(`Server listening on: http://localhost:${HTTP_PORT}`);
        });
    })
    .catch((err) => {
        console.error('Database connection error:', err);
    });

// Sample route
app.get('/', (req, res) => {
    res.json({ message: "API Listening" });
});

// API Routes

// 1. POST /api/movies: Add a new movie
app.post('/api/movies', (req, res) => {
    db.addNewMovie(req.body)
        .then((movie) => {
            res.status(201).json(movie);
        })
        .catch((err) => {
            res.status(500).json({ message: "Error adding movie", error: err });
        });
});

// 2. GET /api/movies: Get all movies (with optional pagination and title filtering)
app.get('/api/movies', (req, res) => {
    const { page, perPage, title } = req.query;
    db.getAllMovies(page, perPage, title)
        .then((movies) => {
            res.json(movies);
        })
        .catch((err) => {
            res.status(500).json({ message: "Error fetching movies", error: err });
        });
});

// 3. GET /api/movies/:id: Get a specific movie by ID
app.get('/api/movies/:id', (req, res) => {
    db.getMovieById(req.params.id)
        .then((movie) => {
            if (movie) {
                res.json(movie);
            } else {
                res.status(404).json({ message: "Movie not found" });
            }
        })
        .catch((err) => {
            res.status(500).json({ message: "Error fetching movie", error: err });
        });
});

// 4. PUT /api/movies/:id: Update a specific movie by ID
app.put('/api/movies/:id', (req, res) => {
    db.updateMovieById(req.body, req.params.id)
        .then(() => {
            res.status(204).end();
        })
        .catch((err) => {
            res.status(500).json({ message: "Error updating movie", error: err });
        });
});

// 5. DELETE /api/movies/:id: Delete a specific movie by ID
app.delete('/api/movies/:id', (req, res) => {
    db.deleteMovieById(req.params.id)
        .then(() => {
            res.status(204).end();
        })
        .catch((err) => {
            res.status(500).json({ message: "Error deleting movie", error: err });
        });
});

