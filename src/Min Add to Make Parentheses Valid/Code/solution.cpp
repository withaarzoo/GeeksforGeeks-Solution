class Solution {
  public:
    int minParentheses(string& s) {
        int balance = 0;
        int ans = 0;

        for (char c : s) {
            if (c == '(') {
                balance++;
            } else {
                if (balance > 0) {
                    balance--;
                } else {
                    ans++;
                }
            }
        }
        return ans + balance;
    }
};
