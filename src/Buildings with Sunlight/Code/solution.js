class Solution {
  visibleBuildings(arr) {
    let n = arr.length;

    let count = 1; // First building always visible
    let maxHeight = arr[0];

    for (let i = 1; i < n; i++) {
      if (arr[i] >= maxHeight) {
        count++;
        maxHeight = arr[i];
      }
    }

    return count;
  }
}
