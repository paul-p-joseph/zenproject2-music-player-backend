const express = require("express");
const mongodb = require("mongodb");
const mongoClient = mongodb.MongoClient;
const objectId = mongodb.ObjectID;
const cors = require("cors");
const app = express();
const dbUrlAltas = "mongodb+srv://paul-music-app:aWtu66RVu2xcER27@musicapp.cek6o.mongodb.net/b20wd_db?retryWrites=true&w=majority"
app.use(cors())
app.use(express.json())


app.get("/",async(req,res)=>{
    try {
        let clientInfo = await mongoClient.connect(dbUrlAltas);
        let db = await clientInfo.db('b20wd_db');
        let data = await db.collection('Musicdata').find().toArray();
        res.status(200).json(data);
        clientInfo.close();
    } catch(error){console.log(error)}
      
       });
       
app.post("/create-musicdata", async(req,res) =>{
    try{
        let clientInf = await mongoClient.connect(dbUrlAltas);
        let db = await clientInf.db('b20wd_db');
        let data = await db.collection('Musicdata').insertOne(req.body)
        res.status(200).json({message:"music uploaded"})
        clientInf.close();
        
    }
    catch(error){console.log(error)}
});





app.listen(process.env.PORT || 5000, () => "App runs with some port");