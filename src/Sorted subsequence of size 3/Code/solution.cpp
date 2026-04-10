class Solution
{
public:
    vector<int> find3Numbers(vector<int> &arr)
    {
        int n = arr.size();

        // If array size is less than 3, triplet is not possible
        if (n < 3)
            return {};

        // rightMax[i] stores maximum value from i to n-1
        vector<int> rightMax(n);
        rightMax[n - 1] = arr[n - 1];

        // Fill rightMax array from right to left
        for (int i = n - 2; i >= 0; i--)
        {
            rightMax[i] = max(arr[i], rightMax[i + 1]);
        }

        // leftMin stores the smallest element seen so far
        int leftMin = arr[0];

        // Check each element as middle element
        for (int i = 1; i < n - 1; i++)
        {

            // If valid triplet found
            if (leftMin < arr[i] && arr[i] < rightMax[i + 1])
            {
                return {leftMin, arr[i], rightMax[i + 1]};
            }

            // Update leftMin
            leftMin = min(leftMin, arr[i]);
        }

        return {};
    }
};