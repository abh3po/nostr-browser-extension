const axios = require("axios");

export const normalizeAccountsData = (data = {}) => {
  const accountDataKeys = Object.keys(data);

  return accountDataKeys.map((item) => ({
    title: item,
    description: data[item].config,
  }));
};

/**
 * This is still yet to be finalised, for now just going to return an empty array.
 */
export const normalizeSettingsData = (data = {}) => {
  const settingsKeys = Object.keys({});

  return settingsKeys.map((item) => ({
    title: item,
    description: item.name,
  }));
};

export const getFiatFromSatoshi = async (currency, satoshi) => {
  const res = await axios.get("https://blockchain.info/ticker");
  let exchangeRate = res?.data[currency ?? "USD"]?.sell;
  const amount = Math.round((satoshi / 100000000) * exchangeRate);
  return amount;
};

export const calcFiatFromSatoshi = (exchangeRate, satoshi) => {
  return Math.round((satoshi / 100000000) * exchangeRate);
};
