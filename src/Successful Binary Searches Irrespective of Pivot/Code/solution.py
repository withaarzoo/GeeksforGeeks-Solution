class Solution:
    def countAlwaysFound(self, arr):
        n = len(arr)
        if n == 0:
            return 0
        sufMin = [0] * n
        sufMin[n-1] = arr[n-1]
        for i in range(n-2, -1, -1):
            sufMin[i] = min(arr[i], sufMin[i+1])
        ans = 0
        preMax = float('-inf')
        for i in range(n):
            leftOk = (i == 0) or (arr[i] > preMax)
            rightOk = (i == n-1) or (arr[i] < sufMin[i+1])
            if leftOk and rightOk:
                ans += 1
            preMax = max(preMax, arr[i])
        return ans