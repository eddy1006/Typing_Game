const express = require('express')
const app = express()
const mongoClient = require('mongodb').MongoClient
const bodyParser = require("body-parser")

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended : true}))

mongoClient.connect("mongodb://localhost:27017/MyDb",function(err,db){
    if(err){
        console.log("Error while connecting to mongo client")
    }else{
        const myDb = db.db('myDb')
        const coll = myDb.collection('Persons')

        app.get('/game',function(req,res){
            res.sendFile(__dirname +'/public/game.html')
        })
        app.post('/signup',function(req,res){
            const newUser = {
                email: req.body.email,
                password: req.body.password,
                win: 0,
                loss: 0
            }

            const query = { email: newUser.email }

            coll.findOne(query, (err, result) => {

                if (result == null) {
                    coll.insertOne(newUser, (err, result) => {
                        res.status(200).sendFile(__dirname+'/public/index.html')
                    })
                } else {
                    res.status(400).send()
                }

            })
        })
        app.post('/login', (req, res) => {

            const query = {
                email: req.body.email,
                password: req.body.password
            }

            coll.findOne(query, (err, result) => {

                if (result != null) {

                    const objToSend = {
                        email: result.email,
                        win: result.win,
                        loss: result.loss
                    }

                    res.status(200).send(JSON.stringify(objToSend)).sendFile(__dirname+"/public/game.html")

                } else {
                    res.status(404).send("Login not found")
                }

            })

        })
    }
})

app.listen(3000,function(){
    console.log('Server listening on port 3000.....')
})