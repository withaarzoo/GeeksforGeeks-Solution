class Solution {
  maxOnes(arr, k) {
    let left = 0;
    let zeroCount = 0;
    let maxLen = 0;

    for (let right = 0; right < arr.length; right++) {
      // If we see a zero, increase count
      if (arr[right] === 0) {
        zeroCount++;
      }

      // Shrink window if zero count > k
      while (zeroCount > k) {
        if (arr[left] === 0) {
          zeroCount--;
        }
        left++;
      }

      // Update max length
      maxLen = Math.max(maxLen, right - left + 1);
    }

    return maxLen;
  }
}
