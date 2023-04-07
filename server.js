const express = require("express");
const app = express();

// Serves static files in the "public" directory
app.use(express.static("public"));

// Starts the server
app.listen(3000, () => console.log("Server running on port 3000"));
