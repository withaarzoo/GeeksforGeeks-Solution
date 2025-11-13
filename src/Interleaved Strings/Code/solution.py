class Solution:
    def isInterleave(self, s1, s2, s3):
        n, m = len(s1), len(s2)
        if n + m != len(s3):
            return False

        # Ensure s2 is the shorter string to reduce space usage
        if m > n:
            s1, s2 = s2, s1
            n, m = m, n

        dp = [False] * (m + 1)
        dp[0] = True

        # initialize using only s2
        for j in range(1, m + 1):
            dp[j] = dp[j - 1] and (s2[j - 1] == s3[j - 1])

        for i in range(1, n + 1):
            # update dp[0] using only s1
            dp[0] = dp[0] and (s1[i - 1] == s3[i - 1])
            for j in range(1, m + 1):
                takeFromS1 = dp[j] and (s1[i - 1] == s3[i + j - 1])
                takeFromS2 = dp[j - 1] and (s2[j - 1] == s3[i + j - 1])
                dp[j] = takeFromS1 or takeFromS2

        return dp[m]
