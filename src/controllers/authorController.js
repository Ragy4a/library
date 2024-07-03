const db = require('../../db.js');

class AuthorController {

     getAllAuthors = async (req, res) => {
        try {
          const { rows } = await db.query(`SELECT id, full_name FROM authors`);
          res.status(200).json(rows);
        } catch (err) {
          res.status(500).send('Server error!');
        }
      };
      
      getAuthorById = async (req, res) => {
        try {
          const { authorId } = req.params;
          const { rows } = await db.query(
            `SELECT
            a.id,
            a.full_name,
            a.email,
            n.description AS nationality,
            a."createdAt",
            a."updatedAt"
            FROM authors a
            JOIN nationalities n USING(id)
            WHERE a.id = $1`, [authorId]);
          if (rows.length === 0) {
            res.status(404).json('Author not found!');
          }
          res.status(200).json(rows[0]);
        } catch (err) {
          res.status(500).send('Server error!');
        }
      };
      
      createAuthor = async (req, res) => {
        try {
            const { full_name, email, nationality, createdAt, updatedAt } = req.body;
            const { rows } = await db.query(
                `INSERT INTO authors (
                    full_name,
                    email,
                    nationality_id,
                    "createdAt",
                    "updatedAt") 
                VALUES (
                    $1,
                    $2,
                    (SELECT id FROM nationalities WHERE title=$3),
                    $4,
                    $5) 
                RETURNING *`,
                [full_name, email, nationality, createdAt, updatedAt]
            );
            res.status(201).json(rows[0]);
        } catch (err) {
            res.status(400).send('Server error!');
        }        
    };    
      
      updateAuthor = async (req, res) => {
        try {
          const { id, full_name, email, nationality, createdAt, updatedAt } = req.body;
          console.log("Executing SQL with parameters:", [full_name, email, nationality, createdAt, updatedAt]);
          const { rows } = await db.query(
            `UPDATE books
            SET 
              full_name = $2,
              email = $3,
              nationality_id = (SELECT id FROM nationalities WHERE title=$4),
              "createdAt" = $5,
              "updatedAt" = $6, 
            WHERE id = $1
            RETURNING *`,
            [id, full_name, email, nationality, createdAt, updatedAt]
          );
          if (rows.length === 0) {
            res.status(404).json('Author not found');
          }
          res.status(200).json(rows[0]);
        } catch (err) {
          res.status(400).send('Server error!');
        }
      };
      
      
      deleteAuthor = async (req, res) => {
        try {
          const { authorId } = req.params;
          const { rows } = await db.query(`
          DELETE FROM authors 
          WHERE id=$1 
          RETURNING full_name, id`, [authorId]);
          if (rows.length === 0) {
            res.status(404).json('Author not found' );
          }
          res.status(204).end();
        } catch (err) {
          res.status(500).send('Server error!');
        }
      };
};

module.exports = new AuthorController();