class Solution:
    def transform(self, s1, s2): 
        # Moving a character does not change string length,
        # so strings with different lengths cannot be transformed.
        if len(s1) != len(s2):
            return -1

        # Store the common length for easier pointer handling.
        n = len(s1)

        # Use a fixed-size frequency array so extra space stays O(1).
        freq = [0] * 256

        # Add frequencies from s1 and subtract frequencies from s2.
        # Equal character counts will make every value zero.
        for i in range(n):
            freq[ord(s1[i])] += 1
            freq[ord(s2[i])] -= 1

        # Check whether both strings contain exactly the same characters.
        for count in freq:
            if count != 0:
                return -1

        # Start from the end because unchanged characters preserve their order
        # and form the suffix of the final string.
        i = n - 1
        j = n - 1
        operations = 0

        # Match characters of s2 from right to left.
        while i >= 0 and j >= 0:
            # If both characters match, this character can stay untouched.
            if s1[i] == s2[j]:
                i -= 1
                j -= 1
            else:
                # Otherwise, this character from s1 must be moved to the front.
                operations += 1
                i -= 1

        # Return the minimum number of required operations.
        return operations