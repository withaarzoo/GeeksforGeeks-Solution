import java.util.*;

class Solution {
    public ArrayList<ArrayList<Integer>> kSmallestPair(int[] arr1, int[] arr2, int k) {
        ArrayList<ArrayList<Integer>> res = new ArrayList<>();
        int n1 = arr1.length, n2 = arr2.length;
        if (n1 == 0 || n2 == 0 || k == 0)
            return res;

        // min-heap of (sum, i, j)
        class Node {
            long sum;
            int i, j;

            Node(long s, int a, int b) {
                sum = s;
                i = a;
                j = b;
            }
        }
        PriorityQueue<Node> pq = new PriorityQueue<>(Comparator.comparingLong(n -> n.sum));

        int limit = Math.min(n1, k);
        for (int i = 0; i < limit; ++i) {
            pq.offer(new Node((long) arr1[i] + arr2[0], i, 0));
        }

        while (!pq.isEmpty() && res.size() < k) {
            Node cur = pq.poll();
            ArrayList<Integer> pair = new ArrayList<>();
            pair.add(arr1[cur.i]);
            pair.add(arr2[cur.j]);
            res.add(pair);
            if (cur.j + 1 < n2) {
                pq.offer(new Node((long) arr1[cur.i] + arr2[cur.j + 1], cur.i, cur.j + 1));
            }
        }
        return res;
    }
}
