const express =require('express');
const { MongoClient } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;
var bodyParser = require('body-parser')
const cors =require('cors')

const port =5000;
const app= express();

//user: myDB
//pass:T8Rcolc4G96lSe5b

//Middleware

app.use(cors())
app.use(bodyParser())
app.use(express.json())

const uri = "mongodb+srv://myDB:T8Rcolc4G96lSe5b@cluster0.tgh4y.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


async function run(){
    try{
        await client.connect();

        const database =client.db('FoodMaster');
        const collection = database.collection('userData');


        //API POST
        app.post('/addUser',async(req,res)=>{
            const data =req.body;
            const result = await collection.insertOne(data)
           res.json(result)
        })


        // GET API

        app.get('/users',async(req,res)=>{
            const result = collection.find({});
            const users = await result.toArray();
            res.send(users)

        })

        //Delete API

        app.delete('/users/:id',async(req,res)=>{
            const id = req.params.id;
           const result=  await collection.deleteOne({_id:ObjectId(id)})
            res.json(result)
        })

        // Find API
        app.get('/findUser/:id',async(req,res)=>{
            const id = req.params.id;
            const query = {_id:ObjectId(id)}
            const result = await collection.findOne(query);
            res.send(result)
            
        })



      //update API 

      app.put('/user/:id',async(req,res)=>{
        const id =req.params.id;
        const filter = {_id:ObjectId(id)}
        const userData = req.body;
        const options = { upsert:true }
        
        const updatedUser ={
            $set:{
                name: userData.name,
                email: userData.email,
                phone: userData.phone
            }
        }

      
        const result = await collection.updateOne(filter,updatedUser,options)

        res.json(result)

      })

    }
    finally{
        //client.close()
    }

}

run().catch(console.dir())

 



 app.listen(port,()=>{
     console.log("Ami Sunte Paitechi");
 })