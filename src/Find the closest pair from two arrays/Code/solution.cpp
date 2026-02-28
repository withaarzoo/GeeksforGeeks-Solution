class Solution
{
public:
    vector<int> findClosestPair(vector<int> &arr1, vector<int> &arr2, int x)
    {
        int n = arr1.size();
        int m = arr2.size();

        int i = 0;     // pointer for arr1 (start)
        int j = m - 1; // pointer for arr2 (end)

        int minDiff = INT_MAX;
        int bestA = 0, bestB = 0;

        while (i < n && j >= 0)
        {
            int sum = arr1[i] + arr2[j];
            int diff = abs(sum - x);

            // Update best pair if this is closer
            if (diff < minDiff)
            {
                minDiff = diff;
                bestA = arr1[i];
                bestB = arr2[j];
            }

            // Move pointers
            if (sum > x)
            {
                j--; // decrease sum
            }
            else
            {
                i++; // increase sum
            }
        }

        return {bestA, bestB};
    }
};