class Solution {
    public int searchInsertK(int arr[], int k) {
        int low = 0, high = arr.length - 1;

        while (low <= high) {
            int mid = low + (high - low) / 2;

            // If k is found
            if (arr[mid] == k) {
                return mid;
            }
            // Search right side
            else if (arr[mid] < k) {
                low = mid + 1;
            }
            // Search left side
            else {
                high = mid - 1;
            }
        }

        // Insert position
        return low;
    }
}
