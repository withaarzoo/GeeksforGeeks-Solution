class Solution:
    def maxSum(self, arr):
        n = len(arr)

        arrSum = 0
        currVal = 0

        # Initial calculation
        for i in range(n):
            arrSum += arr[i]
            currVal += i * arr[i]

        maxVal = currVal

        # Rotate and update value
        for i in range(1, n):
            currVal = currVal + arrSum - n * arr[n - i]
            maxVal = max(maxVal, currVal)

        return maxVal
