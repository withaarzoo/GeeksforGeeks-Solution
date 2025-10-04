class Solution {
  public:
    // s: input digit string (passed by reference), target: desired value
    vector<string> findExpr(string &s, int target) {
        vector<string> res;
        if (s.empty()) return res;
        string expr;
        dfs(0, expr, 0LL, 0LL, res, s, (long long)target);
        sort(res.begin(), res.end()); // ensure lexicographic order
        return res;
    }

  private:
    // pos: current index in s
    // expr: current expression string (we append/pop-back to backtrack)
    // curVal: evaluated value of current expression
    // last: last operand value that contributed to curVal (signed)
    void dfs(int pos, string &expr, long long curVal, long long last,
             vector<string>& res, const string& s, long long target) {
        int n = s.size();
        if (pos == n) {
            if (curVal == target) res.push_back(expr);
            return;
        }

        // Try all possible next numbers starting at pos
        for (int i = pos; i < n; ++i) {
            // Skip numbers with leading zero (like "03")
            if (i > pos && s[pos] == '0') break;

            string numStr = s.substr(pos, i - pos + 1);
            long long val = stoll(numStr); // convert substring to integer

            int lenBefore = expr.size(); // to restore expr after recursion

            if (pos == 0) {
                // First number - no operator in front
                expr += numStr;
                dfs(i + 1, expr, val, val, res, s, target);
                expr.resize(lenBefore);
            } else {
                // Add '+'
                expr += '+'; expr += numStr;
                dfs(i + 1, expr, curVal + val, val, res, s, target);
                expr.resize(lenBefore);

                // Add '-'
                expr += '-'; expr += numStr;
                dfs(i + 1, expr, curVal - val, -val, res, s, target);
                expr.resize(lenBefore);

                // Add '*'
                expr += '*'; expr += numStr;
                // For multiplication adjust the previous contribution
                dfs(i + 1, expr, curVal - last + last * val, last * val, res, s, target);
                expr.resize(lenBefore);
            }
        }
    }
};
