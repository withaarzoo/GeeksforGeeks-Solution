import java.util.PriorityQueue;
import java.util.Collections;

class Solution {
    public int maxAmount(int[] arr, int k) {

        // Modulo value given in the problem
        final int MOD = 1000000007;

        // Max heap to always get the seller with maximum tickets
        PriorityQueue<Integer> pq = new PriorityQueue<>(Collections.reverseOrder());

        // Insert every seller into the heap
        for (int x : arr) {
            if (x > 0)
                pq.offer(x);
        }

        long ans = 0;

        // Sell at most k tickets
        while (k > 0 && !pq.isEmpty()) {

            // Seller having maximum tickets
            int cur = pq.poll();

            // Add current ticket price
            ans = (ans + cur) % MOD;

            // One ticket has been sold
            cur--;

            // Insert back if tickets are still available
            if (cur > 0)
                pq.offer(cur);

            k--;
        }

        // Return answer modulo MOD
        return (int) ans;
    }
}