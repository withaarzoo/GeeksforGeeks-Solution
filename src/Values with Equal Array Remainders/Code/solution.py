class Solution:
    def gcd(self, a, b):
        # I use Euclid's algorithm to calculate the GCD.
        while b != 0:
            # The remainder becomes the next value of b.
            a, b = b, a % b

        # When b becomes 0, a is the GCD.
        return a

    def sameMod(self, arr):
        # I start with 0 because gcd(0, x) is x.
        g = 0

        # I compare every element with the first element.
        for i in range(1, len(arr)):
            # I calculate the absolute difference because only divisibility matters.
            diff = abs(arr[i] - arr[0])

            # I update the GCD using the current difference.
            g = self.gcd(g, diff)

        # If g is 0, all elements are equal.
        # Every positive k then produces the same remainder.
        if g == 0:
            return -1

        # I will count the positive divisors of g.
        ans = 0

        # I only check up to sqrt(g) because divisors occur in pairs.
        i = 1
        while i * i <= g:
            # If i divides g, then i and g/i are both divisors.
            if g % i == 0:
                # I count i.
                ans += 1

                # I count g/i separately if it is a different divisor.
                if i != g // i:
                    ans += 1

            # I move to the next possible divisor.
            i += 1

        # I return the total number of valid k values.
        return ans