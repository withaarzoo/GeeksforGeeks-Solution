class Solution {
  pythagoreanTriplet(arr) {
    let maxVal = 0;

    // Find maximum element
    for (let num of arr) maxVal = Math.max(maxVal, num);

    let present = new Array(maxVal + 1).fill(false);

    for (let num of arr) present[num] = true;

    // Try all pairs (a, b)
    for (let a = 1; a <= maxVal; a++) {
      if (!present[a]) continue;

      for (let b = a; b <= maxVal; b++) {
        if (!present[b]) continue;

        let cSquare = a * a + b * b;

        let c = Math.floor(Math.sqrt(cSquare));

        if (c <= maxVal && c * c === cSquare && present[c]) return true;
      }
    }

    return false;
  }
}
