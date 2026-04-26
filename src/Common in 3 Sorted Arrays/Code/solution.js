class Solution {
  commonElements(a, b, c) {
    let ans = [];
    let i = 0,
      j = 0,
      k = 0;

    while (i < a.length && j < b.length && k < c.length) {
      let x = a[i],
        y = b[j],
        z = c[k];

      // Case 1: all three are equal => common element found
      if (x === y && y === z) {
        // Avoid duplicates in the answer
        if (ans.length === 0 || ans[ans.length - 1] !== x) {
          ans.push(x);
        }
        i++;
        j++;
        k++;
      }
      // Case 2: move the pointer(s) having the smallest value
      else {
        let mn = Math.min(x, y, z);
        if (x === mn) i++;
        if (y === mn) j++;
        if (z === mn) k++;
      }
    }

    return ans;
  }
}
