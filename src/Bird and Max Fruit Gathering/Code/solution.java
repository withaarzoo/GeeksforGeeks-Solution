class Solution {
    public int maxFruits(ArrayList<Integer> arr, int m) {
        int n = arr.size(); // Store the number of trees.
        int k = Math.min(m, n); // We cannot use more than n trees.

        long windowSum = 0; // Store the sum of the current window.

        // Build the first window containing k consecutive trees.
        for (int i = 0; i < k; i++) {
            windowSum += arr.get(i); // Add the fruit value to the window.
        }

        long ans = windowSum; // The first window is our initial maximum.

        // Move the window to every other starting position on the circle.
        for (int start = 1; start < n; start++) {
            int removed = start - 1; // This tree leaves the current window.

            // Modulo wraps the index back to the first tree when needed.
            int added = (start + k - 1) % n;

            windowSum -= arr.get(removed); // Remove the old first tree.
            windowSum += arr.get(added); // Add the new last tree.

            ans = Math.max(ans, windowSum); // Keep the best window found so far.
        }

        return (int) ans; // Return the maximum fruit value.
    }
}