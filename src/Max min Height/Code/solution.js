class Solution {
  canMake(arr, n, k, w, target) {
    let diff = new Array(n + 1).fill(0);
    let currAdd = 0;
    let operations = 0;

    for (let i = 0; i < n; i++) {
      currAdd += diff[i];
      let currentHeight = arr[i] + currAdd;

      if (currentHeight < target) {
        let need = target - currentHeight;
        operations += need;
        if (operations > k) return false;

        currAdd += need;
        if (i + w < n) diff[i + w] -= need;
      }
    }
    return true;
  }

  maxMinHeight(arr, k, w) {
    let n = arr.length;
    let minVal = Math.min(...arr);

    let low = minVal;
    let high = minVal + k;
    let ans = minVal;

    while (low <= high) {
      let mid = Math.floor((low + high) / 2);

      if (this.canMake(arr, n, k, w, mid)) {
        ans = mid;
        low = mid + 1;
      } else {
        high = mid - 1;
      }
    }
    return ans;
  }
}
