class Solution {
  overlapInt(arr) {
    // Step 1: Find maximum end
    let maxEnd = 0;
    for (let interval of arr) {
      maxEnd = Math.max(maxEnd, interval[1]);
    }

    // Step 2: Difference array
    let diff = new Array(maxEnd + 2).fill(0);

    // Step 3: Mark start and end+1
    for (let interval of arr) {
      let start = interval[0];
      let end = interval[1];

      diff[start] += 1;
      diff[end + 1] -= 1;
    }

    let current = 0;
    let maxOverlap = 0;

    // Step 4: Prefix sum
    for (let i = 0; i <= maxEnd; i++) {
      current += diff[i];
      maxOverlap = Math.max(maxOverlap, current);
    }

    return maxOverlap;
  }
}
