import java.util.PriorityQueue;
import java.util.Arrays;
import java.util.Comparator;

class Solution {
    public boolean isPossible(int[] arr, int k) {
        // Sort to be safe (GfG often provides sorted input, but it's safe to sort)
        Arrays.sort(arr);

        // PriorityQueue stores int[]{value, length}
        PriorityQueue<int[]> pq = new PriorityQueue<>(new Comparator<int[]>() {
            public int compare(int[] a, int[] b) {
                if (a[0] == b[0])
                    return a[1] - b[1]; // smaller length first
                return a[0] - b[0]; // smaller value first
            }
        });

        int i = 0, n = arr.length;
        while (i < n) {
            if (pq.isEmpty()) {
                pq.add(new int[] { arr[i], 1 });
                i++;
            } else {
                int[] top = pq.peek();
                if (arr[i] == top[0]) {
                    // same value -> start new subsequence
                    pq.add(new int[] { arr[i], 1 });
                    i++;
                } else if (arr[i] == top[0] + 1) {
                    // extend shortest subsequence ending with top[0]
                    pq.poll();
                    pq.add(new int[] { arr[i], top[1] + 1 });
                    i++;
                } else {
                    // arr[i] > top[0] + 1 -> top subsequence cannot be extended
                    if (top[1] < k)
                        return false;
                    pq.poll();
                }
            }
        }

        // check remaining subsequences
        while (!pq.isEmpty()) {
            if (pq.peek()[1] < k)
                return false;
            pq.poll();
        }
        return true;
    }
}
