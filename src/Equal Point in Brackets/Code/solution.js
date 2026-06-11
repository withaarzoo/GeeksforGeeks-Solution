class Solution {
  findIndex(s) {
    // I count all ')' first so I know how many closing brackets are on the right side.
    let closeCount = 0;
    for (let ch of s) {
      if (ch === ")") closeCount++;
    }

    // This tracks how many '(' have already been included in the left side.
    let openCount = 0;
    const n = s.length;

    // I try every split position from 0 to n.
    for (let i = 0; i <= n; i++) {
      // The first position where both counts match is the answer.
      if (openCount === closeCount) return i;

      // I then move the current character from right side to left side.
      if (i < n) {
        if (s[i] === "(") {
          openCount++; // This '(' now belongs to the left side.
        } else {
          closeCount--; // This ')' is no longer part of the right side.
        }
      }
    }

    // If no valid split exists, I return -1.
    return -1;
  }
}
