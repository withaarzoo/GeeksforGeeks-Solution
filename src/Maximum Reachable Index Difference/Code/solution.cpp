class Solution {
  public:
    int maxIndexDifference(string &s) {
        // Store the farthest reachable ending index for each character.
        vector<int> best(26, -1);

        int ans = -1;

        // Traverse from right to left.
        for (int i = (int)s.size() - 1; i >= 0; i--) {

            // Current character index (0 -> 'a', 25 -> 'z').
            int c = s[i] - 'a';

            int reach;

            // 'z' has no next character, so it ends here.
            if (c == 25) {
                reach = i;
            }
            // If the next character exists on the right,
            // inherit its farthest reachable ending index.
            else if (best[c + 1] != -1) {
                reach = best[c + 1];
            }
            // Otherwise, no jump is possible.
            else {
                reach = i;
            }

            // Update the best reachable ending index for this character.
            best[c] = max(best[c], reach);

            // If this is an 'a', update the answer.
            if (c == 0) {
                ans = max(ans, reach - i);
            }
        }

        return ans;
    }
};