class Solution:
    def areRotations(self, s1, s2):
        # Step 1: Length check
        if len(s1) != len(s2):
            return False

        # Step 2: Concatenate s1 with itself
        temp = s1 + s1

        # Step 3: Check substring
        return s2 in temp
