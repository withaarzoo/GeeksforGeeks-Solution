import java.util.*;

class Solution {
    public int totalElements(int[] arr) {
        HashMap<Integer, Integer> freq = new HashMap<>();
        int left = 0;
        int maxLen = 0;

        for (int right = 0; right < arr.length; right++) {
            // Add current element
            freq.put(arr[right], freq.getOrDefault(arr[right], 0) + 1);

            // Shrink window if more than 2 distinct
            while (freq.size() > 2) {
                freq.put(arr[left], freq.get(arr[left]) - 1);

                if (freq.get(arr[left]) == 0) {
                    freq.remove(arr[left]);
                }

                left++;
            }

            maxLen = Math.max(maxLen, right - left + 1);
        }

        return maxLen;
    }
}