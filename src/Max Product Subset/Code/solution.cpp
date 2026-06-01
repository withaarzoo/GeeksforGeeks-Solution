class Solution
{
    static const long long MOD = 1000000007LL;

    // I use fast power to find modular inverse under MOD.
    long long modPow(long long base, long long exp)
    {
        long long result = 1;
        base %= MOD;

        while (exp > 0)
        {
            if (exp & 1)
            {
                result = (result * base) % MOD;
            }
            base = (base * base) % MOD;
            exp >>= 1;
        }
        return result;
    }

public:
    int findMaxProduct(vector<int> &arr)
    {
        int n = (int)arr.size();

        // If there is only one number, I return it directly.
        // This keeps the answer correct for cases like [-1].
        if (n == 1)
        {
            return arr[0];
        }

        int zeroCount = 0;
        int positiveCount = 0;
        int negativeCount = 0;

        // I store the smallest absolute value among negative numbers.
        // If negatives are odd, this is the one I remove.
        int minNegAbs = 11;

        long long product = 1;

        for (int x : arr)
        {
            if (x == 0)
            {
                zeroCount++;
                continue; // Zero does not help the product unless everything is bad.
            }

            if (x > 0)
            {
                positiveCount++;
            }
            else
            {
                negativeCount++;
                minNegAbs = min(minNegAbs, abs(x));
            }

            // I multiply absolute values so the product stays non-negative here.
            product = (product * (long long)abs(x)) % MOD;
        }

        // If all elements are zero, the best product is zero.
        if (zeroCount == n)
        {
            return 0;
        }

        // If there is exactly one negative and everything else is zero,
        // zero is better than a negative product.
        if (negativeCount == 1 && positiveCount == 0)
        {
            return 0;
        }

        // If the number of negatives is odd, I remove the smallest absolute negative.
        if (negativeCount % 2 == 1)
        {
            long long inv = modPow(minNegAbs, MOD - 2);
            product = (product * inv) % MOD;
        }

        return (int)product;
    }
};