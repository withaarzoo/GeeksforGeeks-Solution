class Solution {
    public int minSubarraySum(int[] arr) {
        int n = arr.length;
        int minEnding = arr[0];
        int minSoFar = arr[0];
        for (int i = 1; i < n; i++) {
            minEnding = Math.min(arr[i], minEnding + arr[i]);
            minSoFar = Math.min(minSoFar, minEnding);
        }
        return minSoFar;
    }
}