class Solution
{
public:
    int sumDiffPairs(vector<int> &arr, int k)
    {
        // Sort the array so nearby elements have minimum differences
        sort(arr.begin(), arr.end());

        int ans = 0;
        int n = arr.size();

        // Start from the largest element
        int i = n - 1;

        while (i > 0)
        {

            // If adjacent elements form a valid pair
            if (arr[i] - arr[i - 1] < k)
            {

                // Add both elements to answer
                ans += arr[i] + arr[i - 1];

                // Skip both because pairs must be disjoint
                i -= 2;
            }
            else
            {

                // Current element cannot be paired optimally
                i--;
            }
        }

        return ans;
    }
};