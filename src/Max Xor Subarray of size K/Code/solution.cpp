class Solution
{
public:
    int maxSubarrayXOR(vector<int> &arr, int k)
    {
        int n = arr.size();

        // Step 1: compute XOR of first window
        int currXor = 0;
        for (int i = 0; i < k; i++)
        {
            currXor ^= arr[i];
        }

        int maxXor = currXor;

        // Step 2: slide the window
        for (int i = k; i < n; i++)
        {
            // remove element leaving the window
            currXor ^= arr[i - k];

            // add new element entering the window
            currXor ^= arr[i];

            // update maximum
            maxXor = max(maxXor, currXor);
        }

        return maxXor;
    }
};