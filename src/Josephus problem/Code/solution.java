class Solution {
    public int josephus(int n, int k) {
        int ans = 0; // 0-based index

        for (int i = 2; i <= n; i++) {
            ans = (ans + k) % i;
        }

        // Convert to 1-based index
        return ans + 1;
    }
}
