import java.util.*;

class Solution {
    public static ArrayList<Integer> subsetXOR(int n) {
        long T;
        // XOR of 1..n using pattern
        if (n % 4 == 0)
            T = n;
        else if (n % 4 == 1)
            T = 1;
        else if (n % 4 == 2)
            T = n + 1;
        else
            T = 0; // n % 4 == 3

        ArrayList<Integer> ans = new ArrayList<>();

        if (T == n) {
            // Case 1: take all numbers 1..n
            for (int i = 1; i <= n; i++) {
                ans.add(i);
            }
        } else {
            // Case 2: remove exactly one element x = T ^ n
            int x = (int) (T ^ n);
            for (int i = 1; i <= n; i++) {
                if (i == x)
                    continue; // skip x
                ans.add(i);
            }
        }

        return ans;
    }
}
