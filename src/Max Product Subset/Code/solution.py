class Solution:
    def findMaxProduct(self, arr):
        MOD = 1000000007
        n = len(arr)

        # I return the only element directly so [-1] stays -1.
        if n == 1:
            return arr[0]

        zero_count = 0
        positive_count = 0
        negative_count = 0

        # I keep the smallest absolute negative value for later removal.
        min_neg_abs = 11

        product = 1

        for x in arr:
            if x == 0:
                zero_count += 1
                continue  # Zero does not help unless every other choice is worse.

            if x > 0:
                positive_count += 1
            else:
                negative_count += 1
                min_neg_abs = min(min_neg_abs, abs(x))

            # I multiply absolute values and keep the result under modulo.
            product = (product * abs(x)) % MOD

        # If all values are zero, the best product is zero.
        if zero_count == n:
            return 0

        # If there is only one negative and no positive number,
        # zero is better than a negative answer.
        if negative_count == 1 and positive_count == 0:
            return 0

        # If negatives are odd, I remove the smallest absolute negative.
        if negative_count % 2 == 1:
            inv = pow(min_neg_abs, MOD - 2, MOD)
            product = (product * inv) % MOD

        return product