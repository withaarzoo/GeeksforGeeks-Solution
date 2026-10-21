class Solution:
    def minSubarraySum(self, arr: list[int]) -> int:
        n = len(arr)
        minEnding = arr[0]
        minSoFar = arr[0]
        for i in range(1, n):
            minEnding = min(arr[i], minEnding + arr[i])
            minSoFar = min(minSoFar, minEnding)
        return minSoFar