class Solution {
  inversionCount(arr) {
    return this.mergeSort(arr, 0, arr.length - 1);
  }

  mergeSort(arr, left, right) {
    let invCount = 0;
    if (left < right) {
      let mid = Math.floor((left + right) / 2);

      invCount += this.mergeSort(arr, left, mid);
      invCount += this.mergeSort(arr, mid + 1, right);
      invCount += this.mergeAndCount(arr, left, mid, right);
    }
    return invCount;
  }

  mergeAndCount(arr, left, mid, right) {
    let temp = [];
    let i = left,
      j = mid + 1;
    let invCount = 0;

    while (i <= mid && j <= right) {
      if (arr[i] <= arr[j]) {
        temp.push(arr[i++]);
      } else {
        temp.push(arr[j++]);
        invCount += mid - i + 1;
      }
    }

    while (i <= mid) temp.push(arr[i++]);
    while (j <= right) temp.push(arr[j++]);

    for (let k = left; k <= right; k++) {
      arr[k] = temp[k - left];
    }

    return invCount;
  }
}
