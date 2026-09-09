class Solution {
  public:
    int findMax(int n) {
        // Start with n itself because n is also a valid number in the range.
        int bestNumber = n;

        // Calculate the digit sum of n so it can be used as the initial best sum.
        int temp = n;
        int bestSum = 0;

        // Find the digit sum of n.
        while (temp > 0) {
            // Add the last digit to the digit sum.
            bestSum += temp % 10;

            // Remove the last digit.
            temp /= 10;
        }

        // Find the number of digits in n.
        int digits = 0;
        temp = n;

        // Count every digit of n.
        while (temp > 0) {
            digits++;
            temp /= 10;
        }

        // 10^(digits - 1) represents the place value of the first digit.
        int power = 1;

        // Build the required power of 10 without using floating-point functions.
        for (int i = 1; i < digits; i++) {
            power *= 10;
        }

        // prefix stores all digits before the current digit.
        int prefix = 0;

        // prefixSum stores the sum of all digits before the current digit.
        int prefixSum = 0;

        // Process every digit from left to right.
        temp = n;

        for (int i = 0; i < digits; i++) {
            // Extract the current digit using its place value.
            int digit = (temp / power) % 10;

            // There is no useful candidate if the current digit is zero,
            // because decreasing zero would make the number invalid.
            if (digit > 0) {
                // Calculate how many digits are present after the current digit.
                int remaining = digits - i - 1;

                // Calculate the digit sum of the candidate:
                // prefix sum + decreased digit + all remaining digits as 9.
                int candidateSum =
                    prefixSum + (digit - 1) + 9 * remaining;

                // Construct the candidate using arithmetic.
                // prefix gets shifted left, the current digit is decreased,
                // and all digits after it are replaced with 9.
                int candidate =
                    prefix * 10 * power +
                    (digit - 1) * power +
                    (power - 1);

                // Update the answer if this candidate has a larger digit sum,
                // or if it has the same digit sum but is numerically larger.
                if (candidateSum > bestSum ||
                    (candidateSum == bestSum && candidate > bestNumber)) {
                    bestSum = candidateSum;
                    bestNumber = candidate;
                }
            }

            // Add the current digit to the prefix information.
            prefix = prefix * 10 + digit;
            prefixSum += digit;

            // Move the place value one position to the right.
            power /= 10;
        }

        // Return the number with the maximum digit sum.
        return bestNumber;
    }
};