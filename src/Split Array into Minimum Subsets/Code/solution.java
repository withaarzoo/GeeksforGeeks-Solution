class Solution {
    int minSubsets(int arr[]) {

        // Store all numbers for fast lookup
        HashSet<Integer> set = new HashSet<>();

        for (int x : arr) {
            set.add(x);
        }

        int ans = 0;

        // Count numbers that do not have a previous consecutive number
        for (int x : arr) {
            if (!set.contains(x - 1)) {
                ans++;
            }
        }

        // Return the minimum number of subsets
        return ans;
    }
}