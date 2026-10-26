class Solution {
    public int minDiff(int k, int[] arr) {
        int n = arr.length;
        int[] preMax = new int[n];
        int[] preMin = new int[n];
        int[] sufMax = new int[n];
        int[] sufMin = new int[n];
        preMax[0] = preMin[0] = arr[0];
        for (int i = 1; i < n; i++) {
            preMax[i] = Math.max(preMax[i - 1], arr[i]);
            preMin[i] = Math.min(preMin[i - 1], arr[i]);
        }
        sufMax[n - 1] = sufMin[n - 1] = arr[n - 1];
        for (int i = n - 2; i >= 0; i--) {
            sufMax[i] = Math.max(sufMax[i + 1], arr[i]);
            sufMin[i] = Math.min(sufMin[i + 1], arr[i]);
        }
        int m = n - k;
        int ans = Integer.MAX_VALUE;
        for (int left = 0; left <= m; left++) {
            int right = left + k;
            int curMax, curMin;
            if (left == 0) {
                curMax = sufMax[right];
                curMin = sufMin[right];
            } else if (right == n) {
                curMax = preMax[left - 1];
                curMin = preMin[left - 1];
            } else {
                curMax = Math.max(preMax[left - 1], sufMax[right]);
                curMin = Math.min(preMin[left - 1], sufMin[right]);
            }
            ans = Math.min(ans, curMax - curMin);
        }
        return ans;
    }
}