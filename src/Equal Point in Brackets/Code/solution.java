class Solution {
    public int findIndex(String s) {
        // I count all closing brackets first, because that tells me
        // how many ')' are currently present on the right side.
        int closeCount = 0;
        for (int i = 0; i < s.length(); i++) {
            if (s.charAt(i) == ')')
                closeCount++;
        }

        // This keeps the number of '(' that have already moved to the left side.
        int openCount = 0;
        int n = s.length();

        // I check every possible split position from 0 to n.
        // At position i, the split is between s[i - 1] and s[i].
        for (int i = 0; i <= n; i++) {
            // If both counts match, this is the first valid answer.
            if (openCount == closeCount)
                return i;

            // If I am not past the end, I move s[i] from the right side to the left side.
            if (i < n) {
                if (s.charAt(i) == '(') {
                    openCount++; // This opening bracket now belongs to the left part.
                } else {
                    closeCount--; // This closing bracket is removed from the right part.
                }
            }
        }

        // If no split works, I return -1.
        return -1;
    }
}