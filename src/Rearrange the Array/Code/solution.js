/**
 * @param {number[]} b
 * @return {number}
 */

class Solution {
  minOperations(b) {
    const MOD = 1000000007n;
    const n = b.length;

    // Marks visited indices
    const vis = new Array(n).fill(false);

    // Stores maximum exponent of every prime
    const mp = new Map();

    // Find all cycles
    for (let i = 0; i < n; i++) {
      if (vis[i]) continue;

      let cur = i;
      let len = 0;

      // Traverse one cycle
      while (!vis[cur]) {
        vis[cur] = true;
        cur = b[cur] - 1;
        len++;
      }

      // Prime factorization
      let x = len;

      for (let p = 2; p * p <= x; p++) {
        if (x % p === 0) {
          let cnt = 0;

          while (x % p === 0) {
            x /= p;
            cnt++;
          }

          mp.set(p, Math.max(mp.get(p) || 0, cnt));
        }
      }

      // Remaining prime
      if (x > 1) mp.set(x, Math.max(mp.get(x) || 0, 1));
    }

    let ans = 1n;

    // Build LCM modulo MOD
    for (const [prime, exp] of mp) {
      for (let i = 0; i < exp; i++) {
        ans = (ans * BigInt(prime)) % MOD;
      }
    }

    return Number(ans);
  }
}
