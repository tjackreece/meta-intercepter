const server = require("express").Router();

const {
  getPicks,
  getPicksById,
  addPick,
  updatePick,
  deletePick,
  filterPick,
} = require("../middleware/PickMiddleware");

server.get("/", getPicks, (req, res) => {
  if (req.Picks.length > 0) {
    res.status(200).json({
      status: "Success",
      message: "All Picks in Database",
      Picks: req.Picks,
      PickCount: req.Picks.length,
    });
  } else {
    res.status(200).json({
      status: "Failed",
      message: "No Picks in Database",
      Picks: [],
      PickCount: 0,
    });
  }
});

server.get("/byId/:id", getPicksById, (req, res) => {
  if (req.Picks.length > 0) {
    res.status(200).json({
      status: "Success",
      message: "Pick in Database By Given ID",
      Picks: req.Picks,
      PickCount: req.Picks.length,
    });
  } else {
    res.status(200).json({
      status: "Failed",
      message: "No Picks in Database By Given ID",
      Picks: [],
      PickCount: 0,
    });
  }
});

server.post("/", filterPick, addPick, (req, res) => {
  if (req.Picks.length > 0) {
    res.status(200).json({
      status: "Success",
      message: "Added Pick to Database",
      Picks: req.Picks,
      PickCount: req.Picks.length,
    });
  } else {
    res.status(200).json({
      status: "Failed",
      message: "Failed to Add Pick to Database",
      Picks: [],
      PickCount: 0,
    });
  }
});

server.put("/:id", updatePick, (req, res) => {
  if (req.Picks.length > 0) {
    res.status(200).json({
      status: "Success",
      message: "Updated Pick In Database",
      Picks: req.Picks,
      PickCount: req.Picks.length,
    });
  } else {
    res.status(200).json({
      status: "Failed",
      message: "Failed to Update Pick In Database",
      Picks: [],
      PickCount: 0,
    });
  }
});

server.delete("/", deletePick, (req, res) => {
  if (req.Picks.length > 0) {
    res.status(200).json({
      status: "Success",
      message: "Pick Disabled In Database",
      Picks: req.Picks,
      PickCount: req.Picks.length,
    });
  } else {
    res.status(200).json({
      status: "Failed",
      message: "Failed to Disable Pick In Database",
      Picks: [],
      PickCount: 0,
    });
  }
});

module.exports = server;
