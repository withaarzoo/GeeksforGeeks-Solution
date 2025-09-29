import java.util.ArrayDeque;
import java.util.Deque;

class Solution {
    // Use long to avoid overflow of sums
    public long maxSubarrSum(int[] arr, int a, int b) {
        int n = arr.length;
        if (n == 0) return 0L;

        long[] prefix = new long[n + 1];
        prefix[0] = 0L;
        for (int i = 1; i <= n; ++i) prefix[i] = prefix[i - 1] + (long)arr[i - 1];

        Deque<Integer> dq = new ArrayDeque<>();
        long ans = Long.MIN_VALUE;

        for (int r = 1; r <= n; ++r) {
            int leftBound = Math.max(0, r - b);
            int newIdx = r - a;

            // remove indices that are out of the window
            while (!dq.isEmpty() && dq.peekFirst() < leftBound) dq.pollFirst();

            // add new index (if available) maintaining increasing prefix values
            if (newIdx >= 0) {
                while (!dq.isEmpty() && prefix[dq.peekLast()] >= prefix[newIdx]) dq.pollLast();
                dq.offerLast(newIdx);
            }

            if (!dq.isEmpty()) {
                ans = Math.max(ans, prefix[r] - prefix[dq.peekFirst()]);
            }
        }
        return ans;
    }
}
