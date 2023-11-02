import express from "express"

const app = express();

app.use((req, res, next) => {
  console.log("リクエストの受信")
  res.header("Access-Control-Allow-Origin","http://localhost:8080")
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
  res.header('Access-Control-Allow-Headers','Content-Type, Authorization, access_token')
  next();
})

app.get("/simple-request", function (req, res, next) {
res.send({message:"Hello world Japan!"});
});

app.post("/preflight-request", function (req, res, next) {
  res.send({message:"Hello world Japan!"});
});

app.options('*', function (req, res) {
  res.sendStatus(200);
});


app.listen(5000, () => {
  console.log("Application available!");
});