import java.util.*;

class Solution {
    public ArrayList<Integer> findDuplicates(int[] arr) {
        int n = arr.length;
        ArrayList<Integer> ans = new ArrayList<>();

        // Traverse the array
        for (int i = 0; i < n; i++) {
            int x = Math.abs(arr[i]); // value between [1, n]
            int idx = x - 1; // mapped index

            if (arr[idx] > 0) {
                // First time we see x, mark as seen
                arr[idx] = -arr[idx];
            } else {
                // Already seen once, so x is a duplicate
                ans.add(x);
            }
        }

        return ans; // driver handles sorting/printing
    }
}
