class Solution:

    # Recursive helper function
    def solve(self, last_digit, length, n, num, ans):

        # Required length reached
        if length == n:
            ans.append(num)
            return

        # Choose every larger digit
        for digit in range(last_digit + 1, 10):
            # Append the digit and continue recursion
            self.solve(digit, length + 1, n, num * 10 + digit, ans)

    def increasingNumbers(self, n):

        ans = []

        # More than 10 unique digits are impossible
        if n > 10:
            return ans

        # Every single digit is valid
        if n == 1:
            return [i for i in range(10)]

        # Start recursion with first digit from 1 to 9
        for digit in range(1, 10):
            self.solve(digit, 1, n, digit, ans)

        return ans