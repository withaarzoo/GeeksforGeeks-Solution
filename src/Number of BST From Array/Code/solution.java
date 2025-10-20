import java.util.*;
import java.math.*;

// I use BigInteger only if needed; but for problem constraints int is enough.
// Here I keep integers since n is small and Catalan numbers fit in int for n<=15.
class Solution {
    public ArrayList<Integer> countBSTs(int[] arr) {
        int n = arr.length;
        ArrayList<Integer> ans = new ArrayList<>();
        if (n == 0) return ans;

        // 1) Catalan DP
        int[] catalan = new int[n+1];
        catalan[0] = 1;
        for (int i = 1; i <= n; ++i) {
            long sum = 0;
            for (int j = 0; j < i; ++j) {
                sum += 1L * catalan[j] * catalan[i-1-j];
            }
            catalan[i] = (int)sum;
        }

        // 2) rank mapping via sorting
        int[] sorted = Arrays.copyOf(arr, n);
        Arrays.sort(sorted);
        HashMap<Integer,Integer> rank = new HashMap<>();
        for (int i = 0; i < n; ++i) rank.put(sorted[i], i);

        // 3) result
        for (int v : arr) {
            int left = rank.get(v);
            int right = n - 1 - left;
            ans.add(catalan[left] * catalan[right]);
        }
        return ans;
    }
}
