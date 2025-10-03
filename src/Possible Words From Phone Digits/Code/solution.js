class Solution {
  constructor() {
    this.map = [
      "",
      "",
      "abc",
      "def",
      "ghi",
      "jkl",
      "mno",
      "pqrs",
      "tuv",
      "wxyz",
    ];
  }

  possibleWords(arr) {
    const res = [];
    const cur = [];

    const dfs = (idx) => {
      if (idx === arr.length) {
        if (cur.length > 0) res.push(cur.join(""));
        return;
      }
      const d = arr[idx];
      if (d < 0 || d > 9) return;
      const letters = this.map[d];
      if (letters.length === 0) {
        dfs(idx + 1); // skip 0 and 1
        return;
      }
      for (let ch of letters) {
        cur.push(ch);
        dfs(idx + 1);
        cur.pop();
      }
    };

    dfs(0);
    return res;
  }
}
