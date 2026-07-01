class Solution {
  minInsAndDel(a, b) {
    // Store the index of every value in b
    const pos = new Map();
    for (let i = 0; i < b.length; i++) {
      pos.set(b[i], i);
    }

    // Store mapped indices of common elements
    const mapped = [];
    for (const x of a) {
      if (pos.has(x)) {
        mapped.push(pos.get(x));
      }
    }

    // Array used for LIS
    const lis = [];

    for (const idx of mapped) {
      // Binary search for the correct position
      let left = 0;
      let right = lis.length;

      while (left < right) {
        const mid = Math.floor((left + right) / 2);

        if (lis[mid] < idx) {
          left = mid + 1;
        } else {
          right = mid;
        }
      }

      if (left === lis.length) {
        // Extend the LIS
        lis.push(idx);
      } else {
        // Replace to keep the tail minimum
        lis[left] = idx;
      }
    }

    // Calculate total operations
    return a.length - lis.length + (b.length - lis.length);
  }
}
