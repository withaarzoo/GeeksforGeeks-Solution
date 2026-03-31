/**
 * @param {number[]} arr
 * @param {number} k
 * @returns {number}
 */

class Solution {
  maxProfit(arr, k) {
    let n = arr.length;

    // hold = maximum profit when I currently have a stock
    let hold = -arr[0];

    // cash = maximum profit when I do not have a stock
    let cash = 0;

    for (let i = 1; i < n; i++) {
      // Save previous cash because hold depends on old cash
      let prevCash = cash;

      // Either keep holding previous stock
      // Or buy stock today
      hold = Math.max(hold, prevCash - arr[i]);

      // Either keep previous cash
      // Or sell stock today and pay fee
      cash = Math.max(cash, hold + arr[i] - k);
    }

    return cash;
  }
}
