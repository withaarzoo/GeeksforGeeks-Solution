import java.util.*;

class Solution {
    public ArrayList<Integer> topKFreq(int[] arr, int k) {
        // frequency map
        HashMap<Integer, Integer> freq = new HashMap<>();
        for (int x : arr)
            freq.put(x, freq.getOrDefault(x, 0) + 1);

        // min-heap with comparator:
        // primary -> smaller frequency is lower priority (so comes first in min-heap)
        // secondary -> smaller value is lower priority (since we want larger value when
        // tie)
        PriorityQueue<int[]> pq = new PriorityQueue<>(new Comparator<int[]>() {
            public int compare(int[] a, int[] b) {
                if (a[0] != b[0])
                    return Integer.compare(a[0], b[0]); // freq ascending
                return Integer.compare(a[1], b[1]); // value ascending
            }
        });

        for (Map.Entry<Integer, Integer> e : freq.entrySet()) {
            int val = e.getKey();
            int f = e.getValue();
            pq.offer(new int[] { f, val });
            if (pq.size() > k)
                pq.poll();
        }

        ArrayList<Integer> res = new ArrayList<>();
        while (!pq.isEmpty()) {
            res.add(pq.poll()[1]); // poll returns lowest among top-k
        }
        Collections.reverse(res);
        return res;
    }
}
