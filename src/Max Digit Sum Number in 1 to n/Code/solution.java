class Solution {
    public int findMax(int n) {
        // Start with n because n itself is a valid candidate.
        int bestNumber = n;

        // Use a temporary variable to calculate the digit sum of n.
        int temp = n;
        int bestSum = 0;

        // Calculate the digit sum of n.
        while (temp > 0) {
            // Add the last digit to the digit sum.
            bestSum += temp % 10;

            // Remove the last digit.
            temp /= 10;
        }

        // Count the number of digits in n.
        int digits = 0;
        temp = n;

        // Increase the digit count one position at a time.
        while (temp > 0) {
            digits++;
            temp /= 10;
        }

        // Start with the place value of the first digit.
        int power = 1;

        // Calculate 10^(digits - 1).
        for (int i = 1; i < digits; i++) {
            power *= 10;
        }

        // prefix stores the digits before the current digit.
        int prefix = 0;

        // prefixSum stores the sum of those prefix digits.
        int prefixSum = 0;

        // Reset temp so I can process every digit from left to right.
        temp = n;

        // Visit each digit exactly once.
        for (int i = 0; i < digits; i++) {
            // Extract the current digit using its place value.
            int digit = (temp / power) % 10;

            // Zero cannot be decreased to create a valid decimal digit.
            if (digit > 0) {
                // Count how many digits are to the right of the current digit.
                int remaining = digits - i - 1;

                // Calculate the digit sum after decreasing this digit
                // and replacing all following digits with 9.
                int candidateSum = prefixSum + (digit - 1) + 9 * remaining;

                // Build the candidate without converting n to a string.
                int candidate = prefix * 10 * power +
                        (digit - 1) * power +
                        (power - 1);

                // Keep this candidate if its digit sum is better,
                // or if the digit sum is equal and the candidate is larger.
                if (candidateSum > bestSum ||
                        (candidateSum == bestSum && candidate > bestNumber)) {
                    bestSum = candidateSum;
                    bestNumber = candidate;
                }
            }

            // Add the current digit to the prefix.
            prefix = prefix * 10 + digit;

            // Add the current digit to the prefix digit sum.
            prefixSum += digit;

            // Move the place value to the next digit.
            power /= 10;
        }

        // Return the best number found.
        return bestNumber;
    }
}