class Solution {
  minCost(heights, cost) {
    let n = heights.length;

    // Pair height and cost
    let towers = [];
    for (let i = 0; i < n; i++) {
      towers.push([heights[i], cost[i]]);
    }

    // Sort by height
    towers.sort((a, b) => a[0] - b[0]);

    // Total weight
    let totalWeight = 0;
    for (let i = 0; i < n; i++) {
      totalWeight += towers[i][1];
    }

    let currWeight = 0;
    let targetHeight = 0;

    // Find weighted median
    for (let i = 0; i < n; i++) {
      currWeight += towers[i][1];
      if (currWeight * 2 >= totalWeight) {
        targetHeight = towers[i][0];
        break;
      }
    }

    let result = 0;
    for (let i = 0; i < n; i++) {
      result += Math.abs(towers[i][0] - targetHeight) * towers[i][1];
    }

    return result;
  }
}
