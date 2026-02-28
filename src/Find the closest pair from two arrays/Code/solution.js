class Solution {
  findClosestPair(arr1, arr2, x) {
    let n = arr1.length;
    let m = arr2.length;

    let i = 0;
    let j = m - 1;

    let minDiff = Number.MAX_SAFE_INTEGER;
    let bestA = 0,
      bestB = 0;

    while (i < n && j >= 0) {
      let sum = arr1[i] + arr2[j];
      let diff = Math.abs(sum - x);

      if (diff < minDiff) {
        minDiff = diff;
        bestA = arr1[i];
        bestB = arr2[j];
      }

      if (sum > x) {
        j--;
      } else {
        i++;
      }
    }

    return [bestA, bestB];
  }
}
