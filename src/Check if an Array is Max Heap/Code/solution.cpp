class Solution
{
public:
    bool isMaxHeap(vector<int> &arr)
    {
        int n = arr.size(); // total number of elements

        // Only need to check non-leaf nodes (0 to n/2 - 1)
        for (int i = 0; i <= (n / 2) - 1; i++)
        {

            int left = 2 * i + 1;  // left child index
            int right = 2 * i + 2; // right child index

            // Check left child
            if (left < n && arr[i] < arr[left])
            {
                return false; // violates max heap property
            }

            // Check right child
            if (right < n && arr[i] < arr[right])
            {
                return false; // violates max heap property
            }
        }

        return true; // all checks passed
    }
};