class Solution:
    def findDuplicates(self, arr):
        n = len(arr)
        ans = []

        for i in range(n):
            x = abs(arr[i])   # value between [1, n]
            idx = x - 1       # mapped index

            if arr[idx] > 0:
                # First time seeing x, mark it as seen
                arr[idx] = -arr[idx]
            else:
                # Already negative -> x is duplicate
                ans.append(x)

        return ans  # driver will print sorted if required
