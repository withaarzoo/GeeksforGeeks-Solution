class Solution
{
public:
    int maxProduct(vector<int> &arr)
    {
        int n = arr.size();

        // max product ending at current index
        int maxEnding = arr[0];

        // min product ending at current index
        int minEnding = arr[0];

        // overall maximum product
        int result = arr[0];

        for (int i = 1; i < n; i++)
        {
            // If current element is negative, swap
            if (arr[i] < 0)
            {
                swap(maxEnding, minEnding);
            }

            // Update max and min product ending here
            maxEnding = max(arr[i], maxEnding * arr[i]);
            minEnding = min(arr[i], minEnding * arr[i]);

            // Update result
            result = max(result, maxEnding);
        }

        return result;
    }
};
