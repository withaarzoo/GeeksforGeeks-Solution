class Solution:
    def pairAndSum(self, arr):
        # I store the final answer in an integer, which supports
        # arbitrarily large values in Python.
        ans = 0

        # I process every bit independently.
        # 31 bits are enough for the given constraint.
        for bit in range(31):
            # I count how many numbers have the current bit set.
            count = 0

            # I check the current bit in every array element.
            for x in arr:
                # If this bit is set, this number can participate
                # in a pair contributing this bit to the AND.
                if x & (1 << bit):
                    count += 1

            # I choose any two numbers among the numbers
            # that contain this bit.
            pairs = count * (count - 1) // 2

            # Each such pair contributes 2^bit to the answer.
            ans += pairs * (1 << bit)

        # I return the complete sum.
        return ans