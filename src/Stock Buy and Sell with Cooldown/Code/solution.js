/**
 * @param {number[]} arr
 * @returns {number}
 */

class Solution {
  maxProfit(arr) {
    const n = arr.length;
    if (n === 0) return 0;

    let hold = -arr[0]; // end day holding a stock
    let sold = Number.NEGATIVE_INFINITY; // sold today (cooldown tomorrow)
    let rest = 0; // free to buy

    for (let i = 1; i < n; i++) {
      const price = arr[i];

      const newHold = Math.max(hold, rest - price);
      const newSold = hold + price;
      const newRest = Math.max(rest, sold);

      hold = newHold;
      sold = newSold;
      rest = newRest;
    }
    return Math.max(sold, rest);
  }
}
