class Solution {
    public int getLastMoment(int n, int left[], int right[]) {
        int ans = 0;

        // Ants moving to the left
        for (int pos : left) {
            ans = Math.max(ans, pos);
        }

        // Ants moving to the right
        for (int pos : right) {
            ans = Math.max(ans, n - pos);
        }

        return ans;
    }
}
