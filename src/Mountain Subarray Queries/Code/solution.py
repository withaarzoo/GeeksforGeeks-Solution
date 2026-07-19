class Solution:
    def processQueries(self, arr, queries):
        n = len(arr)

        # up[i] = farthest index reachable while remaining non-decreasing
        up = [0] * n

        # down[i] = farthest index reachable while remaining non-increasing
        down = [0] * n

        # Last element
        up[n - 1] = n - 1

        # Build non-decreasing reach array
        for i in range(n - 2, -1, -1):
            if arr[i] <= arr[i + 1]:
                up[i] = up[i + 1]
            else:
                up[i] = i

        # Last element
        down[n - 1] = n - 1

        # Build non-increasing reach array
        for i in range(n - 2, -1, -1):
            if arr[i] >= arr[i + 1]:
                down[i] = down[i + 1]
            else:
                down[i] = i

        ans = []

        # Process every query
        for l, r in queries:

            # End of increasing part
            peak = up[l]

            # Entire range is non-decreasing
            if peak >= r:
                ans.append(True)

            # Otherwise decreasing part must cover the rest
            else:
                ans.append(down[peak] >= r)

        return ans