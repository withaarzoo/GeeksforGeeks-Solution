/**
 * @param {string} s
 * @param {string[][]} jumps  // each element: [fromChar, toChar]
 * @returns {number}
 */
class Solution {
  maxScore(s, jumps) {
    const n = s.length;
    if (n <= 1) return 0;

    // 1. Prefix sum of ASCII values
    const pref = new Array(n + 1).fill(0);
    for (let i = 0; i < n; i++) {
      pref[i + 1] = pref[i] + s.charCodeAt(i);
    }

    const ALPHA = 26;

    // 2. nextInd[i][c] = next index > i where char ('a'+c) occurs
    const nextInd = Array.from({ length: n }, () => new Array(ALPHA).fill(-1));
    const last = new Array(ALPHA).fill(-1);

    for (let i = n - 1; i >= 0; i--) {
      for (let c = 0; c < ALPHA; c++) {
        nextInd[i][c] = last[c];
      }
      const idx = s.charCodeAt(i) - 97; // 'a' = 97
      last[idx] = i;
    }

    // 3. Build adjacency list of characters
    const adj = Array.from({ length: ALPHA }, () => []);
    if (jumps) {
      for (const pair of jumps) {
        if (!pair || pair.length < 2) continue;
        const u = pair[0].charCodeAt(0) - 97;
        const v = pair[1].charCodeAt(0) - 97;
        if (u < 0 || u >= ALPHA || v < 0 || v >= ALPHA) continue;
        adj[u].push(v);
      }
    }

    // Add self-jumps and dedupe
    for (let c = 0; c < ALPHA; c++) {
      adj[c].push(c);
      const set = new Set(adj[c]);
      adj[c] = Array.from(set);
    }

    // 4. DP from right to left
    const dp = new Array(n).fill(0);
    dp[n - 1] = 0;

    for (let i = n - 2; i >= 0; i--) {
      let best = 0;
      const fromIdx = s.charCodeAt(i) - 97;
      const fromAscii = s.charCodeAt(i);

      for (const destChar of adj[fromIdx]) {
        const j = nextInd[i][destChar];
        if (j === -1) continue;

        let gain = pref[j] - pref[i]; // s[i..j-1]
        if (destChar === fromIdx) {
          gain -= fromAscii; // exclude s[i] if same as destination char
        }
        best = Math.max(best, gain + dp[j]);
      }
      dp[i] = best;
    }

    return dp[0];
  }
}

module.exports = Solution;
