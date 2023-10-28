const express = require("express");
const session = require("express-session");
const cookieParser  = require("cookie-parser");

const { createClient } = require("redis");
let RedisStore = require("connect-redis")(session);
let redisClient = createClient({ legacyMode: true });
redisClient.connect().catch(console.error);

const app = express();
app.use(cookieParser())
app.use(
  session({
    // セッションIDの名前
    name: "testSessionId",
    // Cookieの署名に利用するキー
    // クライアントには[セッションID].[secretを利用した署名]の値が返される
    secret: "1hajhrhu46bul5",
    // リクエスト中にセッションデータが書き換えられなかったとしてもストレージに保存するか。
    resave: false,
    // 初期化されていない(何も入っていない)セッションに値を入れてストレージにほぞんするか
    saveUninitialized: false,
    // 	セッションデータを保管するストレージを指定する。
    store: new RedisStore({ client: redisClient }),
    // 	Cookieに関するオプション。
    cookie: {
      secure: false,
      httpOnly: false,
    },
  })
);

// session情報の確認
function checkSession(req){
  if (!req.session.views) {
    console.log("sessionデータの初期化")
    req.session.views = {};
  }
  console.log("sessionIDの確認",req.session.id)
  console.log("sessionデータの確認",req.session.views)
}

// cookieの情報確認
function checkCookie(req){
  console.log("Cooikeの受信内容の確認",req.cookies)
}

// 各処理を実行する前に実施される共通処理
app.use((req, res, next) => {
  checkSession(req)
  checkCookie(req)
  next();
});

function sessionSave(req){
  const inputValid = "sessionValue" in req.query && req.query.sessionValue !== "" && req.query.sessionValue !== null
  if(inputValid) {
    req.session.views[req.session.id] = req.query.sessionValue
    req.session.save(function( err ){ 
      if( err )console.log("エラー発生") 
    }) 
  console.log("Sessionデータを保存しました")
  return;
  }
  console.log("リクエストパラメーターは存在しませんでした。")
  return;
}

app.get("/", function (req, res, next) {
  res.sendFile(__dirname + '/index.html');
});

app.get("/session", function (req, res, next) {
  sessionSave(req)
  res.send(req.session.views[req.session.id] )
});

app.listen(3000, () => {
  console.log("Application available!");
});