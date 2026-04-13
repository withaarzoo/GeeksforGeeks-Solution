class Solution:
    def nextPalindrome(self, num):
        n = len(num)

        # Case 1: If all digits are 9, answer is 100...001
        if all(x == 9 for x in num):
            return [1] + [0] * (n - 1) + [1]

        # Step 1: Check whether left side is smaller than right side
        i = (n - 1) // 2
        j = n // 2

        while i >= 0 and num[i] == num[j]:
            i -= 1
            j += 1

        leftSmaller = (i < 0 or num[i] < num[j])

        # Step 2: Mirror left half to right half
        i = (n - 1) // 2
        j = n // 2
        while i >= 0:
            num[j] = num[i]
            i -= 1
            j += 1

        # Step 3: If left side was smaller, add 1 to the middle and handle carry
        if leftSmaller:
            carry = 1
            i = (n - 1) // 2
            j = n // 2

            while i >= 0 and carry:
                val = num[i] + carry
                num[i] = val % 10
                carry = val // 10
                num[j] = num[i]
                i -= 1
                j += 1

        return num