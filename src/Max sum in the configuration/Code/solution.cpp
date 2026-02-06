class Solution
{
public:
    int maxSum(vector<int> &arr)
    {
        int n = arr.size();

        int arrSum = 0;  // Sum of all elements
        int currVal = 0; // Value of i * arr[i] for current rotation

        // Step 1: Calculate arrSum and currVal for original array
        for (int i = 0; i < n; i++)
        {
            arrSum += arr[i];
            currVal += i * arr[i];
        }

        int maxVal = currVal;

        // Step 2: Calculate value for all rotations
        for (int i = 1; i < n; i++)
        {
            currVal = currVal + arrSum - n * arr[n - i];
            maxVal = max(maxVal, currVal);
        }

        return maxVal;
    }
};
