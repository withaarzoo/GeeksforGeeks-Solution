/**
 * @param {number} n
 * @param {string} s
 * @returns {number}
 */
class Solution {
  // Function to find the answer.
  solve(n, s) {
    // state[i] stores the status of customer 'A' + i:
    // 0 = not seen, 1 = got a computer, 2 = was rejected.
    const state = new Array(26).fill(0);

    // Initially, all n computers are free.
    let available = n;

    // This stores the number of rejected customers.
    let rejected = 0;

    // Process every customer event in order.
    for (const ch of s) {
      // Convert the uppercase letter into an index from 0 to 25.
      const id = ch.charCodeAt(0) - 65;

      // state 0 means this is the first occurrence,
      // so the customer is arriving.
      if (state[id] === 0) {
        // If a computer is available, assign it.
        if (available > 0) {
          available--; // One computer is now occupied.
          state[id] = 1; // Mark the customer as accepted.
        } else {
          // No computer is free, so reject this customer.
          rejected++;

          // Remember the rejection so the second occurrence
          // does not incorrectly free a computer.
          state[id] = 2;
        }
      } else {
        // This is the customer's second occurrence,
        // which means the customer is leaving.
        if (state[id] === 1) {
          available++; // Their computer becomes free.
        }
      }
    }

    // Return the total number of rejected customers.
    return rejected;
  }
}
