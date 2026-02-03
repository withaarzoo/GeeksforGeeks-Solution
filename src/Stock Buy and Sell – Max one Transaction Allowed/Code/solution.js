class Solution {
  maxProfit(prices) {
    let minPrice = prices[0]; // Minimum price seen so far
    let maxProfit = 0; // Maximum profit

    for (let i = 1; i < prices.length; i++) {
      if (prices[i] < minPrice) {
        minPrice = prices[i];
      } else {
        maxProfit = Math.max(maxProfit, prices[i] - minPrice);
      }
    }

    return maxProfit;
  }
}
