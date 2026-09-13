/*
 * @param {number[][]} adj
 * @return {number}
 */
class Solution {
  partyHouse(adj) {
    const n = adj.length;
    if (n === 1) return 0;

    // returns [farthest node index, distance]
    const bfs = (start) => {
      const dist = new Array(n).fill(-1);
      const q = [start];
      dist[start] = 0;
      let far = start;
      let head = 0;
      while (head < q.length) {
        const u = q[head++];
        for (const v of adj[u]) {
          const idx = v - 1; // convert 1-based house number to 0-based index
          if (dist[idx] === -1) {
            dist[idx] = dist[u] + 1;
            q.push(idx);
            if (dist[idx] > dist[far]) far = idx;
          }
        }
      }
      return [far, dist[far]];
    };

    const [u] = bfs(0);
    const [, diameter] = bfs(u);
    return Math.floor((diameter + 1) / 2);
  }
}
