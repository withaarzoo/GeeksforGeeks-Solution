class Solution:
    def _is_square(self, x: int) -> bool:
        r = int(x ** 0.5)
        return r * r == x

    def minSquares(self, n: int) -> int:
        # 1) Perfect square?
        if self._is_square(n):
            return 1

        # 2) Sum of two squares?
        a = 1
        while a * a <= n:
            if self._is_square(n - a * a):
                return 2
            a += 1

        # 3) Remove factors of 4 and check 7 mod 8
        m = n
        while m % 4 == 0:
            m //= 4
        if m % 8 == 7:
            return 4

        # 4) Otherwise it's 3
        return 3
