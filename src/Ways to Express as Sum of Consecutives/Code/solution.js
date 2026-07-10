class Solution {
  getCount(n) {
    // Remove every factor of 2 because only odd divisors matter.
    while (n % 2 === 0) {
      n /= 2;
    }

    // This will store the number of divisors of the remaining odd part.
    let divisorCount = 0;

    // I only check up to sqrt(n) because divisors always come in pairs.
    for (let i = 1; i * i <= n; i++) {
      // If i divides n, then i and n / i form a divisor pair.
      if (n % i === 0) {
        // A perfect square has only one divisor at this point.
        if (i * i === n) {
          divisorCount++;
        } else {
          // Otherwise, both i and n / i are different divisors.
          divisorCount += 2;
        }
      }
    }

    // Remove the single-number representation consisting of n itself.
    return divisorCount - 1;
  }
}
