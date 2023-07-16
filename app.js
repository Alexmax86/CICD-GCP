'use strict';

const express = require('express');
const gcpMetadata = require('gcp-metadata');
const mysql = require('mysql');

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
  dbConnect();  
  res.render('home', { variableName: metadataVariable });  
});

app.get('/messages', async (req,res) => {

})

async function dbConnect(){
  //get Metadata
  const metadata = await getMetadata();
  
  //Establish connection
  const connection = mysql.createConnection({
    host: metadata.sqlHost,
    user: metadata.sqlUser,
    password: metadata.sqlP,
    database: metadata.sqlDb
  });

  connection.connect((error) => {
    if (error) {
      console.error('Error connecting to the database:', error);
      return;
    }
    console.log('Connected to the database!');
    // Execute a SQL statement
  
  const sql = "INSERT INTO messages (name, message) VALUES ('John Doe', 'Hi, I am John Doe and this a from the app'";
  
  connection.query(sql, (error, results) => {
    if (error) {
      console.error('Error executing the statement:', error);
      return;
    }
    console.log('Query results:', results);
  });

  // Close the connection
  connection.end((error) => {
    if (error) {
      console.error('Error closing the database connection:', error);
      return;
    }
    console.log('Connection closed.');
  });
  });



}

async function getMetadata(){
  const metadata = {
    sqlDb: (async () => await gcpMetadata.project('attributes/sql-db'))(),
    sqlHost: (async () => await gcpMetadata.project('attributes/sql-host'))(),
    sqlP: (async () => await gcpMetadata.project('attributes/sql-p'))(),
    sqlUser: (async () => await gcpMetadata.project('attributes/sql-user'))(),
  };

  return metadata;  
}




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