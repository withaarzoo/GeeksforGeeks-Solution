class Solution:
    def josephus(self, n, k):
        ans = 0  # 0-based index

        for i in range(2, n + 1):
            ans = (ans + k) % i

        # Convert to 1-based index
        return ans + 1
