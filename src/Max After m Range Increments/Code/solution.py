class Solution:
    def findMax(self, n, a, b, k):

        # Difference array for range updates
        diff = [0] * (n + 1)

        # Process every operation
        for i in range(len(a)):

            # Increment starts here
            diff[a[i]] += k[i]

            # Stop increment after the range
            if b[i] + 1 < n:
                diff[b[i] + 1] -= k[i]

        current = 0
        maximum = 0

        # Prefix sum reconstructs the original array
        for i in range(n):

            # Current value at this index
            current += diff[i]

            # Keep track of the maximum value
            maximum = max(maximum, current)

        return maximum