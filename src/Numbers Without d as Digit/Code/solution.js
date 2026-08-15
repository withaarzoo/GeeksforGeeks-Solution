/*
 * @param {number} n
 * @param {number} d
 * @return {number}
 */
class Solution {
  countWithout(n, d) {
    // I convert n to a string so I can process each digit from left to right.
    const s = String(n);

    // dp[tight][started] stores the number of valid ways for the processed prefix.
    // tight = 1 means the prefix is equal to n's prefix.
    // started = 1 means the number has already started.
    let dp = [
      [0, 0],
      [1, 0],
    ];

    // I process every digit of n.
    for (let pos = 0; pos < s.length; pos++) {
      // I create an empty DP table for the next position.
      const next = [
        [0, 0],
        [0, 0],
      ];

      // I check every possible tight and started state.
      for (let tight = 0; tight <= 1; tight++) {
        for (let started = 0; started <= 1; started++) {
          // I skip states that cannot produce any number.
          if (dp[tight][started] === 0) {
            continue;
          }

          // A tight state is limited by n's current digit.
          // A non-tight state can use any digit from 0 to 9.
          const limit = tight === 1 ? Number(s[pos]) : 9;

          // I try every digit that can be placed here.
          for (let digit = 0; digit <= limit; digit++) {
            // A zero before the first real digit is only a leading zero.
            const nextStarted = started === 1 || digit !== 0;

            // I reject the forbidden digit only after the number has started.
            if (nextStarted && digit === d) {
              continue;
            }

            // The next state stays tight only when the chosen digit
            // is exactly equal to n's current digit.
            const nextTight = tight === 1 && digit === limit ? 1 : 0;

            // I add the number of ways from the current state
            // to the corresponding next state.
            next[nextTight][nextStarted ? 1 : 0] += dp[tight][started];
          }
        }
      }

      // I move to the DP table for the next digit position.
      dp = next;
    }

    // I count only numbers that actually started.
    // The state with started = 0 represents only the number 0.
    return dp[0][1] + dp[1][1];
  }
}
