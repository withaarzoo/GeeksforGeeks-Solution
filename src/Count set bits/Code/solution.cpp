class Solution
{
public:
    int countSetBits(int n)
    {
        long long total = 0; // to be safe for intermediate sums

        // iterate over bit positions: 0, 1, 2, ... while (1<<i) <= n
        for (int i = 0; (1LL << i) <= n; i++)
        {
            long long bitMask = 1LL << i;      // 2^i
            long long cycleLen = bitMask << 1; // 2^(i+1)

            // number of complete cycles of length cycleLen
            long long fullCycles = n / cycleLen;

            // in each full cycle, bit i is '1' exactly bitMask times
            total += fullCycles * bitMask;

            // handle the remaining (incomplete) part
            long long remainder = n % cycleLen;

            // extra ones after the first bitMask zeros
            long long extraOnes = remainder - bitMask + 1;
            if (extraOnes > 0)
            {
                total += extraOnes;
            }
        }

        return (int)total; // fits in int for given constraints
    }
};
