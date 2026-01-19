class Solution {
  removeKdig(s, k) {
    let stack = [];

    for (let ch of s) {
      while (stack.length > 0 && k > 0 && stack[stack.length - 1] > ch) {
        stack.pop();
        k--;
      }
      stack.push(ch);
    }

    // remove remaining digits
    while (k > 0 && stack.length > 0) {
      stack.pop();
      k--;
    }

    // remove leading zeros
    let result = stack.join("").replace(/^0+/, "");

    return result === "" ? "0" : result;
  }
}
