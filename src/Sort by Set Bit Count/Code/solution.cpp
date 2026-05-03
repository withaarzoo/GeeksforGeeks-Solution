class Solution
{
public:
    vector<int> sortBySetBitCount(vector<int> &arr)
    {
        // I keep 32 buckets because a standard positive integer can have at most 32 set bits.
        vector<vector<int>> buckets(32);

        // I place each number into the bucket that matches its set-bit count.
        // This keeps the original order inside each bucket, so ties remain stable.
        for (int num : arr)
        {
            buckets[__builtin_popcount((unsigned int)num)].push_back(num);
        }

        // I rebuild the answer from the highest set-bit count to the lowest.
        // That gives descending order by bit count while preserving tie order.
        vector<int> ans;
        ans.reserve(arr.size());
        for (int bits = 31; bits >= 0; --bits)
        {
            for (int num : buckets[bits])
            {
                ans.push_back(num);
            }
        }

        return ans;
    }
};