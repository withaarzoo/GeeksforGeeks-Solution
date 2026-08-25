class Solution {
    public int minMoves(int[] arr) {
        int n = arr.length; // Store the total number of elements in the permutation.

        int[] pos = new int[n + 1]; // pos[value] stores the index where that value appears.

        for (int i = 0; i < n; i++) {
            pos[arr[i]] = i; // Record each value's position for O(1) position comparison.
        }

        int current = 1; // A single value always forms a valid sequence of length 1.
        int longest = 1; // Store the longest valid consecutive sequence.

        for (int value = 1; value < n; value++) {
            // Check whether consecutive values already appear in increasing index order.
            if (pos[value] < pos[value + 1]) {
                current++; // Extend the sequence because their relative order is already correct.
            } else {
                current = 1; // Reset because this pair breaks the required order.
            }

            longest = Math.max(longest, current); // Update the maximum sequence length.
        }

        return n - longest; // All elements outside the longest sequence need to be moved.
    }
}