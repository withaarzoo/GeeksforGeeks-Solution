import java.util.*;

class Solution {
    public long subarrayXor(int arr[], int k) {

        HashMap<Integer, Long> freq = new HashMap<>();
        long count = 0;
        int prefixXor = 0;

        // Initial condition
        freq.put(0, 1L);

        for (int num : arr) {

            prefixXor ^= num;

            // Check if (prefixXor ^ k) exists
            if (freq.containsKey(prefixXor ^ k)) {
                count += freq.get(prefixXor ^ k);
            }

            // Update frequency
            freq.put(prefixXor, freq.getOrDefault(prefixXor, 0L) + 1);
        }

        return count;
    }
}