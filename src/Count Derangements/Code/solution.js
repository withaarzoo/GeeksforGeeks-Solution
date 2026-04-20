class Solution {
  derangeCount(n) {
    // Base cases
    if (n === 1) return 0;
    if (n === 2) return 1;

    // D(1) = 0, D(2) = 1
    let prev2 = 0;
    let prev1 = 1;

    // Build answer from 3 to n
    for (let i = 3; i <= n; i++) {
      let curr = (i - 1) * (prev1 + prev2);

      // Update previous values
      prev2 = prev1;
      prev1 = curr;
    }

    return prev1;
  }
}
