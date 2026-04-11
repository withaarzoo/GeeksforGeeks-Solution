class Solution
{
public:
    int countIncreasing(vector<int> &arr)
    {
        int n = arr.size();

        // Stores the final answer
        int ans = 0;

        // Length of current increasing segment
        int len = 1;

        for (int i = 1; i < n; i++)
        {

            // If current element is greater than previous,
            // then increasing segment continues
            if (arr[i] > arr[i - 1])
            {
                len++;

                // New increasing subarrays ending at i
                ans += (len - 1);
            }
            else
            {
                // Reset length if sequence breaks
                len = 1;
            }
        }

        return ans;
    }
};