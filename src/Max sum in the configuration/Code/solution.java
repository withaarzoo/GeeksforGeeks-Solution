class Solution {
    int maxSum(int[] arr) {
        int n = arr.length;

        int arrSum = 0;
        int currVal = 0;

        // Initial calculation
        for (int i = 0; i < n; i++) {
            arrSum += arr[i];
            currVal += i * arr[i];
        }

        int maxVal = currVal;

        // Rotate and update value
        for (int i = 1; i < n; i++) {
            currVal = currVal + arrSum - n * arr[n - i];
            maxVal = Math.max(maxVal, currVal);
        }

        return maxVal;
    }
}
