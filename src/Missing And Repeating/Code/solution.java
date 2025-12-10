import java.util.*;

class Solution {
    ArrayList<Integer> findTwoElement(int arr[]) {
        int n = arr.length;
        
        long S = 0;      // actual sum
        long Sq = 0;     // actual sum of squares
        
        for (int x : arr) {
            S += x;
            Sq += 1L * x * x;  // use long for safety
        }
        
        long N = n;
        long S_exp = N * (N + 1) / 2;                      // expected sum
        long Sq_exp = N * (N + 1) * (2 * N + 1) / 6;       // expected squares
        
        long diff = S - S_exp;         // R - M
        long diffSq = Sq - Sq_exp;     // R^2 - M^2
        
        long sumRM = diffSq / diff;    // R + M
        
        long R = (diff + sumRM) / 2;   // repeating
        long M = R - diff;             // missing
        
        ArrayList<Integer> ans = new ArrayList<>();
        ans.add((int)R);  // repeating
        ans.add((int)M);  // missing
        return ans;
    }
}
