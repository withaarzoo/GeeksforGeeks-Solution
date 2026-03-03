class Solution {
  totalElements(arr) {
    let freq = new Map();
    let left = 0;
    let maxLen = 0;

    for (let right = 0; right < arr.length; right++) {
      // Add current element
      freq.set(arr[right], (freq.get(arr[right]) || 0) + 1);

      // Shrink window if more than 2 distinct
      while (freq.size > 2) {
        freq.set(arr[left], freq.get(arr[left]) - 1);

        if (freq.get(arr[left]) === 0) {
          freq.delete(arr[left]);
        }

        left++;
      }

      maxLen = Math.max(maxLen, right - left + 1);
    }

    return maxLen;
  }
}
