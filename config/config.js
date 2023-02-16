module.exports = {
  PORT: process.env.PORT || 5005,
  NODE_ENV: process.env.NODE_ENV || "development",
  DEV_DATABASE_URL: process.env.DEV_DATABASE_URL || "Info Not Available",
  TESTING_DATABASE_URL:
    process.env.TESTING_DATABASE_URL || "Info Not Available",
  TOKEN: process.env.TOKEN || "Info Not Available",
  ACCOUNT_ID: process.env.ACCOUNT_ID || "Info Not Available",
};
