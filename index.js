const express = require('express');
const { MongoClient } = require('mongodb');
const app = express();
const objectId = require('mongodb').ObjectId;
const cors = require('cors');
require('dotenv').config();
const port =process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.rojhc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
    try {
      await client.connect();
      const database = client.db("TourManage");
      const packegecollection = database.collection("Packege");
      const Bookingcollection = database.collection("Booking");
      console.log("connection succesfull");
      //GET API
      app.get('/packege',async(req,res)=>{
          const query = packegecollection.find({});
          const result = await query.toArray();
          res.send(result);


      });
      app.get('/packege/:id', async (req, res) => {
        const id = req.params.id;
        const query = { _id: objectId(id) }
        const result = await  packegecollection.findOne(query);
        // const result = await query.toArray();
        // console.log("got id",result);
        res.send(result);
  
      });
      app.post('/booking', async (req, res) => {
        
        const query = req.body;
        const result = await Bookingcollection.insertOne(query);
        // const result = await query.toArray();
        // console.log("got id",result);
        res.send(result);
        console.log(result);
       
  
      });
      //get booking

      app.get('/booking', async (req, res) => {
        const query =  Bookingcollection.find({});
        const result = await  query.toArray(); 
        // const result = await query.toArray();
        // console.log("got id",result);
        res.send(result);
  
      });
      //add packege
      app.post('/addpackege', async (req, res) => {
        
        const query = req.body;
        const result = await packegecollection.insertOne(query);
        // const result = await query.toArray();
        // console.log("got id",result);
        res.send(result);
        console.log(result);
       
  
      });
      //
      app.get("/mybooking/:email", async (req, res) => {
        const result = await Bookingcollection.find({
          email: req.params.email,
        }).toArray();
        res.send(result);
  
      
      });
     } finally {
    //   await client.close();
    }
  }
  run().catch(console.dir);





app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})