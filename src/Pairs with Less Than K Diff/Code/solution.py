class Solution:
    def countPairs(self, arr: list[int], k: int) -> int:
        # Sort the array so valid pairs appear together
        arr.sort()

        n = len(arr)
        j = 1
        ans = 0

        # Use every element as the first element of a pair
        for i in range(n):

            # Make sure j is always ahead of i
            if j <= i:
                j = i + 1

            # Expand the window while difference is less than k
            while j < n and arr[j] - arr[i] < k:
                j += 1

            # Every element between i+1 and j-1 forms a valid pair
            ans += j - i - 1

        # Return the total count
        return ans