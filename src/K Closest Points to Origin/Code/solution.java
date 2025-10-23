import java.util.*;

// I use a PriorityQueue with comparator that keeps the largest distance on top.
// Store each element as int[] {dist, x, y} or use a small wrapper.
// Here I store int[] {dist, x, y} where dist is squared distance.
class Solution {
    public ArrayList<ArrayList<Integer>> kClosest(int[][] points, int k) {
        // max-heap by squared distance
        PriorityQueue<int[]> pq = new PriorityQueue<>(new Comparator<int[]>() {
            public int compare(int[] a, int[] b) {
                // descending by distance
                return Integer.compare(b[0], a[0]);
            }
        });

        for (int i = 0; i < points.length; i++) {
            int x = points[i][0], y = points[i][1];
            long dlong = 1L * x * x + 1L * y * y;
            // distances could overflow int theoretically if xi up to ~3e4 => xi^2 up to 9e8
            // fits in int
            // but safe casting to int here is acceptable; still use int cast for priority
            // queue.
            int dist = (int) dlong;
            pq.offer(new int[] { dist, x, y });
            if (pq.size() > k)
                pq.poll(); // remove the farthest among current
        }

        ArrayList<ArrayList<Integer>> res = new ArrayList<>();
        while (!pq.isEmpty()) {
            int[] top = pq.poll();
            ArrayList<Integer> p = new ArrayList<>();
            p.add(top[1]);
            p.add(top[2]);
            res.add(p);
        }
        return res;
    }
}
