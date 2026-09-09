class Solution:
    def findMax(self, n):
        # Start with n because n itself is a valid candidate.
        best_number = n

        # Use temp to calculate the digit sum of n.
        temp = n
        best_sum = 0

        # Calculate the digit sum of n.
        while temp > 0:
            # Add the last digit to the digit sum.
            best_sum += temp % 10

            # Remove the last digit.
            temp //= 10

        # Find the number of digits in n.
        digits = 0
        temp = n

        # Count every digit of n.
        while temp > 0:
            digits += 1
            temp //= 10

        # Start with the place value of the first digit.
        power = 1

        # Calculate 10^(digits - 1).
        for _ in range(1, digits):
            power *= 10

        # prefix stores all digits before the current digit.
        prefix = 0

        # prefix_sum stores the sum of all prefix digits.
        prefix_sum = 0

        # Reset temp so I can process n from left to right.
        temp = n

        # Process every digit exactly once.
        for i in range(digits):
            # Extract the current digit using its place value.
            digit = (temp // power) % 10

            # A zero cannot be decreased to form a valid digit.
            if digit > 0:
                # Count how many digits are after the current digit.
                remaining = digits - i - 1

                # Calculate the digit sum of the candidate.
                # All digits after the current one become 9.
                candidate_sum = (
                    prefix_sum + (digit - 1) + 9 * remaining
                )

                # Build the candidate using arithmetic.
                candidate = (
                    prefix * 10 * power
                    + (digit - 1) * power
                    + (power - 1)
                )

                # Update the answer if the candidate has a larger
                # digit sum, or if it is larger when the sums are equal.
                if (
                    candidate_sum > best_sum
                    or (
                        candidate_sum == best_sum
                        and candidate > best_number
                    )
                ):
                    best_sum = candidate_sum
                    best_number = candidate

            # Add the current digit to the prefix number.
            prefix = prefix * 10 + digit

            # Add the current digit to the prefix digit sum.
            prefix_sum += digit

            # Move the place value one position to the right.
            power //= 10

        # Return the number with the maximum digit sum.
        return best_number