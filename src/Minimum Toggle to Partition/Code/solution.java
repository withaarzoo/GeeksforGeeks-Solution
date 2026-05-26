class Solution {
    int minToggle(int[] arr) {

        // Count total zeros in the array
        int rightZeros = 0;

        for (int num : arr) {
            if (num == 0)
                rightZeros++;
        }

        // Initial answer
        int ans = rightZeros;

        // Count ones on left side
        int leftOnes = 0;

        // Try every partition
        for (int num : arr) {

            // Remove zero from right side
            if (num == 0)
                rightZeros--;

            // Add one to left side
            else
                leftOnes++;

            // Update minimum toggles
            ans = Math.min(ans, leftOnes + rightZeros);
        }

        return ans;
    }
}