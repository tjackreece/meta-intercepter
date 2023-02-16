const PICKMODEL = require("../model/PicksModel/PickModel");
const AddOrderToDB = async (newOrder) => {
  const { hours, minutes, seconds } = timeDifference(
    Date.now(),
    new Date(newOrder.brokerTime + " UTC").getTime()
  );
  if (hours === 0 && minutes <= 5) {
    console.log("NEW ORDER FOUND", { newOrder });
  }

  if (hours === 0 && minutes <= 5) {
    newOrder.tradeable = true;
    newOrder.disable = false;
    newOrder.active = true;
    const addPickToDB = await PICKMODEL.addPicks(newOrder);

    if (addPickToDB) {
      console.log(
        "New Order Added to DB type: " +
          newOrder.type +
          ", symbol: " +
          newOrder.symbol
      );
    } else {
      console.log(
        "Failed To Add Pick to DB type: " +
          newOrder.type +
          ", symbol: " +
          newOrder.symbol
      );
    }
  }
};
function timeDifference(timestamp1, timestamp2) {
  const difference = Math.abs(timestamp1 - timestamp2);
  const hours = Math.floor(difference / (1000 * 60 * 60));
  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((difference % (1000 * 60)) / 1000);
  return {
    hours,
    minutes,
    seconds,
  };
}
module.exports = { AddOrderToDB };
