class Solution {
  public:
    int maxSumSubarray(vector<int>& arr) {
        // keep stores the maximum subarray sum ending here without deletion
        int keep = arr[0];

        // remove stores the maximum subarray sum ending here after one deletion
        int remove = 0;

        // Final answer
        int ans = arr[0];

        // Traverse the remaining elements
        for (int i = 1; i < arr.size(); i++) {

            // Either delete current element or extend previous deleted subarray
            remove = max(keep, remove + arr[i]);

            // Standard Kadane update
            keep = max(arr[i], keep + arr[i]);

            // Update the overall answer
            ans = max(ans, max(keep, remove));
        }

        return ans;
    }
};