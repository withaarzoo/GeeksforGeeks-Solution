class Solution
{
public:
    int findKRotation(vector<int> &arr)
    {
        int low = 0, high = arr.size() - 1;

        // Binary search to find the index of minimum element
        while (low < high)
        {
            int mid = low + (high - low) / 2;

            // If mid element is greater than last element,
            // minimum lies in right half
            if (arr[mid] > arr[high])
            {
                low = mid + 1;
            }
            // Otherwise minimum lies in left half (including mid)
            else
            {
                high = mid;
            }
        }

        // low points to the smallest element
        return low;
    }
};
