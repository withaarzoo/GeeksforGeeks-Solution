import java.util.*;

class Solution {
    public ArrayList<Integer> longestSubarray(int[] arr, int x) {
        int n = arr.length;
        ArrayList<Integer> result = new ArrayList<>();
        if (n == 0) return result;

        Deque<Integer> maxD = new ArrayDeque<>(); // indices, values decreasing
        Deque<Integer> minD = new ArrayDeque<>(); // indices, values increasing

        int l = 0, bestL = 0, bestLen = 0;

        for (int r = 0; r < n; r++) {
            // maintain max deque (decreasing)
            while (!maxD.isEmpty() && arr[r] > arr[maxD.peekLast()]) maxD.pollLast();
            maxD.offerLast(r);

            // maintain min deque (increasing)
            while (!minD.isEmpty() && arr[r] < arr[minD.peekLast()]) minD.pollLast();
            minD.offerLast(r);

            // shrink window if invalid
            while (!maxD.isEmpty() && !minD.isEmpty() && (long)arr[maxD.peekFirst()] - arr[minD.peekFirst()] > x) {
                if (maxD.peekFirst() == l) maxD.pollFirst();
                if (minD.peekFirst() == l) minD.pollFirst();
                l++;
            }

            int len = r - l + 1;
            if (len > bestLen) { // strictly greater to prefer smaller start index on ties
                bestLen = len;
                bestL = l;
            }
        }

        for (int i = bestL; i < bestL + bestLen; i++) result.add(arr[i]);
        return result;
    }
}
