class Solution {
  distinctSubseq(str) {
    const MOD = 1000000007;
    const n = str.length;

    // dp[i] = number of distinct subsequences of prefix str[0..i-1]
    const dp = new Array(n + 1).fill(0);
    dp[0] = 1; // empty subsequence

    // last[pos] = last index (1..n) where character 'a'+pos appeared
    const last = new Array(26).fill(0);

    for (let i = 1; i <= n; i++) {
      const chIndex = str.charCodeAt(i - 1) - "a".charCodeAt(0);

      // Double the number of subsequences
      let val = (2 * dp[i - 1]) % MOD;

      // Subtract previously counted subsequences if char repeated
      if (last[chIndex] !== 0) {
        const prevPos = last[chIndex];
        val = (val - dp[prevPos - 1] + MOD) % MOD;
      }

      dp[i] = val;
      last[chIndex] = i; // update last occurrence
    }

    return dp[n] % MOD;
  }
}
