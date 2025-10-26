import java.util.PriorityQueue;

class Solution {
    public static int minCost(int[] arr) {
        if (arr == null || arr.length <= 1)
            return 0;

        PriorityQueue<Integer> pq = new PriorityQueue<>();
        for (int x : arr)
            pq.add(x);

        long total = 0L; // long to be safe with larger sums
        while (pq.size() > 1) {
            int a = pq.poll();
            int b = pq.poll();
            int sum = a + b;
            total += sum;
            pq.add(sum);
        }
        return (int) total;
    }
}
