const express = require("express");
const app = express();
const port = 5000;

app.listen(port, () => {
    console.log("server is online");
});

app.get("/", (request, response) => {
    response.send("success");
})
