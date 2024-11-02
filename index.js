const express = require("express");
const connect = require("./common/connection"); 
const cors = require("cors");

const userdataRoutes = require("./routes/userRoutes"); 

const app = express();
connect(); // Connect to MongoDB

app.use(express.json()); // Parse JSON bodies
app.use(cors()); // Enable CORS

// Register routes with '/api' prefix
app.use('/api', userdataRoutes);

const port = 8100;
app.listen(port, () => {
  console.log("Server running on port:", port);
});
