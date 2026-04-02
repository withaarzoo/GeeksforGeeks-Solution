class Solution
{
public:
    int countWays(int n, int k)
    {
        // If there is only one post
        if (n == 1)
            return k;

        // same = ways where last two posts have same color
        long long same = k;

        // diff = ways where last two posts have different colors
        long long diff = 1LL * k * (k - 1);

        // Process from 3rd post to nth post
        for (int i = 3; i <= n; i++)
        {
            long long newSame = diff;
            long long newDiff = (same + diff) * (k - 1);

            same = newSame;
            diff = newDiff;
        }

        return same + diff;
    }
};