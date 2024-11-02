const mongoose = require("mongoose");
const Mongo_Url = "mongodb+srv://anithas12042003:Anitha1204@cluster0.tdutujd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

const connect=()=>{
    mongoose.connect(Mongo_Url)
.then(()=>{
    console.log("mongoDB connected....");
})
.catch((error)=>{
    console.log("connection error:",error.message);
});
}

module.exports = connect;

