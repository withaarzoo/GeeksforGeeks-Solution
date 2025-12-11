class Solution:
    def constructArr(self, arr):
        from math import isqrt
        m = len(arr)
        if m == 0:
            return []

        disc = 1 + 8 * m
        s = isqrt(disc)
        n = (1 + s) // 2

        if n == 2:
            return [0, arr[0]]

        s01 = arr[0]
        s02 = arr[1]
        s12 = arr[n - 1]

        a1 = (s01 + s02 - s12) // 2

        original = [0] * n
        original[0] = a1
        for i in range(1, n):
            original[i] = arr[i - 1] - a1
        return original
