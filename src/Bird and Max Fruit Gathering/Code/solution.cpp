class Solution {
  public:
    int maxFruits(vector<int>& arr, int m) {
        int n = arr.size();                 // Store the number of trees.
        int k = min(m, n);                  // We cannot use more than n trees.

        long long windowSum = 0;            // Store the sum of the current window.
        
        // Build the first window containing k consecutive trees.
        for (int i = 0; i < k; i++) {
            windowSum += arr[i];            // Add each fruit value to the window.
        }

        long long ans = windowSum;          // The first window is our initial maximum.

        // Move the window to every other starting position on the circle.
        for (int start = 1; start < n; start++) {
            int removed = start - 1;        // This tree leaves the current window.
            
            // This calculates the new tree entering the window.
            // Modulo makes the index wrap around to the beginning.
            int added = (start + k - 1) % n;

            windowSum -= arr[removed];      // Remove the old first tree.
            windowSum += arr[added];        // Add the new last tree.

            ans = max(ans, windowSum);      // Keep the best window found so far.
        }

        return (int)ans;                    // Return the maximum fruit value.
    }
};