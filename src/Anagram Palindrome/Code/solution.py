class Solution:
    def canFormPalindrome(self, s):
        # Frequency array for 26 lowercase letters
        freq = [0] * 26

        # Count frequency of each character
        for ch in s:
            freq[ord(ch) - ord('a')] += 1

        # Count how many characters have odd frequency
        odd_count = 0

        for count in freq:
            if count % 2 != 0:
                odd_count += 1

            # More than one odd frequency means palindrome is not possible
            if odd_count > 1:
                return False

        return True