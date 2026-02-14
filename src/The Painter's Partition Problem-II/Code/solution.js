class Solution {
  isPossible(arr, k, maxTime) {
    let currentSum = 0;
    let painters = 1;

    for (let i = 0; i < arr.length; i++) {
      if (arr[i] > maxTime) return false;

      if (currentSum + arr[i] <= maxTime) {
        currentSum += arr[i];
      } else {
        painters++;
        currentSum = arr[i];
      }
    }

    return painters <= k;
  }

  minTime(arr, k) {
    let low = 0,
      high = 0;

    for (let x of arr) {
      low = Math.max(low, x);
      high += x;
    }

    let ans = high;

    while (low <= high) {
      let mid = Math.floor(low + (high - low) / 2);

      if (this.isPossible(arr, k, mid)) {
        ans = mid;
        high = mid - 1;
      } else {
        low = mid + 1;
      }
    }

    return ans;
  }
}
