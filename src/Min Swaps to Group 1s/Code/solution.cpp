class Solution
{
public:
    int minSwaps(vector<int> &arr)
    {
        int n = arr.size();

        // Step 1: Count total number of 1s
        int k = 0;
        for (int x : arr)
        {
            if (x == 1)
                k++;
        }

        // If no 1s present
        if (k == 0)
            return -1;

        // Step 2: Sliding window of size k
        int ones = 0;

        // Count 1s in first window
        for (int i = 0; i < k; i++)
        {
            if (arr[i] == 1)
                ones++;
        }

        int maxOnes = ones;

        // Slide the window
        for (int i = k; i < n; i++)
        {
            if (arr[i] == 1)
                ones++; // include new element
            if (arr[i - k] == 1)
                ones--; // remove old element

            maxOnes = max(maxOnes, ones);
        }

        // Minimum swaps = zeros in best window
        return k - maxOnes;
    }
};