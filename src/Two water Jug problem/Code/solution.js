class Solution {
  // Function to calculate GCD
  gcd(a, b) {
    while (b !== 0) {
      let temp = a % b;
      a = b;
      b = temp;
    }
    return a;
  }

  // Simulate pouring from one jug to another
  pour(fromCap, toCap, d) {
    let from = fromCap;
    let to = 0;
    let steps = 1; // Fill source jug

    while (from !== d && to !== d) {
      // Pour water from source to target
      let transfer = Math.min(from, toCap - to);
      to += transfer;
      from -= transfer;
      steps++;

      // If answer found
      if (from === d || to === d) {
        break;
      }

      // Refill source jug if empty
      if (from === 0) {
        from = fromCap;
        steps++;
      }

      // Empty target jug if full
      if (to === toCap) {
        to = 0;
        steps++;
      }
    }

    return steps;
  }

  minSteps(m, n, d) {
    // Impossible case
    if (d > Math.max(m, n)) {
      return -1;
    }

    // d must be divisible by gcd
    if (d % this.gcd(m, n) !== 0) {
      return -1;
    }

    // Return minimum steps from both directions
    return Math.min(this.pour(m, n, d), this.pour(n, m, d));
  }
}
