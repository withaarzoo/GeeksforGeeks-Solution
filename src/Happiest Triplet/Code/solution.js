class Solution {
  smallestDiff(a, b, c) {
    a.sort((x, y) => x - y);
    b.sort((x, y) => x - y);
    c.sort((x, y) => x - y);

    let i = 0,
      j = 0,
      k = 0;
    let bestDiff = Infinity;
    let bestSum = Infinity;
    let ans = [];

    while (i < a.length && j < b.length && k < c.length) {
      let x = a[i],
        y = b[j],
        z = c[k];

      let mx = Math.max(x, y, z);
      let mn = Math.min(x, y, z);

      let diff = mx - mn;
      let sum = x + y + z;

      if (diff < bestDiff || (diff === bestDiff && sum < bestSum)) {
        bestDiff = diff;
        bestSum = sum;
        ans = [x, y, z];
      }

      if (mn === x) i++;
      else if (mn === y) j++;
      else k++;
    }

    return ans.sort((x, y) => y - x);
  }
}
