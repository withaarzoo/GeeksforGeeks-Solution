class Solution:
    def maxDiffSubArrays(self, arr):
        n = len(arr)

        # Arrays to store best values.
        leftMax = [0] * n
        leftMin = [0] * n
        rightMax = [0] * n
        rightMin = [0] * n

        # Kadane for maximum subarray from left.
        curr = arr[0]
        leftMax[0] = arr[0]

        for i in range(1, n):
            # Extend previous subarray or start a new one.
            curr = max(arr[i], curr + arr[i])

            # Best maximum till this index.
            leftMax[i] = max(leftMax[i - 1], curr)

        # Kadane for minimum subarray from left.
        curr = arr[0]
        leftMin[0] = arr[0]

        for i in range(1, n):
            curr = min(arr[i], curr + arr[i])
            leftMin[i] = min(leftMin[i - 1], curr)

        # Kadane for maximum subarray from right.
        curr = arr[-1]
        rightMax[-1] = arr[-1]

        for i in range(n - 2, -1, -1):
            curr = max(arr[i], curr + arr[i])
            rightMax[i] = max(rightMax[i + 1], curr)

        # Kadane for minimum subarray from right.
        curr = arr[-1]
        rightMin[-1] = arr[-1]

        for i in range(n - 2, -1, -1):
            curr = min(arr[i], curr + arr[i])
            rightMin[i] = min(rightMin[i + 1], curr)

        ans = 0

        # Try every possible split.
        for i in range(n - 1):
            ans = max(ans, abs(leftMax[i] - rightMin[i + 1]))
            ans = max(ans, abs(leftMin[i] - rightMax[i + 1]))

        return ans