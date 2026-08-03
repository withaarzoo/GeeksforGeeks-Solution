class Solution
{
public:
    int maxSumWithK(vector<int> &arr, int k)
    {
        int n = arr.size();

        // bestEndingHere[i] stores the maximum sum subarray
        // that ends exactly at index i.
        vector<int> bestEndingHere(n);

        // Base case for Kadane's algorithm.
        bestEndingHere[0] = arr[0];

        // Build Kadane array.
        for (int i = 1; i < n; i++)
        {
            // Either start fresh from arr[i]
            // or extend the previous subarray.
            bestEndingHere[i] = max(arr[i], bestEndingHere[i - 1] + arr[i]);
        }

        // Calculate the first window of size k.
        int windowSum = 0;
        for (int i = 0; i < k; i++)
        {
            windowSum += arr[i];
        }

        // First valid answer.
        int ans = windowSum;

        // Slide the window.
        for (int i = k; i < n; i++)
        {

            // Remove the left element.
            windowSum -= arr[i - k];

            // Add the new right element.
            windowSum += arr[i];

            // Window alone is a valid answer.
            ans = max(ans, windowSum);

            // Extend the window using the best subarray
            // ending just before the window starts.
            ans = max(ans, windowSum + bestEndingHere[i - k]);
        }

        return ans;
    }
};