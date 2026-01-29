from collections import deque

class Solution:
    def firstNonRepeating(self, s):
        freq = [0] * 26
        q = deque()
        result = ""

        for ch in s:
            freq[ord(ch) - ord('a')] += 1
            q.append(ch)

            while q and freq[ord(q[0]) - ord('a')] > 1:
                q.popleft()

            if not q:
                result += '#'
            else:
                result += q[0]

        return result
