import java.util.*;

class Solution {
    public ArrayList<String> findExpr(String s, int target) {
        ArrayList<String> res = new ArrayList<>();
        if (s == null || s.length() == 0) return res;
        StringBuilder expr = new StringBuilder();
        dfs(0, expr, 0L, 0L, s, (long)target, res);
        Collections.sort(res); // lexicographic order
        return res;
    }

    private void dfs(int pos, StringBuilder expr, long curVal, long last,
                     String s, long target, ArrayList<String> res) {
        int n = s.length();
        if (pos == n) {
            if (curVal == target) res.add(expr.toString());
            return;
        }

        for (int i = pos; i < n; ++i) {
            if (i > pos && s.charAt(pos) == '0') break; // leading zero
            String numStr = s.substring(pos, i + 1);
            long val = Long.parseLong(numStr);

            int lenBefore = expr.length();

            if (pos == 0) {
                // first number, no operator
                expr.append(numStr);
                dfs(i + 1, expr, val, val, s, target, res);
                expr.setLength(lenBefore);
            } else {
                // plus
                expr.append('+').append(numStr);
                dfs(i + 1, expr, curVal + val, val, s, target, res);
                expr.setLength(lenBefore);

                // minus
                expr.append('-').append(numStr);
                dfs(i + 1, expr, curVal - val, -val, s, target, res);
                expr.setLength(lenBefore);

                // multiply
                expr.append('*').append(numStr);
                dfs(i + 1, expr, curVal - last + last * val, last * val, s, target, res);
                expr.setLength(lenBefore);
            }
        }
    }
}
