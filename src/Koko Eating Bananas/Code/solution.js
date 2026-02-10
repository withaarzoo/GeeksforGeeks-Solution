class Solution {
  kokoEat(arr, k) {
    let low = 1;
    let high = Math.max(...arr);
    let ans = high;

    while (low <= high) {
      let mid = Math.floor((low + high) / 2);
      let hours = 0;

      for (let bananas of arr) {
        hours += Math.ceil(bananas / mid);
      }

      if (hours <= k) {
        ans = mid;
        high = mid - 1;
      } else {
        low = mid + 1;
      }
    }
    return ans;
  }
}
