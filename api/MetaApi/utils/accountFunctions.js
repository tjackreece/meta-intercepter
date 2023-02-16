let MetaApi = require("metaapi.cloud-sdk").default;
const { TOKEN, ACCOUNT_ID } = require("../../../config/config");
const { OrderOrganizer } = require("./organizers");
const api = new MetaApi(TOKEN);
const axios = require("axios");
const { getAllPicks, updatePicks } = require("../model/PicksModel/PickModel");
const FindOrdersAndSaveThem = async () => {
  try {
    const account = await api.metatraderAccountApi.getAccount(ACCOUNT_ID);
    const initialState = account.state;
    const deployedStates = ["DEPLOYING", "DEPLOYED"];

    if (!deployedStates.includes(initialState)) {
      // wait until account is deployed and connected to broker
      console.log("Deploying account");
      await account.deploy();
    }

    await account.waitConnected();

    // connect to MetaApi API
    let connection = account.getRPCConnection();
    await connection.connect();

    // wait until terminal state synchronized to the local state
    await connection.waitSynchronized();
    const {
      server,
      balance,
      currency,
      equity,
      margin,
      freeMargin,
      name,
      type,
      marginLevel,
      marginMode,
    } = await connection.getAccountInformation();
    console.log("");
    console.log("AccountInfo", {
      name,
      server,
      currency,
      balance,
      equity,
      margin,
      freeMargin,
      marginLevel,
      type,
      marginMode,
    });
    console.log("");

    // invoke RPC API (replace ticket numbers with actual ticket numbers which exist in your MT account)
    const openOrders = await connection.getPositions();

    console.log("Open Order Count", openOrders.length);
    console.log("");

    if (openOrders.length > 0) {
      OrderOrganizer(openOrders);
    } else {
      console.log("");
      console.log("NO OPEN ORDERS");
      console.log("");
    }
    if (!deployedStates.includes(initialState)) {
      // undeploy account if it was undeployed
      console.log("Undeploying account");
      await connection.close();
      await account.undeploy();
    }
  } catch (err) {
    console.error(err);
  }
};
const UpdateDB = async () => {
  console.log("Updating database...");
  console.log("");
  const allPicks = await getAllPicks();
  if (allPicks.length > 0) {
    allPicks.forEach((pick) => {
      const { hours, minutes, seconds } = timeDifference(
        Date.now(),
        new Date(pick.created_at).getTime()
      );
      if (pick.tradeable === true || pick.disable === false) {
        if (hours > 0) {
          disablePick(pick);
        } else if (minutes > 4) {
          disablePick(pick);
        }
      }
    });
  } else {
    console.log("");
    console.log("PICK DB UPDATED....");
    console.log("");
  }
};
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
const disablePick = async (pick) => {
  pick.disable = true;
  pick.tradeable = false;

  const { MT4_PICKS_ID } = pick;
  const updateStatus = await updatePicks(pick, MT4_PICKS_ID);
  if (updateStatus.length > 0) {
    console.log(
      "UpdatedPick: " +
        pick.symbol +
        ", " +
        pick.id +
        ", HAS BEEN DISABLED/UNTRADEABLE DUE TO TIME."
    );
  } else {
    console.log(
      "Something went wrong while updating Pick: " +
        pick.symbol +
        ", " +
        pick.id
    );
  }
};

module.exports = {
  FindOrdersAndSaveThem,
  UpdateDB,
  timeDifference,
};
