class Solution:
    def distinctSubseq(self, s: str) -> int:
        MOD = 10**9 + 7
        n = len(s)
        
        # dp[i] = number of distinct subsequences of prefix s[0..i-1]
        dp = [0] * (n + 1)
        dp[0] = 1  # empty subsequence
        
        # last[pos] = last index (1..n) where character 'a'+pos appeared
        last = [0] * 26
        
        for i in range(1, n + 1):
            ch_index = ord(s[i - 1]) - ord('a')
            
            # Double the number of subsequences
            val = (2 * dp[i - 1]) % MOD
            
            # If character repeated, subtract old contribution
            if last[ch_index] != 0:
                prev_pos = last[ch_index]
                val = (val - dp[prev_pos - 1] + MOD) % MOD
            
            dp[i] = val
            last[ch_index] = i  # update last occurrence
        
        return dp[n] % MOD
