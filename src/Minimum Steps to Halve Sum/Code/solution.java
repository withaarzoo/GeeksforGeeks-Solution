import java.util.PriorityQueue;
import java.util.Collections;

class Solution {
    public int minOperations(int[] arr) {
        // max-heap of Double values
        PriorityQueue<Double> pq = new PriorityQueue<>(Collections.reverseOrder());
        double sum = 0.0;
        for (int v : arr) {
            pq.add((double) v);
            sum += v;
        }
        double target = sum / 2.0;
        int ops = 0;
        while (sum > target) {
            double top = pq.poll();
            double half = top / 2.0;
            sum -= (top - half); // decrease sum by the halved amount
            pq.add(half);
            ops++;
        }
        return ops;
    }

    // Example usage:
    // public static void main(String[] args) {
    // Solution s = new Solution();
    // int[] arr = {5, 19, 8, 1};
    // System.out.println(s.minOperations(arr)); // prints result
    // }
}
