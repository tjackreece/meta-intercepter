const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const {
  FindOrdersAndSaveThem,
  UpdateDB,
} = require("../api/MetaApi/utils/accountFunctions");
const { isForexMarketOpen } = require("../api/MetaApi/utils/organizers");

const server = express();
server.use(express.json());
server.use(helmet());
server.use(cors());

let BotStatus = null;
function on() {
  console.log("");
  console.log("Checking For New Orders.....");
  console.log("");
  FindOrdersAndSaveThem();
  UpdateDB();

  BotStatus = setInterval(function () {
    FindOrdersAndSaveThem();
    UpdateDB();
  }, 45000);
}

setInterval(() => {
  const marketStatus = isForexMarketOpen();
  if (marketStatus) {
    if (BotStatus === null) {
      on();
    } else {
      console.log("");
      console.log("BotStatus: ON!!!");
      console.log("");
    }
  } else {
    if (BotStatus === null) {
      console.log("");
      console.log("Market is Not Open");
      console.log("");
    } else {
      console.log("");
      console.log("Market is Closed Now, Shutting Down Watcher");
      console.log("");
      off();
    }
  }
}, 10000);
function off() {
  clearInterval(BotStatus);
}
const MetaApiRoutes = require("../api/MetaApi/router/MetaApi_Pick-router");
server.use("/api/v1/pickdb", MetaApiRoutes);

server.use("*", (req, res) => {
  res.status(200).json({
    message: "WHO ARE YOU? ARE YOU A MEMBER?",
  });
});

server.use((err, req, res) => {
  res.status(err.status || 500).json({
    message: err.message,
    stack: err.stack,
  });
});

module.exports = server;
