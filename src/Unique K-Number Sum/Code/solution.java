import java.util.ArrayList;

class Solution {
    // Returns all unique combinations of k numbers from 1..9 that sum to n.
    public ArrayList<ArrayList<Integer>> combinationSum(int n, int k) {
        ArrayList<ArrayList<Integer>> res = new ArrayList<>();
        ArrayList<Integer> path = new ArrayList<>();
        dfs(1, n, k, path, res);
        return res;
    }

    private void dfs(int start, int remaining, int k_left, ArrayList<Integer> path, ArrayList<ArrayList<Integer>> res) {
        if (k_left == 0) {
            if (remaining == 0) res.add(new ArrayList<>(path));
            return;
        }
        // minimal possible sum: start + (start+1) + ... for k_left numbers
        int min_sum = 0;
        for (int t = 0; t < k_left; t++) min_sum += (start + t);
        // maximal possible sum: 9 + 8 + ... for k_left numbers
        int max_sum = 0;
        for (int t = 0; t < k_left; t++) max_sum += (9 - t);
        if (remaining < min_sum || remaining > max_sum) return; // prune

        for (int num = start; num <= 9; num++) {
            if (num > remaining) break;
            path.add(num);
            dfs(num + 1, remaining - num, k_left - 1, path, res);
            path.remove(path.size() - 1); // backtrack
        }
    }
}
