// User function Template for javascript

class Solution {
  minCost(houses) {
    const n = houses.length;

    // minDist[i] = minimum cost to connect house i
    const minDist = new Array(n).fill(Infinity);

    // visited[i] = whether house i is already included in MST
    const visited = new Array(n).fill(false);

    // Start from house 0
    minDist[0] = 0;

    let totalCost = 0;

    // Include all houses in MST
    for (let i = 0; i < n; i++) {
      let u = -1;

      // Find the unvisited house with minimum connection cost
      for (let j = 0; j < n; j++) {
        if (!visited[j] && (u === -1 || minDist[j] < minDist[u])) {
          u = j;
        }
      }

      // Include this house in MST
      visited[u] = true;
      totalCost += minDist[u];

      // Update distances for remaining houses
      for (let v = 0; v < n; v++) {
        if (!visited[v]) {
          const cost =
            Math.abs(houses[u][0] - houses[v][0]) +
            Math.abs(houses[u][1] - houses[v][1]);

          minDist[v] = Math.min(minDist[v], cost);
        }
      }
    }

    return totalCost;
  }
}
