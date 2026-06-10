class Solution:
    def binarySearchable(self, arr):
        # I store the answer in a variable that the nested DFS updates.
        count = 0

        def dfs(l, r, low, high):
            nonlocal count

            # If the segment is empty, binary search would stop here.
            if l > r:
                return

            # I take the middle because binary search always checks it first.
            mid = (l + r) // 2
            val = arr[mid]

            # If the value fits the current range, this element is searchable.
            if low < val < high:
                count += 1

            # Left side elements must be smaller than the current value.
            dfs(l, mid - 1, low, min(high, val))

            # Right side elements must be larger than the current value.
            dfs(mid + 1, r, max(low, val), high)

        # I begin with the full range and no value restrictions.
        dfs(0, len(arr) - 1, float("-inf"), float("inf"))
        return count