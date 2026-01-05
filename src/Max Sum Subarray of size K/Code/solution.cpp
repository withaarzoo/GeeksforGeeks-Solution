class Solution
{
public:
    int maxSubarraySum(vector<int> &arr, int k)
    {
        int n = arr.size();

        // Step 1: Calculate sum of first window of size k
        int windowSum = 0;
        for (int i = 0; i < k; i++)
        {
            windowSum += arr[i];
        }

        // Store the maximum sum found so far
        int maxSum = windowSum;

        // Step 2: Slide the window
        for (int i = k; i < n; i++)
        {
            windowSum += arr[i];     // add next element
            windowSum -= arr[i - k]; // remove element leaving window
            maxSum = max(maxSum, windowSum);
        }

        return maxSum;
    }
};
