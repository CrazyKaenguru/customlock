const MongoClient = require('mongodb').MongoClient;
const fs = require('fs');

// Connection URL and database name
var url = "mongodb+srv://crazykngurucompany:test1@cluster0.ljuqb9o.mongodb.net/?retryWrites=true&w=majority";
const dbName = 'mydb';

// Create a new MongoClient
const client = new MongoClient(url);

// Connect to the server
client.connect(function(err) {
  if (err) throw err;

  console.log('Connected successfully to server');

  // Select the database
  const db = client.db(dbName);

  // Find the document that contains the STL file data
  db.collection('products').findOne({}, function(err, document) {
    if (err) throw err;

    // Write the file data to disk
    fs.writeFileSync('myfile.stl', document.stl);

    console.log('STL file retrieved and saved');
    console.log(document);

    // Close the connection
    client.close();
  });
});




