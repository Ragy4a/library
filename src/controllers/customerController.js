const db = require('../../db.js');

class CustomerConroller {

     getAllCustomers = async (req, res) => {
        try {
          const { rows } = await db.query(`SELECT id, full_name FROM customers`);
          res.status(200).json(rows);
        } catch (err) {
          res.status(500).send(err.message);
        }
      };
      
      getCustomerById = async (req, res) => {
        try {
          const { customerId } = req.params;
          const { rows } = await db.query(
            `SELECT
            id,
            full_name,
            email,
            phone,
            "createdAt",
            "updatedAt",
            password
            FROM customers
            WHERE id=$1`, [customerId]);
          if (rows.length === 0) {
            res.status(404).json('Customer not found!');
          }
          res.status(200).json(rows[0]);
        } catch (err) {
          res.status(500).send(err.message);
        }
      };
      
      createCustomer = async (req, res) => {
        try {
            const { full_name, email, phone, createdAt, updatedAt, password } = req.body;
            const { rows } = await db.query(
                `INSERT INTO customers (
                    full_name,
                    email,
                    phone,
                    "createdAt",
                    "updatedAt",
                    password) 
                VALUES (
                    $1,
                    $2,
                    $3,
                    $4,
                    $5,
                    $6) 
                RETURNING *`,
                [full_name, email, phone, createdAt, updatedAt, password]
            );
            res.status(201).json(rows[0]);
        } catch (err) {
            res.status(400).send(err.message);
        }        
    };    
      
      updateCustomer = async (req, res) => {
        try {
          const { id, full_name, email, phone, createdAt, updatedAt, password } = req.body;
          const { rows } = await db.query(
            `UPDATE customers
            SET 
              full_name = $2, 
              email = $3,
              phone = $4,
              "createdAt" = $5,
              "updatedAt" = $6,
              password = $7
            WHERE id = $1
            RETURNING *`,
            [id, full_name, email, phone, createdAt, updatedAt, password]
          );
          if (rows.length === 0) {
            res.status(404).json('Customer not found');
          }
          res.status(200).json(rows[0]);
        } catch (err) {
          res.status(400).send(err.message);
        }
      };
      
      
      deleteCustomer = async (req, res) => {
        try {
          const { customerId } = req.params;
          const { rows } = await db.query(`
          DELETE FROM customers 
          WHERE id=$1 
          RETURNING full_name, id`, [customerId]);
          if (rows.length === 0) {
            res.status(404).json('Customer not found' );
          }
          res.status(204).end();
        } catch (err) {
          res.status(500).send(err.message);
        }
      };
};

module.exports = new CustomerConroller();