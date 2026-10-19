class Solution:
    def goodIndices(self, arr):
        n = len(arr)
        status = [0] * n
        ans = 0
        for i in range(n):
            if status[i] != 0:
                continue
            path = []
            curr = i
            while 0 <= curr < n and status[curr] == 0:
                status[curr] = 1
                path.append(curr)
                curr += arr[curr]
            good = False
            if curr < 0 or curr >= n:
                good = True
            elif status[curr] == 2:
                good = True
            finalStatus = 2 if good else 3
            for idx in path:
                status[idx] = finalStatus
        for s in status:
            if s == 2:
                ans += 1
        return ans