class Solution {
  kthElement(a, b, k) {
    // Ensure binary search on smaller array
    if (a.length > b.length) return this.kthElement(b, a, k);

    let n = a.length;
    let m = b.length;

    let low = Math.max(0, k - m);
    let high = Math.min(k, n);

    while (low <= high) {
      let cutA = Math.floor((low + high) / 2);
      let cutB = k - cutA;

      let leftA = cutA === 0 ? -Infinity : a[cutA - 1];
      let leftB = cutB === 0 ? -Infinity : b[cutB - 1];
      let rightA = cutA === n ? Infinity : a[cutA];
      let rightB = cutB === m ? Infinity : b[cutB];

      if (leftA <= rightB && leftB <= rightA) {
        return Math.max(leftA, leftB);
      } else if (leftA > rightB) {
        high = cutA - 1;
      } else {
        low = cutA + 1;
      }
    }

    return -1;
  }
}
