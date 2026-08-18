class Solution:
    def compress(self, s):
        n = len(s)  # Store the length of the string.

        pi = [0] * n  # pi[i] stores the longest prefix that is also a suffix for s[0:i+1].

        # Build the KMP prefix-function array in O(n).
        for i in range(1, n):
            j = pi[i - 1]  # Start with the previous longest matching prefix.

            # Fall back through KMP links while the characters are different.
            while j > 0 and s[i] != s[j]:
                j = pi[j - 1]  # Try the next smaller possible prefix.

            # Extend the matching prefix when the characters are equal.
            if s[i] == s[j]:
                j += 1

            pi[i] = j  # Store the longest prefix-suffix length.

        ans = []  # Store characters and '*' while scanning backwards.

        i = n - 1  # Start from the last character.

        # Process the string from right to left.
        while i >= 0:
            length = i + 1  # Length of the current prefix.

            # A compressible repeated prefix must have even length.
            if length % 2 == 0:
                period = length - pi[i]  # Smallest repeating period from KMP.

                # Check whether the prefix can be replaced by '*'.
                if (pi[i] >= length // 2 and
                        length % (2 * period) == 0):

                    ans.append('*')  # Replace the repeated part with '*'.

                    # Only the first half still needs to be processed.
                    i = length // 2 - 1

                    continue  # Continue with the remaining prefix.

            ans.append(s[i])  # Keep the current character if compression is impossible.
            i -= 1  # Move one position to the left.

        ans.reverse()  # We built the result from right to left.

        return ''.join(ans)  # Convert the list into the final encrypted string.