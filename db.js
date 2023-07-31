
 const mysql = require('mysql');
 const gcpMetadata = require('gcp-metadata');

 async function getDbConnection(){
    let dbConnection = null
    if (process.env.NODE_ENV === 'development'){
      const dbConfig = require('./dbconfiguration.json');
        console.log("We are in dev environment!")
        try{
            dbConnection = await mysql.createConnection(dbConfig)
        
        } catch(error) {console.log("Error during configuration of DB connection: " + error)}
    }
    else {
        //get Metadata
        const metadata = await getMetadata();        
        //Establish connection
        dbConnection = mysql.createConnection({
            host: metadata.sqlHost,
            user: metadata.sqlUser,
            password: metadata.sqlP,
            database: metadata.sqlDb
        });
    }
    return dbConnection
 }

 async function getMetadata(){
    try{
      let sqlHost = await gcpMetadata.project('attributes/sql-host')
      let sqlUser = await gcpMetadata.project('attributes/sql-user')
      let sqlP = await gcpMetadata.project('attributes/sql-p')
      let sqlDb = await gcpMetadata.project('attributes/sql-db')
  
      const metadata = {
        sqlHost: sqlHost,
        sqlUser: sqlUser,
        sqlP: sqlP,
        sqlDb: sqlDb
      };
      
      return metadata;  
    }
  
    catch(error){
      console.log("Async/Await error: " + error)
    }  
  }

exports.getDbConnection = getDbConnection;
 
