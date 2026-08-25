class Solution:
    def minMoves(self, arr):
        n = len(arr)  # Store the total number of elements in the permutation.

        pos = [0] * (n + 1)  # pos[value] will store the index where that value appears.

        for i in range(n):
            pos[arr[i]] = i  # Record each value's position for O(1) comparison later.

        current = 1  # A single value always forms a valid consecutive sequence.
        longest = 1  # Store the maximum valid sequence length found so far.

        for value in range(1, n):
            # If value comes before value + 1, their relative order is already correct.
            if pos[value] < pos[value + 1]:
                current += 1  # Extend the current consecutive sequence.
            else:
                current = 1  # Reset because this pair breaks the required order.

            longest = max(longest, current)  # Keep the longest valid sequence found.

        return n - longest  # Move every element that is outside the longest untouched sequence.