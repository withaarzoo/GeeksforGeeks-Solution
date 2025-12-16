class Solution {
  /**
   * @param {number[][]} arr
   * @return {number[][]}
   */
  mergeOverlap(arr) {
    if (arr.length === 0) return [];

    // Step 1: Sort intervals by start time
    arr.sort((a, b) => a[0] - b[0]);

    let result = [];
    let start = arr[0][0];
    let end = arr[0][1];

    // Step 2: Traverse remaining intervals
    for (let i = 1; i < arr.length; i++) {
      if (arr[i][0] <= end) {
        // Overlapping interval → merge
        end = Math.max(end, arr[i][1]);
      } else {
        // No overlap → push current interval
        result.push([start, end]);
        start = arr[i][0];
        end = arr[i][1];
      }
    }

    // Step 3: Add last interval
    result.push([start, end]);

    return result;
  }
}
