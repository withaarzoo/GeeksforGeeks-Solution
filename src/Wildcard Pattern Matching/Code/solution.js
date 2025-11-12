/**
 * @param {string} txt
 * @param {string} pat
 * @return {boolean}
 */
class Solution {
  wildCard(txt, pat) {
    const n = txt.length;
    const m = pat.length;
    let prev = new Array(m + 1).fill(false);
    let cur = new Array(m + 1).fill(false);
    prev[0] = true;

    // empty text vs pattern only true if pattern prefix is all '*'
    for (let j = 1; j <= m; ++j) {
      prev[j] = pat[j - 1] === "*" && prev[j - 1];
    }

    for (let i = 1; i <= n; ++i) {
      cur[0] = false;
      for (let j = 1; j <= m; ++j) {
        const pc = pat[j - 1];
        if (pc === "*") {
          // '*' matches empty (cur[j-1]) or matches one more char (prev[j])
          cur[j] = cur[j - 1] || prev[j];
        } else if (pc === "?" || pc === txt[i - 1]) {
          cur[j] = prev[j - 1];
        } else {
          cur[j] = false;
        }
      }
      // swap arrays
      const tmp = prev;
      prev = cur;
      cur = tmp;
    }

    return prev[m];
  }
}
