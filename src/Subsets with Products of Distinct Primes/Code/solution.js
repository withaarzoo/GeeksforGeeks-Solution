/**
 * @param {number[]} arr
 * @return {number}
 */
class Solution {
  countSubsets(arr) {
    const MOD = 1000000007n;

    // All prime numbers up to 30
    const primes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29];

    // mask[x] stores the prime mask
    // -1 means invalid number
    const mask = new Array(31).fill(0);

    // Precompute masks
    for (let x = 2; x <= 30; x++) {
      let cur = x;
      let bits = 0;
      let ok = true;

      for (let i = 0; i < 10; i++) {
        let cnt = 0;

        // Count occurrences of each prime
        while (cur % primes[i] === 0) {
          cur /= primes[i];
          cnt++;
        }

        // Repeated prime makes it invalid
        if (cnt > 1) {
          ok = false;
          break;
        }

        // Store this prime in the mask
        if (cnt === 1) bits |= 1 << i;
      }

      mask[x] = ok ? bits : -1;
    }

    // DP over masks
    const dp = new Array(1 << 10).fill(0n);
    dp[0] = 1n;

    let ones = 0;

    for (const x of arr) {
      // Count ones separately
      if (x === 1) {
        ones++;
        continue;
      }

      // Ignore invalid numbers
      if (mask[x] === -1) continue;

      const curMask = mask[x];

      // Traverse backwards
      for (let m = (1 << 10) - 1; m >= 0; m--) {
        // Cannot repeat any prime
        if ((m & curMask) !== 0) continue;

        dp[m | curMask] = (dp[m | curMask] + dp[m]) % MOD;
      }
    }

    let ans = 0n;

    // Sum every state
    for (const v of dp) ans = (ans + v) % MOD;

    // Remove empty subset
    ans = (ans - 1n + MOD) % MOD;

    // Multiply by 2^ones
    let mul = 1n;
    while (ones--) mul = (mul * 2n) % MOD;

    return Number((ans * mul) % MOD);
  }
}
