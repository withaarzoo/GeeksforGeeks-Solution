/**
 * @param {number} V
 * @param {number[][]} edges
 * @returns {number}
 */

class Solution {
  maxEdgesToAdd(V, edges) {
    // total forward pairs = V*(V-1)/2
    const totalPairs = (V * (V - 1)) / 2;
    const existing = edges.length; // current edges count
    return totalPairs - existing;
  }
}
