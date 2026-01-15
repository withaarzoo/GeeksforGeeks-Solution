class Solution:
    def minCandy(self, arr):
        n = len(arr)
        if n == 0:
            return 0

        total = 1
        up = down = peak = 0

        for i in range(1, n):
            if arr[i] > arr[i - 1]:
                up += 1
                peak = up
                down = 0
                total += 1 + up
            elif arr[i] == arr[i - 1]:
                up = down = peak = 0
                total += 1
            else:
                down += 1
                up = 0
                total += 1 + down
                if down <= peak:
                    total -= 1

        return total
