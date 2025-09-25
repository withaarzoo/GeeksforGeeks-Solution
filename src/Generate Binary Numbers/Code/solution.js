/**
 * @param {number} n
 * @returns {String[]}
 */
class Solution {
  generateBinary(n) {
    const result = [];
    if (n <= 0) return result;

    // Use an array as an efficient queue with head index to avoid O(n) shift costs
    const q = [];
    let head = 0;
    q.push("1");

    for (let i = 0; i < n; i++) {
      const s = q[head++]; // pop front
      result.push(s); // store current
      q.push(s + "0"); // push s0
      q.push(s + "1"); // push s1
    }
    return result;
  }
}
