class Solution:
    def minDiff(self, k: int, arr: list[int]) -> int:
        n = len(arr)
        preMax = [0] * n
        preMin = [0] * n
        sufMax = [0] * n
        sufMin = [0] * n
        preMax[0] = preMin[0] = arr[0]
        for i in range(1, n):
            preMax[i] = max(preMax[i - 1], arr[i])
            preMin[i] = min(preMin[i - 1], arr[i])
        sufMax[n - 1] = sufMin[n - 1] = arr[n - 1]
        for i in range(n - 2, -1, -1):
            sufMax[i] = max(sufMax[i + 1], arr[i])
            sufMin[i] = min(sufMin[i + 1], arr[i])
        m = n - k
        ans = float('inf')
        for left in range(m + 1):
            right = left + k
            if left == 0:
                curMax = sufMax[right]
                curMin = sufMin[right]
            elif right == n:
                curMax = preMax[left - 1]
                curMin = preMin[left - 1]
            else:
                curMax = max(preMax[left - 1], sufMax[right])
                curMin = min(preMin[left - 1], sufMin[right])
            ans = min(ans, curMax - curMin)
        return ans