class Solution
{
public:
    int subarrayXor(vector<int> &arr)
    {
        int n = (int)arr.size();

        // If length is even, every element appears even number of times
        // in all subarrays, so final XOR is 0.
        if (n % 2 == 0)
            return 0;

        int ans = 0;
        // For odd n, only elements at even indices (0, 2, 4, ...)
        // have odd frequency across all subarrays.
        for (int i = 0; i < n; i += 2)
        {
            ans ^= arr[i];
        }
        return ans;
    }
};
