const express = require('express');
const app = express();
const ejs = require('ejs');
const {MongoClient} = require('mongodb');
var url = "mongodb+srv://crazykngurucompany:test1@cluster0.ljuqb9o.mongodb.net/?retryWrites=true&w=majority";
// Set EJS as the view engine
app.set('view engine', 'ejs');

// Define a route to render a view using EJS
 app.get('/',async (req, res) => {
    const mgclient = new MongoClient(url);
    // console.log(fileData)
    const database = mgclient.db('mydb');
    const products = database.collection('products');
    const result = await products.find({approved:true}).toArray()
    console.log(result)
  
  
//  await products.insertOne({ stl: fileData })
 mgclient.close();
  const data = { result: result };
  res.render('index', { data });
});

// Start the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});
