class Solution
{
public:
    long long sumXOR(vector<int> &arr)
    {
        int n = arr.size();   // total number of elements
        long long result = 0; // final answer

        // Iterate over all 32 bits (for integers up to 10^5)
        for (int bit = 0; bit < 32; bit++)
        {
            long long count1 = 0; // count of numbers having this bit set

            // Count how many numbers have current bit = 1
            for (int i = 0; i < n; i++)
            {
                if (arr[i] & (1 << bit))
                {
                    count1++;
                }
            }

            long long count0 = n - count1; // remaining numbers have bit = 0

            // Each pair (1,0) contributes 2^bit
            result += count1 * count0 * (1LL << bit);
        }

        return result;
    }
};