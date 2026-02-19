class Solution {
  missingRange(arr, low, high) {
    const result = [];
    const present = new Set();

    // Mark only numbers that fall inside [low, high]
    for (const x of arr) {
      if (x >= low && x <= high) present.add(x);
    }

    // Iterate the range and collect missing numbers
    for (let v = low; v <= high; ++v) {
      if (!present.has(v)) result.push(v);
    }
    return result;
  }
}
