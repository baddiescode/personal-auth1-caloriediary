const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient

var db, collection;

const url = "mongodb+srv://kaminahoakes:kaminahoakes@personal-express-app.qxowqa8.mongodb.net/?retryWrites=true&w=majority";
const dbName = "personal-express-app";

app.listen(1120, () => {
    MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
        if(error) {
            throw error;
        }
        db = client.db(dbName);
        console.log("Connected to `" + dbName + "`!");
    });
});

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(express.static('public'))

app.get('/', (req, res) => {
  db.collection('cals').find().toArray((err, result) => {
    if (err) return console.log(err)
    let calorieCounter = 0
    result.forEach(element => {
      calorieCounter += parseInt(element.calorieCount)
    });
    console.log(calorieCounter)
    res.render('index.ejs', {calories: result, totalCals: calorieCounter})
  })
})

app.post('/cals', (req, res) => {
  db.collection('cals').insertOne({mealDescription: req.body.mealDescription, calorieCount: req.body.calorieCount, totalCal: 0}, (err, result) => {
    if (err) return console.log(err)
    console.log('saved to database')
    res.redirect('/')
  })
})


app.put('/cals', (req, res) => {
  db.collection('cals')
  .findOneAndUpdate({mealDescription: req.body.mealDescription, calorieCount: req.body.calorieCount}, {
    $set: {
      thumbUp:req.body.thumbUp + 1,
      // thumbDown:req.body.thumbDown + 1
    }
  }, {
    sort: {_id: -1},
    upsert: true
  }, (err, result) => {
    if (err) return res.send(err)
    res.send(result)
  })
})

// app.put('/messages/thumbDown', (req, res) => {
//   db.collection('calories')
//   .findOneAndUpdate({name: req.body.name, msg: req.body.msg}, {
//     $set: {
//       thumbUp:req.body.thumbUp - 1
//     }
//   }, {
//     sort: {_id: -1},
//     upsert: true
//   }, (err, result) => {
//     if (err) return res.send(err)
//     res.send(result)
//   })
// })

app.delete('/cals', (req, res) => {
  db.collection('cals').findOneAndDelete({mealDescription: req.body.mealDescription, calorieCount: req.body.calorieCount}, (err, result) => {
    if (err) return res.send(500, err)
    res.send('Message deleted!')
  })
})
