const db = require("../../../../data/db-config");

function getAllPicks() {
  return db("MT4_PICKS");
}
// GET Picks BY ID
function getPicksByID(MT4_PICKS_ID) {
  return db("MT4_PICKS as MT4").where("MT4.MT4_PICKS_ID", MT4_PICKS_ID);
}
// ADD Picks
async function addPicks(PickGiven) {
  return await db("MT4_PICKS").insert(PickGiven).returning("*");
}
// UPDATE Picks BY ID
function updatePicks(PickGiven, MT4_PICKS_ID) {
  return db("MT4_PICKS as MT4")
    .update(PickGiven)
    .where("MT4.MT4_PICKS_ID", MT4_PICKS_ID)
    .returning("*");
}
// DELETE Picks BY ID
async function deletePicks(MT4_PICKS_ID) {
  const errorMessage = {
    code: 101,
    delete: "Failed",
    message: `Pick Id:${MT4_PICKS_ID} was not found in database`,
  };
  const successMessage = {
    code: 201,
    delete: "Success",
    message: `Pick Id:${MT4_PICKS_ID} has been disabled successfully`,
  };
  const Picks = getPicksByID(MT4_PICKS_ID);
  const count = Picks.length;

  if (count === 0) {
    return errorMessage;
  } else {
    await db("MT4_PICKS as MT4").where("MT4.MT4_PICKS_ID", MT4_PICKS_ID).del();
    return successMessage;
  }
}
module.exports = {
  getAllPicks,
  getPicksByID,
  addPicks,
  updatePicks,
  deletePicks,
};
