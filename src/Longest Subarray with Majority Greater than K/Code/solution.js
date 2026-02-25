class Solution {
  longestSubarray(arr, k) {
    let map = new Map();
    let prefixSum = 0;
    let maxLen = 0;

    for (let i = 0; i < arr.length; i++) {
      // Convert to +1 or -1
      if (arr[i] > k) prefixSum += 1;
      else prefixSum -= 1;

      if (prefixSum > 0) {
        maxLen = i + 1;
      } else {
        if (!map.has(prefixSum)) {
          map.set(prefixSum, i);
        }

        if (map.has(prefixSum - 1)) {
          maxLen = Math.max(maxLen, i - map.get(prefixSum - 1));
        }
      }
    }

    return maxLen;
  }
}
