class Solution {
  countAtMostK(arr, k) {
    if (k === 0) return 0;

    let freq = new Map();
    let left = 0;
    let ans = 0;

    for (let right = 0; right < arr.length; right++) {
      freq.set(arr[right], (freq.get(arr[right]) || 0) + 1);

      while (freq.size > k) {
        freq.set(arr[left], freq.get(arr[left]) - 1);
        if (freq.get(arr[left]) === 0) {
          freq.delete(arr[left]);
        }
        left++;
      }

      ans += right - left + 1;
    }

    return ans;
  }
}
