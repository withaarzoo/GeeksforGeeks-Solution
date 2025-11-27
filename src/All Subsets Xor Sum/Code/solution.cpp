class Solution
{
public:
    int subsetXORSum(vector<int> &arr)
    {
        int n = arr.size();

        // Step 1: OR of all elements
        int allOr = 0;
        for (int x : arr)
        {
            allOr |= x; // add all bits that appear in the array
        }

        // Step 2: each present bit contributes in exactly 2^(n-1) subsets
        // Use long long to avoid overflow during multiplication
        long long multiplier = 1LL << (n - 1);
        long long ans = 1LL * allOr * multiplier;

        return (int)ans; // problem statement says it fits in 32-bit
    }
};
