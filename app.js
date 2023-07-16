'use strict';

const express = require('express');
const gcpMetadata = require('gcp-metadata');

// Constants
const PORT = 80;
const HOST = '0.0.0.0';



// App
const app = express();

// App config
app.set('view engine', 'ejs');

app.get('/home', (req, res) => {
  
});

app.get('/', async (req, res) => {  
  let metadataVariable = await gcpMetadata.project('attributes/metaVariable')  
  res.render('home', { variableName: metadataVariable });  
});

//const mysql = require('mysql');

//DB connection
/*
const connection = mysql.createConnection({
  host: 'your_database_host',
  user: 'your_username',
  password: 'your_password',
  database: 'your_database_name'
});

connection.connect((error) => {
  if (error) {
    console.error('Error connecting to the database:', error);
    return;
  }
  console.log('Connected to the database!');
*/


// Listen command 

app.listen(PORT, HOST, () => {
  console.log(`Running on http://${HOST}:${PORT}`);
});