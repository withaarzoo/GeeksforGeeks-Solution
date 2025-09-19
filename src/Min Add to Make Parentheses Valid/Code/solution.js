class Solution {
  minParentheses(s) {
    let balance = 0;
    let ans = 0;

    for (let i = 0; i < s.length; i++) {
      const c = s[i];
      if (c === "(") {
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
