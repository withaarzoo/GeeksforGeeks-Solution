class Solution:
    def maxProduct(self, n):

        # For n = 2, only cut possible is 1 + 1
        if n == 2:
            return 1

        # For n = 3, one cut is mandatory
        if n == 3:
            return 2

        # Store maximum product
        ans = 1

        # Keep taking segments of length 3
        while n > 4:
            ans *= 3  # Include one piece of length 3
            n -= 3    # Reduce remaining rope length

        # Multiply the leftover part
        return ans * n