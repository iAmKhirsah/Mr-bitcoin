import axios from 'axios';

export const apiService = {
  getBitcoinValue,
  getMarketPrice,
  getTradeVolume,
};
async function getBitcoinValue(coins) {
  let res = await axios(`https://blockchain.info/tobtc?currency=USD&value=1`);
  // let exchange = coins / res.data;
  return res.data;
}
async function getMarketPrice() {
  let res = await axios(
    'https://api.blockchain.info/charts/market-price?timespan=5months&format=json&cors=true'
  );
  return res.data;
}
async function getTradeVolume() {
  try {
    let res = await axios(
      'https://api.blockchain.info/charts/trade-volume?timespan=2months&format=json&cors=true'
    );
    return res.data;
  } catch (err) {
    console.log('Coudlnt get Trage volume', err);
  }
}
