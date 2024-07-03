const db = require('../../db.js');

class BookController {

     getAllBooks = async (req, res) => {
        try {
          const { rows } = await db.query(`SELECT id, title FROM books`);
          res.status(200).json(rows);
        } catch (err) {
          res.status(500).send('Server error!');
        }
      };
      
      getBookById = async (req, res) => {
        try {
          const { bookId } = req.params;
          const { rows } = await db.query(
            `SELECT 
            b.id, 
            b.title,
            g.title AS genre,
            s.title AS shelf,
            b.description,
            b."createdAt",
            b."updatedAt",
            b.image
          FROM books b
          JOIN genres g ON b.genre_id = g.id
          JOIN shelves s ON b.shelf_id = s.id
          WHERE b.id = $1`, [bookId]);
          if (rows.length === 0) {
            res.status(404).json('Book not found!');
          }
          res.status(200).json(rows[0]);
        } catch (err) {
          res.status(500).send('Server error!');
        }
      };
      
      createBook = async (req, res) => {
        try {
          const { 
            title, genre, shelf, description, createdAt, updatedAt, image } = req.body;
          const { rows } = await db.query(
            `INSERT INTO books (
                title, 
                genre_id,
                shelf_id, 
                description,
                "createdAt",
                "updatedAt", 
                image) 
                VALUES (
                $1, 
                (SELECT id FROM genres WHERE title=$2), 
                (SELECT id FROM shelves WHERE title=$3), 
                $4, 
                $5,
                $6,
                $7) 
                RETURNING *`,
            [title, genre, shelf, description, createdAt, updatedAt, image]
          );
          res.status(201).json(rows[0]);
        } catch (err) {
          res.status(400).send(err);
        }
      };
      
      updateBook = async (req, res) => {
        try {
          const { id, title, genre, shelf, description, createdAt, updatedAt, image } = req.body;
          const { rows } = await db.query(
            `UPDATE books
            SET 
              title = $2, 
              genre_id = (SELECT id FROM genres WHERE title=$3), 
              shelf_id = (SELECT id FROM shelves WHERE title=$4), 
              description = $5,
              "createdAt" = $6,
              "updatedAt" = $7, 
              image = $8
            WHERE id = $1
            RETURNING *`,
            [id, title, genre, shelf, description, createdAt, updatedAt, image]
          );
          if (rows.length === 0) {
            res.status(404).json('Book not found');
          }
          res.status(200).json(rows[0]);
        } catch (err) {
          res.status(400).send('Server error!');
        }
      };
      
      
      deleteBook = async (req, res) => {
        try {
          const { bookId } = req.params;
          const { rows } = await db.query(`
          DELETE FROM books 
          WHERE id=$1 
          RETURNING title, id`, [bookId]);
          if (rows.length === 0) {
            res.status(404).json('Book not found' );
          }
          res.status(204).end();
        } catch (err) {
          res.status(500).send('Server error!');
        }
      };
};

module.exports = new BookController();