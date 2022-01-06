const express = require("express");
const app = express();
const bodyParser = require('body-parser');

app.use(express.static(__dirname));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

let collagesAndUniArr = require("./collagesAndUni.json");

for (let i = 0; i < collagesAndUniArr.length; i++) {
    collagesAndUniArr[i]["counter"] = 0;
}


app.get("/api/info", (req, res) => {
    res.status(200);
    res.send(collagesAndUniArr);
})

app.post("/api/add", (req, res) => {
    collagesAndUniArr.push(req.body);
    res.status(201);
    res.send();
})
app.put("/api/edit/:name", (req, res) => {
    let school = collagesAndUniArr.find(e => e.name == req.params.name);
    if (school) {
        school.counter += 1;
        res.status(200);
        res.send({ "message": "Rgistration Completed!" });
    } else {
        res.status(400);
        res.send({ "message": "Rgistration Faild" });
    }

})

app.delete("/delete/:name",
    (request, response) => {
        collagesAndUniArr = collagesAndUniArr.filter(e => e.name != request.params.name);
        response.status(204);
        response.send();
    }
);

app.listen(4000, () => {
    console.log("Ok")
});