class Solution
{
public:
    int countPairs(vector<int> &arr, int k)
    {
        // Sort the array so nearby values have smaller differences
        sort(arr.begin(), arr.end());

        int n = arr.size();
        int j = 1;
        int ans = 0;

        // Try every element as the first element of a pair
        for (int i = 0; i < n; i++)
        {

            // Make sure j always stays ahead of i
            if (j <= i)
                j = i + 1;

            // Expand the window while the difference is less than k
            while (j < n && arr[j] - arr[i] < k)
                j++;

            // All elements from i+1 to j-1 make valid pairs with arr[i]
            ans += (j - i - 1);
        }

        // Return total number of valid pairs
        return ans;
    }
};