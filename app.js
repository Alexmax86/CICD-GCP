'use strict';

const express = require('express');
const gcpMetadata = require('gcp-metadata');
const mysql = require('mysql');
const db = require('./db')
const bodyParser = require('body-parser');



// Constants
const PORT = 80;
const HOST = '0.0.0.0';



// App
const app = express();

// App config
app.set('view engine', 'ejs');

// Parse URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: false }));

// Parse JSON bodies
app.use(bodyParser.json());

app.get('/home', (req, res) => {
  
});

console.log(process.env.NODE_ENV)
if (process.env.NODE_ENV === 'development'){
  console.log("We are in dev environment!")
}

app.get('/', async (req, res) => {  
  let dbConnection = await db.getDbConnection()
  let query = 'SELECT * FROM messages'
  let entries = null
  await dbConnection.query(query, (error, result) => {
    
    entries = result
    let formattedEntries = entries.map(row => ({ ...row })).reverse();
    console.log(formattedEntries)
    res.render('home', { entries: formattedEntries }); 
  })
  dbConnection.end()
  
   
});

app.get('/messages', async (req,res) => {
  let dbConnection = await db.getDbConnection()
  let query = 'SELECT * FROM messages'
  dbConnection.query(query, (error, result) => {
    res.json(result)
  })
  dbConnection.end()
})

app.post('/messages', async (req, res) => {
    console.log("Logger: " + JSON.stringify(req.body));
    const dbConnection = await db.getDbConnection();

    // Extract the message data from the request body
    const { name, message } = req.body;

    // Construct the SQL query to insert the new message
    const query = `INSERT INTO messages (name, message) VALUES (?, ?)`;

    // Execute the query
    dbConnection.query(query, [name, message], (error, result) => {
      if (error) {
        console.error('Error posting the message:', error);
        res.status(500).send('Internal Server Error');
      } else {
        res.redirect('/')
        
      }
    });

  })


  app.get('/delete', async (req,res) => {
    let dbConnection = await db.getDbConnection()
    let query = 'TRUNCATE TABLE messages'
    dbConnection.query(query, (error, result) => {
      res.json(result)
    })
    dbConnection.end()
  })




 
  






app.listen(PORT, HOST, () => {
  console.log(`Running on http://${HOST}:${PORT}`);
});