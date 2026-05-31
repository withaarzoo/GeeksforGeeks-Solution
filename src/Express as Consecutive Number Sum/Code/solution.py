class Solution:
    def isSumOfConsecutive(self, n: int) -> bool:
        # If n is a power of 2, it cannot be written
        # as a sum of two or more consecutive positives
        if (n & (n - 1)) == 0:
            return False

        # Otherwise it can be represented
        return True