class Solution {
    public int findKRotation(int arr[]) {
        int low = 0, high = arr.length - 1;

        // Binary search for minimum element
        while (low < high) {
            int mid = low + (high - low) / 2;

            // Minimum is in right half
            if (arr[mid] > arr[high]) {
                low = mid + 1;
            }
            // Minimum is in left half or at mid
            else {
                high = mid;
            }
        }

        // Index of smallest element = rotation count
        return low;
    }
}
