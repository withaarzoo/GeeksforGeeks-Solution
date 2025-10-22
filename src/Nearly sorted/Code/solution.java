import java.util.PriorityQueue;

class Solution {
    public void nearlySorted(int[] arr, int k) {
        int n = arr.length;
        if (n <= 1 || k <= 0)
            return; // nothing to do

        PriorityQueue<Integer> pq = new PriorityQueue<>(); // min-heap

        // add first k+1 elements
        for (int i = 0; i < n && i <= k; ++i)
            pq.add(arr[i]);

        int idx = 0;
        // process the remaining elements
        for (int i = k + 1; i < n; ++i) {
            arr[idx++] = pq.poll();
            pq.add(arr[i]);
        }

        // place remaining elements from heap
        while (!pq.isEmpty()) {
            arr[idx++] = pq.poll();
        }
    }
}
