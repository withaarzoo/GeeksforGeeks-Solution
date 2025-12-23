class Solution {
  cntInRange(arr, queries) {
    // Step 1: Sort the array
    arr.sort((a, b) => a - b);

    const result = [];

    for (let [a, b] of queries) {
      let left = this.lowerBound(arr, a);
      let right = this.upperBound(arr, b);
      result.push(right - left);
    }

    return result;
  }

  lowerBound(arr, target) {
    let l = 0,
      r = arr.length;
    while (l < r) {
      let mid = Math.floor((l + r) / 2);
      if (arr[mid] < target) l = mid + 1;
      else r = mid;
    }
    return l;
  }

  upperBound(arr, target) {
    let l = 0,
      r = arr.length;
    while (l < r) {
      let mid = Math.floor((l + r) / 2);
      if (arr[mid] <= target) l = mid + 1;
      else r = mid;
    }
    return l;
  }
}
