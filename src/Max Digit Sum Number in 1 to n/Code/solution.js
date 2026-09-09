/**
 * @param {number} n
 * @returns {number}
 */

class Solution {
  findMax(n) {
    // Start with n because it is already a valid number in the range.
    let bestNumber = n;

    // Use temp to calculate the digit sum of n.
    let temp = n;
    let bestSum = 0;

    // Calculate the digit sum of n.
    while (temp > 0) {
      // Add the last digit to the digit sum.
      bestSum += temp % 10;

      // Remove the last digit.
      temp = Math.floor(temp / 10);
    }

    // Find how many digits n contains.
    let digits = 0;
    temp = n;

    // Count each digit of n.
    while (temp > 0) {
      digits++;
      temp = Math.floor(temp / 10);
    }

    // Start with a place value of 1.
    let power = 1;

    // Calculate 10^(digits - 1), which is the place value of the first digit.
    for (let i = 1; i < digits; i++) {
      power *= 10;
    }

    // prefix stores the digits before the current digit.
    let prefix = 0;

    // prefixSum stores the sum of the prefix digits.
    let prefixSum = 0;

    // Reset temp so every digit can be processed from left to right.
    temp = n;

    // Process each digit once.
    for (let i = 0; i < digits; i++) {
      // Extract the current digit using its place value.
      const digit = Math.floor(temp / power) % 10;

      // A zero cannot be decreased while remaining a valid digit.
      if (digit > 0) {
        // Count the number of digits after the current digit.
        const remaining = digits - i - 1;

        // Calculate the digit sum of the candidate.
        const candidateSum = prefixSum + (digit - 1) + 9 * remaining;

        // Build the candidate using arithmetic instead of strings.
        const candidate =
          prefix * 10 * power + (digit - 1) * power + (power - 1);

        // Update the answer when the candidate is better.
        // For equal sums, keep the larger number.
        if (
          candidateSum > bestSum ||
          (candidateSum === bestSum && candidate > bestNumber)
        ) {
          bestSum = candidateSum;
          bestNumber = candidate;
        }
      }

      // Add the current digit to the prefix number.
      prefix = prefix * 10 + digit;

      // Add the current digit to the prefix digit sum.
      prefixSum += digit;

      // Move the place value one position to the right.
      power /= 10;
    }

    // Return the number having the maximum digit sum.
    return bestNumber;
  }
}
