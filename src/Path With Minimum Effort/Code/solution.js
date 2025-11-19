/**
 * @param {number[][]} mat
 * @returns {number}
 */
class Solution {
  minCostPath(mat) {
    const n = mat.length;
    if (n === 0) return 0;
    const m = mat[0].length;
    if (n === 1 && m === 1) return 0;

    // compute bounds for binary search: the maximum possible edge difference
    let minV = Number.MAX_SAFE_INTEGER,
      maxV = Number.MIN_SAFE_INTEGER;
    for (let i = 0; i < n; ++i) {
      for (let j = 0; j < m; ++j) {
        const v = mat[i][j];
        if (v < minV) minV = v;
        if (v > maxV) maxV = v;
      }
    }
    let low = 0,
      high = maxV - minV; // possible answer lies in [0, high]

    const dr = [1, -1, 0, 0];
    const dc = [0, 0, 1, -1];

    // BFS/queue-based check: can we reach bottom-right using only edges <= limit?
    const canReach = (limit) => {
      // visited grid
      const vis = Array.from({ length: n }, () => Array(m).fill(false));
      // simple queue using array and head pointer to avoid shift()
      const q = new Array(n * m);
      let head = 0,
        tail = 0;
      q[tail++] = (0 << 16) | 0; // pack r and c into one int for tiny speed-up (r<<16 | c)
      vis[0][0] = true;

      while (head < tail) {
        const packed = q[head++];
        const r = packed >>> 16; // unsigned right shift to get r
        const c = packed & 0xffff;
        if (r === n - 1 && c === m - 1) return true;
        const baseVal = mat[r][c];
        for (let k = 0; k < 4; ++k) {
          const nr = r + dr[k],
            nc = c + dc[k];
          if (nr < 0 || nr >= n || nc < 0 || nc >= m) continue;
          if (vis[nr][nc]) continue;
          // edge weight
          if (Math.abs(baseVal - mat[nr][nc]) <= limit) {
            vis[nr][nc] = true;
            q[tail++] = (nr << 16) | nc;
          }
        }
      }
      return false;
    };

    // binary search minimal limit for which canReach(limit) is true
    let ans = high;
    while (low <= high) {
      const mid = (low + high) >>> 1;
      if (canReach(mid)) {
        ans = mid;
        high = mid - 1;
      } else {
        low = mid + 1;
      }
    }
    return ans;
  }
}
