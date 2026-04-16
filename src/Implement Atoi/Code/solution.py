class Solution:
    def myAtoi(self, s):
        n = len(s)
        i = 0

        # Skip leading spaces
        while i < n and s[i] == ' ':
            i += 1

        # Check sign
        sign = 1
        if i < n and (s[i] == '+' or s[i] == '-'):
            if s[i] == '-':
                sign = -1
            i += 1

        num = 0
        INT_MAX_VAL = 2147483647
        INT_MIN_VAL = -2147483648

        # Read digits
        while i < n and s[i].isdigit():
            digit = ord(s[i]) - ord('0')

            # Check overflow before adding digit
            if num > (INT_MAX_VAL - digit) // 10:
                return INT_MAX_VAL if sign == 1 else INT_MIN_VAL

            num = num * 10 + digit
            i += 1

        return sign * num