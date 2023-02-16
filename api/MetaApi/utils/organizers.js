const { getDay } = require("date-fns");
const { getAllPicks, updatePicks } = require("../model/PicksModel/PickModel");
const { AddOrderToDB } = require("./DB_Actions");

const OrderOrganizer = async (OPENORDERS) => {
  const formattedPicks = [];
  OPENORDERS.forEach(async (order) => {
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
    } = order;
    const newOrder = {
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
    };
    formattedPicks.push(newOrder);
  });
  formattedPicks.forEach(async (newOrda) => {
    const getDBPicks = await getAllPicks();
    // // check if trade exists
    if (getDBPicks.length > 0) {
      const filteredOrders = getDBPicks.filter((pick) => {
        if (Number(pick.id) === Number(newOrda.id)) {
          return pick;
        }
      });
      if (filteredOrders.length === 0) {
        AddOrderToDB(newOrda);
      } else {
        await updatePicksStatus(newOrda, filteredOrders[0].MT4_PICKS_ID);
      }
    } else {
      AddOrderToDB(newOrda);
    }
  });
};

function isForexMarketOpen() {
  const now = new Date();
  const day = now.getDay();
  const hour = now.getHours();

  const weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let ThisDay = weekday[day];

  if (ThisDay === "Saturday") {
    return false;
  }
  if (ThisDay === "Friday" && hour >= 16) {
    return false;
  }
  if (ThisDay === "Sunday" && hour <= 16) {
    return false;
  }
  return true;
}
const timeDifference = (timestamp1, timestamp2) => {
  const difference = Math.abs(timestamp1 - timestamp2);
  const hours = Math.floor(difference / (1000 * 60 * 60));
  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((difference % (1000 * 60)) / 1000);
  return {
    hours,
    minutes,
    seconds,
  };
};
async function updatePicksStatus(pick, MT4_PICKS_ID) {
  const updateStatus = await updatePicks(pick, MT4_PICKS_ID);
  if (updateStatus.length > 0) {
    const { hours, minutes, seconds } = timeDifference(
      Date.now(),
      new Date(pick.brokerTime + " UTC").getTime()
    );
    console.log(
      "UpdatedPick: " +
        pick.symbol +
        ", " +
        pick.id +
        ", currrent Profit: " +
        pick.profit +
        ", How Long This Has Been Open: " +
        `${hours}:${minutes}:${seconds}`
    );
  } else {
    console.log(
      "Something went wrong while updating Pick: " +
        pick.symbol +
        ", " +
        pick.id
    );
  }
}
module.exports = {
  OrderOrganizer,
  isForexMarketOpen,
  updatePicksStatus,
};
