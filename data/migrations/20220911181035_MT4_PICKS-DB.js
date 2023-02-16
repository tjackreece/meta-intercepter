exports.up = async function (knex) {
  await knex.schema.createTable("MT4_PICKS", (openContactManager) => {
    openContactManager.increments("MT4_PICKS_ID");
    openContactManager.string("id", 4000).unique().notNullable();
    openContactManager.string("platform", 4000).notNullable();
    openContactManager.string("type", 4000).notNullable();
    openContactManager.string("symbol", 4000).notNullable();
    openContactManager.string("brokerTime", 4000).notNullable();
    openContactManager.decimal("openPrice", 14, 2).notNullable();
    openContactManager.decimal("volume", 14, 2).notNullable();
    openContactManager.decimal("swap", 14, 2).notNullable();
    openContactManager.decimal("realizedSwap", 14, 2).notNullable();
    openContactManager.decimal("unrealizedSwap", 14, 2).notNullable();
    openContactManager.decimal("commission", 14, 2).notNullable();
    openContactManager.decimal("realizedCommission", 14, 2).notNullable();
    openContactManager.decimal("unrealizedCommission", 14, 2).notNullable();
    openContactManager.decimal("realizedProfit", 14, 2).notNullable();
    openContactManager.string("reason", 4000).notNullable();
    openContactManager
      .decimal("accountCurrencyExchangeRate", 14, 2)
      .notNullable();
    openContactManager.string("brokerComment", 4000).notNullable();
    openContactManager.decimal("currentPrice", 14, 2).notNullable();
    openContactManager.decimal("currentTickValue", 14, 2).notNullable();
    openContactManager.decimal("unrealizedProfit", 14, 2).notNullable();
    openContactManager.decimal("profit", 14, 2).notNullable();
    openContactManager.string("comment", 4000).notNullable();
    openContactManager.boolean("tradeable").notNullable();
    openContactManager.boolean("disable").notNullable();
    openContactManager.boolean("active").notNullable();
    openContactManager.timestamps(false, true);
  });
};

exports.down = async function (knex) {
  await knex.schema.dropTableIfExists("MT4_PICKS");
};
