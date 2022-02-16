const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * Get all of the items on the shelf
 */
router.get('/', rejectUnauthenticated, (req, res) => {
  let queryText = `SELECT * FROM "item"`;
  pool.query(queryText).then((result) => {
    res.send(result.rows)
  }).catch((error) => {
    console.log(error);
    res.sendStatus(500);
  })

});

/**
 * Add an item for the logged in user to the shelf
 */
router.post('/', rejectUnauthenticated, (req, res) => {
  // endpoint functionality
  let userBook = req.body;
  const queryText = `INSERT INTO item ("description", "image_url", "user_id") 
  VALUES ($1, $2, $3);`;
  pool.query(queryText, [userBook.description, userBook.image_url, userBook.user_id]).then(response => {
    res.sendStatus(201);
  }).catch(err => {
    console.log(err);
    res.sendStatus(500);
  });
});

/**
 * Delete an item if it's something the logged in user added
 */
router.delete('/:id', rejectUnauthenticated, (req, res) => {
  // endpoint functionality
  let userId = req.user.id;
  const queryText = `DELETE FROM "item" WHERE "id" = $1 and "user_id" = $2;`;
    pool.query(queryText, [req.params.id, userId]).then(response => {
      res.sendStatus(204);
    }).catch(err => {
      console.log(err);
      res.sendStatus(500);
    });
});

/**
 * Update an item if it's something the logged in user added
 */
router.put('/:id', (req, res) => {
  // endpoint functionality
});

/**
 * Return all users along with the total number of items
 * they have added to the shelf
 */
router.get('/count', (req, res) => {
  // endpoint functionality
});

/**
 * Return a specific item by id
 */
router.get('/:id', (req, res) => {
  // endpoint functionality
});

module.exports = router;
