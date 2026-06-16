/**
 * @param {number[][]} queries
 * @return {number[]}
 */
class Solution {
  constructList(queries) {
    // XOR of all future type-1 operations
    let xr = 0;

    // Stores final values
    let ans = [];

    // Traverse from right to left
    for (let i = queries.length - 1; i >= 0; i--) {
      // XOR query
      if (queries[i][0] === 1) {
        xr ^= queries[i][1];
      } else {
        // Inserted element after future XORs
        ans.push(queries[i][1] ^ xr);
      }
    }

    // Initial value 0 transformed by all XORs
    ans.push(xr);

    // Sort numerically
    ans.sort((a, b) => a - b);

    return ans;
  }
}
