const mongoose = require('mongoose')

mongoose.set("strictQuery", false);

mongoose.connect('mongodb://localhost:27017/CRUD',{useNewUrlParser: true})
.then(()=>{
    console.log("Mongodb is conneted")
}).catch((error)=>{
    console.log("Mongodb is not conneted",)
})