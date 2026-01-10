class Solution:
    def atMostK(self, s, k):
        if k < 0:
            return 0

        freq = [0] * 26
        left = distinct = count = 0

        for right in range(len(s)):
            idx = ord(s[right]) - ord('a')
            if freq[idx] == 0:
                distinct += 1
            freq[idx] += 1

            while distinct > k:
                lidx = ord(s[left]) - ord('a')
                freq[lidx] -= 1
                if freq[lidx] == 0:
                    distinct -= 1
                left += 1

            count += (right - left + 1)

        return count

    def countSubstr(self, s, k):
        return self.atMostK(s, k) - self.atMostK(s, k - 1)
