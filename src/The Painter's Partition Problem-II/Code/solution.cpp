class Solution
{
public:
    // Helper function to check if we can paint within 'maxTime'
    bool isPossible(vector<int> &arr, int k, long long maxTime)
    {
        long long currentSum = 0;
        int painters = 1; // Start with first painter

        for (int i = 0; i < arr.size(); i++)
        {
            // If a single board is bigger than maxTime, not possible
            if (arr[i] > maxTime)
                return false;

            if (currentSum + arr[i] <= maxTime)
            {
                currentSum += arr[i];
            }
            else
            {
                // Assign new painter
                painters++;
                currentSum = arr[i];
            }
        }

        return painters <= k;
    }

    int minTime(vector<int> &arr, int k)
    {

        long long low = 0, high = 0;

        // Find max element and total sum
        for (int x : arr)
        {
            low = max(low, (long long)x);
            high += x;
        }

        long long ans = high;

        while (low <= high)
        {
            long long mid = low + (high - low) / 2;

            if (isPossible(arr, k, mid))
            {
                ans = mid;
                high = mid - 1; // try smaller time
            }
            else
            {
                low = mid + 1; // increase time
            }
        }

        return (int)ans;
    }
};
