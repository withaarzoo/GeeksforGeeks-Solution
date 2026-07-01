import java.util.*;

class Solution {
    public int minInsAndDel(int[] a, int[] b) {

        // Store the index of every value in b
        HashMap<Integer, Integer> pos = new HashMap<>();
        for (int i = 0; i < b.length; i++) {
            pos.put(b[i], i);
        }

        // Store mapped indices of common elements
        ArrayList<Integer> mapped = new ArrayList<>();
        for (int x : a) {
            if (pos.containsKey(x)) {
                mapped.add(pos.get(x));
            }
        }

        // List used for LIS
        ArrayList<Integer> lis = new ArrayList<>();

        for (int idx : mapped) {

            // Binary search for the insertion position
            int left = 0;
            int right = lis.size();

            while (left < right) {
                int mid = left + (right - left) / 2;

                if (lis.get(mid) < idx) {
                    left = mid + 1;
                } else {
                    right = mid;
                }
            }

            if (left == lis.size()) {
                // Extend the LIS
                lis.add(idx);
            } else {
                // Replace to maintain the smallest possible tail
                lis.set(left, idx);
            }
        }

        // Remaining elements need insertion or deletion
        return (a.length - lis.size()) + (b.length - lis.size());
    }
}