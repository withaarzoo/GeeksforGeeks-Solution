class Solution {
    public int minCount(int[] arr) {
        int n = arr.length; // Store the number of elements in the array.
        final int NEG = -1000000000; // Represents an unreachable DP state.

        // prev[i][j] stores the maximum number of used elements after
        // the previous prefix, with i and j as the last indices of
        // the increasing and decreasing subsequences.
        int[][] prev = new int[n + 1][n + 1];

        // Initialize every state as unreachable.
        for (int i = 0; i <= n; i++) {
            java.util.Arrays.fill(prev[i], NEG);
        }

        prev[0][0] = 0; // Initially both subsequences are empty.

        // Process every array element one by one.
        for (int k = 1; k <= n; k++) {
            // cur stores the states after processing arr[k - 1].
            int[][] cur = new int[n + 1][n + 1];

            // Initialize every new state as unreachable.
            for (int i = 0; i <= n; i++) {
                java.util.Arrays.fill(cur[i], NEG);
            }

            // Try every possible pair of previous last indices.
            for (int i = 0; i <= n; i++) {
                for (int j = 0; j <= n; j++) {
                    if (prev[i][j] == NEG) {
                        continue; // Skip states that cannot be reached.
                    }

                    // Option 1: Do not use the current element.
                    cur[i][j] = Math.max(cur[i][j], prev[i][j]);

                    // Option 2: Add the current element to the increasing subsequence.
                    // Index 0 means that the increasing subsequence is still empty.
                    if (i == 0 || arr[k - 1] > arr[i - 1]) {
                        cur[k][j] = Math.max(cur[k][j], prev[i][j] + 1);
                    }

                    // Option 3: Add the current element to the decreasing subsequence.
                    // Index 0 means that the decreasing subsequence is still empty.
                    if (j == 0 || arr[k - 1] < arr[j - 1]) {
                        cur[i][k] = Math.max(cur[i][k], prev[i][j] + 1);
                    }
                }
            }

            // Move to the next DP layer.
            prev = cur;
        }

        int best = 0; // Store the largest number of elements used.

        // Check every final state to find the maximum number of selected elements.
        for (int i = 0; i <= n; i++) {
            for (int j = 0; j <= n; j++) {
                best = Math.max(best, prev[i][j]);
            }
        }

        // Everything not selected belongs to the answer.
        return n - best;
    }
}