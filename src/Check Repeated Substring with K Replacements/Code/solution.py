class Solution:
    def kSubstr(self, s: str, k: int) -> bool:
        n = len(s)

        # String must be divisible into blocks of size k
        if n % k != 0:
            return False

        # Frequency of each k-length block
        freq = {}

        # Extract all blocks
        for i in range(0, n, k):
            block = s[i:i + k]
            freq[block] = freq.get(block, 0) + 1

        # Already a repeated substring
        if len(freq) == 1:
            return True

        # More than two distinct blocks cannot be fixed
        if len(freq) > 2:
            return False

        # One block must occur exactly once
        for count in freq.values():
            if count == 1:
                return True

        return False