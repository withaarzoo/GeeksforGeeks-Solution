class Solution:
    def minSubsets(self, arr):
        # Store all elements for O(1) average lookup
        st = set(arr)

        ans = 0

        # Count every number that has no previous consecutive number
        for x in arr:
            if x - 1 not in st:
                ans += 1

        # Return the answer
        return ans