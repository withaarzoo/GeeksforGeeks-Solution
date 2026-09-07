class Solution:
    def minCount(self, arr):
        """Return the minimum number of elements that cannot be used."""
        n = len(arr)  # Store the number of elements in the array.
        NEG = -10**9  # Represents a DP state that cannot be reached.

        # prev[i][j] stores the maximum number of used elements after
        # the previous prefix, where i and j are the last indices of
        # the increasing and decreasing subsequences.
        prev = [[NEG] * (n + 1) for _ in range(n + 1)]

        prev[0][0] = 0  # Initially both subsequences are empty.

        # Process every element from left to right.
        for k in range(1, n + 1):
            # cur stores the states after processing arr[k - 1].
            cur = [[NEG] * (n + 1) for _ in range(n + 1)]

            # Try every possible pair of previous last indices.
            for i in range(n + 1):
                for j in range(n + 1):
                    if prev[i][j] == NEG:
                        continue  # Ignore states that were never reachable.

                    # Option 1: Leave the current element unused.
                    cur[i][j] = max(cur[i][j], prev[i][j])

                    # Option 2: Add the current element to the increasing subsequence.
                    # Index 0 means that the increasing subsequence is empty.
                    if i == 0 or arr[k - 1] > arr[i - 1]:
                        cur[k][j] = max(cur[k][j], prev[i][j] + 1)

                    # Option 3: Add the current element to the decreasing subsequence.
                    # Index 0 means that the decreasing subsequence is empty.
                    if j == 0 or arr[k - 1] < arr[j - 1]:
                        cur[i][k] = max(cur[i][k], prev[i][j] + 1)

            # The current layer becomes the previous layer for the next element.
            prev = cur

        best = 0  # Store the maximum number of elements used.

        # Check every final state for the largest number of selected elements.
        for i in range(n + 1):
            for j in range(n + 1):
                best = max(best, prev[i][j])

        # The remaining elements are exactly the elements left unused.
        return n - best