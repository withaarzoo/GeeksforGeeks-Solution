import java.util.*;

class Solution {
    public static ArrayList<ArrayList<Integer>> uniquePerms(int[] arr) {
        int n = arr.length;
        ArrayList<ArrayList<Integer>> res = new ArrayList<>();
        if (n == 0) {
            res.add(new ArrayList<>()); // one empty permutation
            return res;
        }
        Arrays.sort(arr); // group duplicates
        boolean[] used = new boolean[n];
        ArrayList<Integer> curr = new ArrayList<>();

        // backtracking function implemented with an inner class recursion
        class Backtrack {
            void dfs() {
                if (curr.size() == n) {
                    res.add(new ArrayList<>(curr)); // add a copy
                    return;
                }
                for (int i = 0; i < n; i++) {
                    if (used[i]) continue;
                    if (i > 0 && arr[i] == arr[i-1] && !used[i-1]) continue; // skip duplicates
                    used[i] = true;
                    curr.add(arr[i]);
                    dfs();
                    curr.remove(curr.size() - 1); // backtrack
                    used[i] = false;
                }
            }
        }

        new Backtrack().dfs();
        return res;
    }
}
