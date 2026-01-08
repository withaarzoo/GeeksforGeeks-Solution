class Solution {
  atMost(arr, k) {
    let left = 0,
      oddCount = 0,
      result = 0;

    for (let right = 0; right < arr.length; right++) {
      if (arr[right] % 2 === 1) oddCount++;

      while (oddCount > k) {
        if (arr[left] % 2 === 1) oddCount--;
        left++;
      }

      result += right - left + 1;
    }

    return result;
  }

  countSubarrays(arr, k) {
    return this.atMost(arr, k) - this.atMost(arr, k - 1);
  }
}
