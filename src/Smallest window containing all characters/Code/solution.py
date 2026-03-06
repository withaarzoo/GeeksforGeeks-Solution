class Solution:
    def minWindow(self, s, p):

        freqP = [0]*256
        window = [0]*256

        for c in p:
            freqP[ord(c)] += 1

        left = 0
        right = 0
        count = 0
        minLen = float('inf')
        start = 0

        while right < len(s):

            c = ord(s[right])
            window[c] += 1

            if freqP[c] != 0 and window[c] <= freqP[c]:
                count += 1

            while count == len(p):

                if right - left + 1 < minLen:
                    minLen = right - left + 1
                    start = left

                leftChar = ord(s[left])
                window[leftChar] -= 1

                if freqP[leftChar] != 0 and window[leftChar] < freqP[leftChar]:
                    count -= 1

                left += 1

            right += 1

        if minLen == float('inf'):
            return ""

        return s[start:start+minLen]