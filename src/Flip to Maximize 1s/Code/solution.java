class Solution {
    int maxOnes(int[] arr) {
        int ones = 0;

        // Count current number of 1s
        for (int num : arr) {
            if (num == 1) {
                ones++;
            }
        }

        int currentGain = 0;
        int maxGain = 0;

        // Apply Kadane's Algorithm
        for (int num : arr) {
            int value;

            // Flipping 0 increases ones count
            // Flipping 1 decreases ones count
            if (num == 0) {
                value = 1;
            } else {
                value = -1;
            }

            currentGain = Math.max(value, currentGain + value);
            maxGain = Math.max(maxGain, currentGain);
        }

        return ones + maxGain;
    }
}