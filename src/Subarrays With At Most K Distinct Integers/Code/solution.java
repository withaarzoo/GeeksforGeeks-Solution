import java.util.*;

class Solution {
    public int countAtMostK(int arr[], int k) {
        if (k == 0)
            return 0;

        Map<Integer, Integer> freq = new HashMap<>();
        int left = 0;
        long ans = 0;

        for (int right = 0; right < arr.length; right++) {
            // Add element to frequency map
            freq.put(arr[right], freq.getOrDefault(arr[right], 0) + 1);

            // Shrink window if distinct count exceeds k
            while (freq.size() > k) {
                freq.put(arr[left], freq.get(arr[left]) - 1);
                if (freq.get(arr[left]) == 0) {
                    freq.remove(arr[left]);
                }
                left++;
            }

            // Add valid subarrays count
            ans += (right - left + 1);
        }

        return (int) ans;
    }
}
