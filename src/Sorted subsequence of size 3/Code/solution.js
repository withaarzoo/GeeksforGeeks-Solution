class Solution {
  find3Numbers(arr) {
    let n = arr.length;

    // If array size is less than 3
    if (n < 3) return [];

    // rightMax[i] stores maximum value from i to end
    let rightMax = new Array(n);
    rightMax[n - 1] = arr[n - 1];

    // Fill rightMax from right to left
    for (let i = n - 2; i >= 0; i--) {
      rightMax[i] = Math.max(arr[i], rightMax[i + 1]);
    }

    // Smallest value seen so far from left
    let leftMin = arr[0];

    // Check every element as middle element
    for (let i = 1; i < n - 1; i++) {
      if (leftMin < arr[i] && arr[i] < rightMax[i + 1]) {
        return [leftMin, arr[i], rightMax[i + 1]];
      }

      leftMin = Math.min(leftMin, arr[i]);
    }

    return [];
  }
}
