class Solution:
    def subsetXOR(self, n: int):
        # XOR of 1..n using pattern based on n % 4
        if n % 4 == 0:
            T = n
        elif n % 4 == 1:
            T = 1
        elif n % 4 == 2:
            T = n + 1
        else:  # n % 4 == 3
            T = 0

        ans = []

        if T == n:
            # Case 1: take all numbers 1..n
            ans = list(range(1, n + 1))
        else:
            # Case 2: remove exactly one element x = T ^ n
            x = T ^ n
            for i in range(1, n + 1):
                if i == x:
                    continue  # skip x
                ans.append(i)

        return ans
