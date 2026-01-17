/**
 * @param {string} s
 * @returns {boolean}
 */
class Solution {
  checkRedundancy(s) {
    let stack = [];

    for (let ch of s) {
      if (ch !== ")") {
        stack.push(ch);
      } else {
        let hasOperator = false;

        while (stack.length && stack[stack.length - 1] !== "(") {
          let top = stack.pop();
          if (top === "+" || top === "-" || top === "*" || top === "/") {
            hasOperator = true;
          }
        }

        // Remove '('
        if (stack.length) stack.pop();

        if (!hasOperator) return true;
      }
    }
    return false;
  }
}
