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

metadataVariable = getMetadata();

app.get('/home', (req, res) => {
  
});

app.get('/', (req, res) => {    
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

async function getMetadata(){
  let metadataVariable = await gcpMetadata.project('attributes/metaVariable')
  return metadataVariable;
}

app.listen(PORT, HOST, () => {
  console.log(`Running on http://${HOST}:${PORT}`);
});