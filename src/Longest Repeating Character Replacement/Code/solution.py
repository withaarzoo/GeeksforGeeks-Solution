class Solution:
    def longestSubstr(self, s, k):
        freq = [0] * 26
        left = 0
        maxFreq = 0
        maxLen = 0

        for right in range(len(s)):
            freq[ord(s[right]) - ord('A')] += 1

            maxFreq = max(maxFreq, freq[ord(s[right]) - ord('A')])

            while (right - left + 1) - maxFreq > k:
                freq[ord(s[left]) - ord('A')] -= 1
                left += 1

            maxLen = max(maxLen, right - left + 1)

        return maxLen