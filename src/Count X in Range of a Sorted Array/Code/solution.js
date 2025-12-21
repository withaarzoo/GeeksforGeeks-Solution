class Solution {
  firstOccurrence(arr, l, r, x) {
    let ans = -1;
    while (l <= r) {
      let mid = Math.floor(l + (r - l) / 2);
      if (arr[mid] === x) {
        ans = mid;
        r = mid - 1;
      } else if (arr[mid] < x) {
        l = mid + 1;
      } else {
        r = mid - 1;
      }
    }
    return ans;
  }

  lastOccurrence(arr, l, r, x) {
    let ans = -1;
    while (l <= r) {
      let mid = Math.floor(l + (r - l) / 2);
      if (arr[mid] === x) {
        ans = mid;
        l = mid + 1;
      } else if (arr[mid] < x) {
        l = mid + 1;
      } else {
        r = mid - 1;
      }
    }
    return ans;
  }

  countXInRange(arr, queries) {
    let result = [];

    for (let q of queries) {
      let [l, r, x] = q;

      let first = this.firstOccurrence(arr, l, r, x);
      if (first === -1) {
        result.push(0);
        continue;
      }

      let last = this.lastOccurrence(arr, l, r, x);
      result.push(last - first + 1);
    }

    return result;
  }
}
