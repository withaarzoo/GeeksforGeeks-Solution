class Solution {
  /**
   * @param {string} s
   * @returns {string[]}
   */
  isValid(s) {
    let count = 0;
    for (let ch of s) {
      if (ch === "(") count++;
      else if (ch === ")") {
        count--;
        if (count < 0) return false;
      }
    }
    return count === 0;
  }

  validParenthesis(s) {
    let ans = [];
    let visited = new Set();
    let q = [s];

    visited.add(s);
    let found = false;

    while (q.length > 0) {
      let size = q.length;
      // Process the current level entirely
      for (let i = 0; i < size; i++) {
        let curr = q.shift();

        if (this.isValid(curr)) {
          ans.push(curr);
          found = true;
        }

        if (found) continue;

        for (let j = 0; j < curr.length; j++) {
          if (curr[j] !== "(" && curr[j] !== ")") continue;

          let next = curr.slice(0, j) + curr.slice(j + 1);
          if (!visited.has(next)) {
            visited.add(next);
            q.push(next);
          }
        }
      }
      if (found) break;
    }
    return ans;
  }
}
