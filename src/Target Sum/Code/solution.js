class Solution {
  /**
   * @param number[] arr
   * @param number target
   * @returns number
   */
  totalWays(arr, target) {
    let totalSum = 0;

    for (let num of arr) {
      totalSum += num;
    }

    // If target cannot be formed
    if (Math.abs(target) > totalSum) {
      return 0;
    }

    // totalSum + target must be even
    if ((totalSum + target) % 2 !== 0) {
      return 0;
    }

    let required = Math.floor((totalSum + target) / 2);

    let dp = new Array(required + 1).fill(0);
    dp[0] = 1;

    for (let num of arr) {
      for (let sum = required; sum >= num; sum--) {
        dp[sum] += dp[sum - num];
      }
    }

    return dp[required];
  }
}
