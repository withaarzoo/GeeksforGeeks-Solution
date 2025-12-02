class Solution:
    def maxScore(self, s, jumps):
        n = len(s)
        if n <= 1:
            return 0

        # 1. Prefix sum of ASCII values
        pref = [0] * (n + 1)
        for i, ch in enumerate(s):
            pref[i + 1] = pref[i] + ord(ch)

        ALPHA = 26

        # 2. nextInd[i][c] = next index > i where char ('a'+c) occurs
        nextInd = [[-1] * ALPHA for _ in range(n)]
        last = [-1] * ALPHA

        for i in range(n - 1, -1, -1):
            # copy last into nextInd[i]
            row = nextInd[i]
            for c in range(ALPHA):
                row[c] = last[c]
            idx = ord(s[i]) - ord('a')
            last[idx] = i

        # 3. Build adjacency list by characters
        adj = [[] for _ in range(ALPHA)]
        if jumps:
            for u, v in jumps:
                ui = ord(u) - ord('a')
                vi = ord(v) - ord('a')
                if 0 <= ui < ALPHA and 0 <= vi < ALPHA:
                    adj[ui].append(vi)

        # add self-jumps and dedupe
        for c in range(ALPHA):
            adj[c].append(c)
            # remove duplicates (tiny cost)
            adj[c] = list(set(adj[c]))

        # 4. DP from right to left
        dp = [0] * n
        dp[n - 1] = 0

        for i in range(n - 2, -1, -1):
            best = 0
            from_idx = ord(s[i]) - ord('a')
            from_ascii = ord(s[i])

            for dest_char in adj[from_idx]:
                j = nextInd[i][dest_char]
                if j == -1:
                    continue

                gain = pref[j] - pref[i]   # sum s[i..j-1]
                if dest_char == from_idx:
                    gain -= from_ascii     # exclude s[i] if same char as destination

                cand = gain + dp[j]
                if cand > best:
                    best = cand

            dp[i] = best

        return dp[0]
