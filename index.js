const express =require('express');
const { MongoClient } = require('mongodb');
var bodyParser = require('body-parser')
const cors =require('cors')

const port =5000;

const app= express();

//user: myDB
//pass:T8Rcolc4G96lSe5b


const uri = "mongodb+srv://myDB:T8Rcolc4G96lSe5b@cluster0.tgh4y.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


async function run(){
    try{
        await client.connect();

        const database =client.db('FoodMaster');
        const collection = database.collection('users');


        const usersData={
            id:1,name:'nizam',address:'Comilla',phone:1888888  
         }

        const result = await collection.insertOne(usersData)
        console.log(result);

    }
    finally{
        client.close()
    }

}

run().catch(console.dir())

 
const users=[ 
   { id:1,name:'nizam',address:'Comilla',phone:1888888},
   { id:2,name:'Babu',address:'Comilla',phone:1888888},
   { id:3,name:'Kamal;',address:'Comilla',phone:1888888},
   { id:4,name:'Jamal',address:'Comilla',phone:1888888},
   { id:5,name:'shaho',address:'Comilla',phone:1888888},
]

app.use(cors())
app.use(bodyParser.json())


app.get('/user',(req,res)=>{
    res.send(users)
})

app.get('/user/:id',(req,res)=>{
    const id =req.params.id;
    const data =users[id]
    res.send(data)
})


app.post('/users',(req,res)=>{
    console.log(req.body);
})

app.get('/users',(req,res)=>{
    const result= req.query.search

    console.log(result);
    res.send(result)
})






 app.listen(port,()=>{
     console.log("Ami Sunte Paitechi");
 })