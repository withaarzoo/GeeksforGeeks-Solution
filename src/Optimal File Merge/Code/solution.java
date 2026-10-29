class Solution {
    public int minComputation(int[] files) {
        PriorityQueue<Integer> pq = new PriorityQueue<>();
        for (int f : files) pq.offer(f);
        long cost = 0;
        while (pq.size() > 1) {
            int a = pq.poll();
            int b = pq.poll();
            int sum = a + b;
            cost += sum;
            pq.offer(sum);
        }
        return (int)cost;
    }
}