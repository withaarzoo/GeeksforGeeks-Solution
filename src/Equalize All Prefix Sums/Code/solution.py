class Solution:
    def optimalArray(self, arr):
        n = len(arr)

        # Prefix sums for fast range sum calculation
        pref = [0] * (n + 1)

        for i in range(n):
            pref[i + 1] = pref[i] + arr[i]

        ans = []

        for i in range(n):

            # Median index of current prefix
            mid = i // 2

            median = arr[mid]

            # Cost to convert left side into median
            left_cost = median * (mid + 1) - pref[mid + 1]

            # Cost to convert right side into median
            right_cost = (
                pref[i + 1] - pref[mid + 1]
            ) - median * (i - mid)

            ans.append(left_cost + right_cost)

        return ans