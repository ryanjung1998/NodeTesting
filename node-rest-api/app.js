const express = require('express');
const app = express ();
app.use(express.json());
const PORT = process.env.PORT || 3000; //setting port to listen on

app.listen(PORT, () => { //setting up to listen on that port
    console.log("Server Listening on PORT:", port);
});

app.get("/status", (request, response) => {
    const status = {
       "Status": "Running"
    };
    
    response.send(status);
 });