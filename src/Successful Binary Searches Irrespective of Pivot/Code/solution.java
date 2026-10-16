class Solution {
    public int countAlwaysFound(int[] arr) {
        int n = arr.length;
        if (n == 0) return 0;
        int[] sufMin = new int[n];
        sufMin[n-1] = arr[n-1];
        for (int i = n-2; i >= 0; --i)
            sufMin[i] = Math.min(arr[i], sufMin[i+1]);
        int ans = 0;
        int preMax = Integer.MIN_VALUE;
        for (int i = 0; i < n; ++i) {
            boolean leftOk = (i == 0) || (arr[i] > preMax);
            boolean rightOk = (i == n-1) || (arr[i] < sufMin[i+1]);
            if (leftOk && rightOk) ++ans;
            preMax = Math.max(preMax, arr[i]);
        }
        return ans;
    }
}