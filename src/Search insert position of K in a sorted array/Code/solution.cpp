class Solution
{
public:
    int searchInsertK(vector<int> &arr, int k)
    {
        int low = 0, high = arr.size() - 1;

        while (low <= high)
        {
            int mid = low + (high - low) / 2;

            // If k is found, return its index
            if (arr[mid] == k)
            {
                return mid;
            }
            // If k is greater, search in right half
            else if (arr[mid] < k)
            {
                low = mid + 1;
            }
            // If k is smaller, search in left half
            else
            {
                high = mid - 1;
            }
        }

        // low is the correct insert position
        return low;
    }
};
