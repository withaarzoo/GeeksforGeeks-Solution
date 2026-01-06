class Solution
{
public:
    int maxSubarrayXOR(vector<int> &arr, int k)
    {
        int n = arr.size();

        // XOR of first window
        int currXor = 0;
        for (int i = 0; i < k; i++)
        {
            currXor ^= arr[i];
        }

        int maxXor = currXor;

        // Slide the window
        for (int i = k; i < n; i++)
        {
            // Remove the left element
            currXor ^= arr[i - k];

            // Add the new right element
            currXor ^= arr[i];

            maxXor = max(maxXor, currXor);
        }

        return maxXor;
    }
};
