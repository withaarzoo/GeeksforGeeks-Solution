import math

class Solution:
    def constructArr(self, arr):
        m = len(arr)
        disc = 1 + 8 * m
        sq = int(math.isqrt(disc))
        n = (1 + sq) // 2

        if n < 2:
            return []

        if n == 2:
            # only one sum arr[0], return one valid pair [s, 0]
            return [arr[0], 0]

        # arr[0] = res0 + res1
        # arr[1] = res0 + res2
        # arr[n-1] = res1 + res2
        s01 = arr[0]
        s02 = arr[1]
        s12 = arr[n - 1]

        res0 = (s01 + s02 - s12) // 2

        res = [0] * n
        res[0] = res0
        for i in range(1, n):
            # arr[i-1] = res0 + res[i] => res[i] = arr[i-1] - res0
            res[i] = arr[i - 1] - res0
        return res
