class Solution
{
public:
    int kthMissing(vector<int> &arr, int k)
    {
        int left = 0, right = arr.size() - 1;

        // Binary search on index
        while (left <= right)
        {
            int mid = left + (right - left) / 2;

            // Count missing numbers before arr[mid]
            int missing = arr[mid] - (mid + 1);

            if (missing < k)
                left = mid + 1; // Need more missing numbers
            else
                right = mid - 1; // Too many missing numbers
        }

        // kth missing number
        return left + k;
    }
};
