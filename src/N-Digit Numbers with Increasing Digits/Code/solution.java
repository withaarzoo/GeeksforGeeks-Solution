class Solution {

    // Recursive function to generate increasing numbers
    static void solve(int lastDigit, int len, int n, int num, ArrayList<Integer> ans) {

        // Required length reached
        if (len == n) {
            ans.add(num);
            return;
        }

        // Choose every larger digit
        for (int d = lastDigit + 1; d <= 9; d++) {
            // Append digit and continue
            solve(d, len + 1, n, num * 10 + d, ans);
        }
    }

    public static ArrayList<Integer> increasingNumbers(int n) {

        ArrayList<Integer> ans = new ArrayList<>();

        // Impossible to have more than 10 unique digits
        if (n > 10)
            return ans;

        // All single digits are valid
        if (n == 1) {
            for (int i = 0; i <= 9; i++)
                ans.add(i);
            return ans;
        }

        // Start recursion from digits 1 to 9
        for (int d = 1; d <= 9; d++) {
            solve(d, 1, n, d, ans);
        }

        return ans;
    }
}