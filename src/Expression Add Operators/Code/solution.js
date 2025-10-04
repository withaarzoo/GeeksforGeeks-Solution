/**
 * @param {string} s
 * @param {number} target
 * @returns {string[]}
 */
class Solution {
  findExpr(s, target) {
    const res = [];
    if (!s || s.length === 0) return res;
    const n = s.length;

    function dfs(pos, expr, curVal, last) {
      if (pos === n) {
        if (curVal === target) res.push(expr);
        return;
      }

      for (let i = pos; i < n; ++i) {
        if (i > pos && s[pos] === "0") break; // skip leading zero numbers
        const numStr = s.slice(pos, i + 1);
        const val = Number(numStr);

        if (pos === 0) {
          // first number (no operator before)
          dfs(i + 1, numStr, val, val);
        } else {
          // plus
          dfs(i + 1, expr + "+" + numStr, curVal + val, val);
          // minus
          dfs(i + 1, expr + "-" + numStr, curVal - val, -val);
          // multiply: replace last contribution with last * val
          dfs(
            i + 1,
            expr + "*" + numStr,
            curVal - last + last * val,
            last * val
          );
        }
      }
    }

    dfs(0, "", 0, 0);
    res.sort(); // lexicographic order
    return res;
  }
}
