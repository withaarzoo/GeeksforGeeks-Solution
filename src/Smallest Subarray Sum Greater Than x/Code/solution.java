class Solution {
    public int smallestSubWithSum(int[] arr, int x) {
        int n = arr.length;
        int left = 0;
        long sum = 0;
        int minLen = n + 1;
        for (int right = 0; right < n; right++) {
            sum += arr[right];
            while (sum > x && left <= right) {
                minLen = Math.min(minLen, right - left + 1);
                sum -= arr[left];
                left++;
            }
        }
        return (minLen == n + 1) ? 0 : minLen;
    }
}