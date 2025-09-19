class Solution {
    public int minParentheses(String s) {
        int balance = 0;
        int ans = 0;
        
        for (int i = 0; i < s.length(); i++) {
            char c = s.charAt(i);
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
}
