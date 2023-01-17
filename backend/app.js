const express = require('express')
const app = express()
const port = 7000
const passport = require('passport')
var session = require('express-session')
const MongoDbStore = require('connect-mongo')

// db connection
require('./DB/db')


// require app products
const routes = require('./routes/routes')

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    store: MongoDbStore.create({
      mongoUrl: 'mongodb://localhost:27017/CRUD',
      dbName: 'CURD'
    }),
    
    cookie: { maxAge: 1000 * 60 * 60 * 24 } // 24 hours
    // cookie: { maxAge: 1000 * 15 } // 24 hours
  }))

const passportInit = require('./config/passport')
passportInit(passport)
app.use(passport.initialize())
app.use(passport.session())


app.use((req, res, next) => {
  res.locals.session = req.session
  res.locals.user = req.user
  
  next()
 
})


// all middleware
app.use(routes)



app.get('/', (req, res)=>{
    res.send('Hello world')
})

app.listen(port, ()=>{
    console.log(`Server app listening on port ${port}`)
})