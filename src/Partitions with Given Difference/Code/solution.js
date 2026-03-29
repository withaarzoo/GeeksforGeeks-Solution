class Solution {
  /**
   * @param number[] arr
   * @param number diff
   * @returns number
   */
  countPartitions(arr, diff) {
    let totalSum = 0;

    // Calculate total sum
    for (let num of arr) {
      totalSum += num;
    }

    // If totalSum + diff is odd, no valid partition exists
    if ((totalSum + diff) % 2 !== 0) {
      return 0;
    }

    let target = Math.floor((totalSum + diff) / 2);

    // dp[j] = number of ways to make sum j
    let dp = new Array(target + 1).fill(0);

    // One way to make sum 0
    dp[0] = 1;

    for (let num of arr) {
      // Traverse backwards
      for (let j = target; j >= num; j--) {
        dp[j] += dp[j - num];
      }
    }

    return dp[target];
  }
}
