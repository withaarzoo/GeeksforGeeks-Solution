class Solution:
    def findMean(self, arr, queries):
        n = len(arr)

        # Prefix sum array
        prefix = [0] * (n + 1)

        # Build prefix sum
        for i in range(n):
            prefix[i + 1] = prefix[i] + arr[i]

        ans = []

        # Process each query
        for l, r in queries:
            # Sum of subarray [l...r]
            total = prefix[r + 1] - prefix[l]

            # Length of range
            length = r - l + 1

            # Floor mean
            ans.append(total // length)

        return ans