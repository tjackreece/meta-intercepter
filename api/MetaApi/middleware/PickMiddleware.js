const PICKMODEL = require("../model/PicksModel/PickModel");
const getPicks = async (req, res, next) => {
  const Picks = await PICKMODEL.getAllPicks();
  if (Picks.length > 0) {
    req.Picks = Picks;
    next();
  } else {
    req.Picks = [];
    next();
  }
};
const getPicksById = (req, res, next) => {
  const { id } = req.params;
  const Picks = PICKMODEL.getPicksByID(id);
  if (Picks.length > 0) {
    req.Picks = Picks;
    next();
  } else {
    req.Picks = [];
    next();
  }
};
const addPick = (req, res, next) => {
  const { incomingPick } = req.body;
  const {
    id,
    platform,
    type,
    symbol,
    brokerTime,
    openPrice,
    volume,
    swap,
    realizedSwap,
    unrealizedSwap,
    commission,
    realizedCommission,
    unrealizedCommission,
    realizedProfit,
    reason,
    accountCurrencyExchangeRate,
    brokerComment,
    currentPrice,
    currentTickValue,
    unrealizedProfit,
    profit,
    comment,
    tradeable,
    disable,
  } = incomingPick;
  const newPick = {
    id,
    platform,
    type,
    symbol,
    brokerTime,
    openPrice,
    volume,
    swap,
    realizedSwap,
    unrealizedSwap,
    commission,
    realizedCommission,
    unrealizedCommission,
    realizedProfit,
    reason,
    accountCurrencyExchangeRate,
    brokerComment,
    currentPrice,
    currentTickValue,
    unrealizedProfit,
    profit,
    comment,
    tradeable,
    disable,
  };
  const Picks = PICKMODEL.addPicks(newPick);
  if (Picks.length > 0) {
    req.Picks = Picks;
    next();
  } else {
    req.Picks = [];
    next();
  }
};
const updatePick = (req, res, next) => {
  const { incomingPick } = req.body;
  const idToUpdate = req.params.id;
  const {
    id,
    platform,
    type,
    symbol,
    brokerTime,
    openPrice,
    volume,
    swap,
    realizedSwap,
    unrealizedSwap,
    commission,
    realizedCommission,
    unrealizedCommission,
    realizedProfit,
    reason,
    accountCurrencyExchangeRate,
    brokerComment,
    currentPrice,
    currentTickValue,
    unrealizedProfit,
    profit,
    comment,
    tradeable,
    disable,
  } = incomingPick;
  const newPick = {
    id,
    platform,
    type,
    symbol,
    brokerTime,
    openPrice,
    volume,
    swap,
    realizedSwap,
    unrealizedSwap,
    commission,
    realizedCommission,
    unrealizedCommission,
    realizedProfit,
    reason,
    accountCurrencyExchangeRate,
    brokerComment,
    currentPrice,
    currentTickValue,
    unrealizedProfit,
    profit,
    comment,
    tradeable,
    disable,
  };
  const Picks = PICKMODEL.updatePicks(newPick, idToUpdate);
  if (Picks.length > 0) {
    req.Picks = Picks;
    next();
  } else {
    req.Picks = [];
    next();
  }
};
const deletePick = (req, res, next) => {
  const { id } = req.params;
  const Picks = PICKMODEL.deletePicks(id);
  console.log(Picks);
};
const filterPick = (req, res, next) => {
  const { incomingPick } = req.body;
  const { symbol, brokerTime, openPrice } = incomingPick;
  const PicksINDB = PICKMODEL.getAllPicks();
  const filteredOrders = PicksINDB.filter((pick) => {
    if (pick.symbol === symbol) {
      if (pick.brokerTime === brokerTime) {
        if (pick.openPrice === openPrice) {
          return pick;
        }
      }
    }
  });
  if (filteredOrders.length === 0) {
    next();
  } else {
    res.status(200).json({ status: "Failed", message: "Pick Already Exist" });
  }
};

module.exports = {
  getPicks,
  getPicksById,
  addPick,
  updatePick,
  deletePick,
  filterPick,
};
