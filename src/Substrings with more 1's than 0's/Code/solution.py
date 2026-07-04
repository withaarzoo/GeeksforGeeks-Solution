class Solution:
    def countSubstring(self, s):
        n = len(s)

        # Prefix sums can range from -n to n.
        # The offset changes negative sums into valid array indices.
        offset = n
        freq = [0] * (2 * n + 1)

        # The empty prefix has sum 0 and appears once.
        freq[offset] = 1

        prefix = 0

        # This stores how many previous prefix sums
        # are smaller than the current prefix sum.
        smaller = 0

        # This stores the total number of valid substrings.
        answer = 0

        for ch in s:
            if ch == '1':
                # The prefix moves from prefix to prefix + 1.
                # Old equal values now become smaller.
                smaller += freq[prefix + offset]

                # A '1' contributes +1.
                prefix += 1
            else:
                # The new prefix will be prefix - 1.
                # Values equal to it are no longer smaller.
                smaller -= freq[prefix - 1 + offset]

                # A '0' contributes -1.
                prefix -= 1

            # Every smaller previous prefix creates a valid substring.
            answer += smaller

            # Store this prefix sum for future positions.
            freq[prefix + offset] += 1

        return answer