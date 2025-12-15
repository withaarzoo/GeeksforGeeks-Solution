class Solution
{
public:
    int cntWays(vector<int> &arr)
    {
        int n = arr.size();

        int totalEven = 0, totalOdd = 0;

        // Step 1: calculate total even and odd index sums
        for (int i = 0; i < n; i++)
        {
            if (i % 2 == 0)
                totalEven += arr[i];
            else
                totalOdd += arr[i];
        }

        int leftEven = 0, leftOdd = 0;
        int count = 0;

        // Step 2: try removing each index
        for (int i = 0; i < n; i++)
        {
            // Remove current element from total
            if (i % 2 == 0)
                totalEven -= arr[i];
            else
                totalOdd -= arr[i];

            // After removal, right side indices shift
            int newEvenSum = leftEven + totalOdd;
            int newOddSum = leftOdd + totalEven;

            if (newEvenSum == newOddSum)
            {
                count++;
            }

            // Add current element to left sums
            if (i % 2 == 0)
                leftEven += arr[i];
            else
                leftOdd += arr[i];
        }

        return count;
    }
};
