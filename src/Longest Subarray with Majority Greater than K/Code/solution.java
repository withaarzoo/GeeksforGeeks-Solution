import java.util.*;

class Solution {
    public int longestSubarray(int[] arr, int k) {

        HashMap<Integer, Integer> map = new HashMap<>();
        int prefixSum = 0;
        int maxLen = 0;

        for (int i = 0; i < arr.length; i++) {

            // Convert to +1 or -1
            if (arr[i] > k)
                prefixSum += 1;
            else
                prefixSum -= 1;

            if (prefixSum > 0) {
                maxLen = i + 1;
            } else {
                // Store first occurrence only
                if (!map.containsKey(prefixSum)) {
                    map.put(prefixSum, i);
                }

                if (map.containsKey(prefixSum - 1)) {
                    maxLen = Math.max(maxLen, i - map.get(prefixSum - 1));
                }
            }
        }

        return maxLen;
    }
}