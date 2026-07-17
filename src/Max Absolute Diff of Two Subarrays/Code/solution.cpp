class Solution
{
public:
    int maxDiffSubArrays(vector<int> &arr)
    {
        int n = arr.size();

        // These arrays store the best values seen so far.
        vector<int> leftMax(n), leftMin(n), rightMax(n), rightMin(n);

        // Current maximum subarray ending at current index.
        int curr = arr[0];
        leftMax[0] = arr[0];

        // Kadane for maximum subarray from left.
        for (int i = 1; i < n; i++)
        {
            // Either extend the previous subarray or start a new one.
            curr = max(arr[i], curr + arr[i]);

            // Store the best maximum sum till this index.
            leftMax[i] = max(leftMax[i - 1], curr);
        }

        // Current minimum subarray ending at current index.
        curr = arr[0];
        leftMin[0] = arr[0];

        // Kadane for minimum subarray from left.
        for (int i = 1; i < n; i++)
        {
            // Either extend or start a new minimum subarray.
            curr = min(arr[i], curr + arr[i]);

            // Store the smallest sum till this index.
            leftMin[i] = min(leftMin[i - 1], curr);
        }

        // Current maximum subarray starting from current index.
        curr = arr[n - 1];
        rightMax[n - 1] = arr[n - 1];

        // Kadane from right for maximum subarray.
        for (int i = n - 2; i >= 0; i--)
        {
            curr = max(arr[i], curr + arr[i]);
            rightMax[i] = max(rightMax[i + 1], curr);
        }

        // Current minimum subarray starting from current index.
        curr = arr[n - 1];
        rightMin[n - 1] = arr[n - 1];

        // Kadane from right for minimum subarray.
        for (int i = n - 2; i >= 0; i--)
        {
            curr = min(arr[i], curr + arr[i]);
            rightMin[i] = min(rightMin[i + 1], curr);
        }

        int ans = 0;

        // Try every possible split.
        for (int i = 0; i < n - 1; i++)
        {
            // Left maximum with right minimum.
            ans = max(ans, abs(leftMax[i] - rightMin[i + 1]));

            // Left minimum with right maximum.
            ans = max(ans, abs(leftMin[i] - rightMax[i + 1]));
        }

        return ans;
    }
};