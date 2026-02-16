class Solution {
  canAttend(arr) {
    const n = arr.length;

    // Step 1: Sort by starting time
    arr.sort((a, b) => a[0] - b[0]);

    // Step 2: Check for overlapping
    for (let i = 1; i < n; i++) {
      if (arr[i][0] < arr[i - 1][1]) {
        return false;
      }
    }

    return true;
  }
}
