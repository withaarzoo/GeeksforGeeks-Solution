class Solution {
  maxProduct(arr) {
    let maxEnding = arr[0];
    let minEnding = arr[0];
    let result = arr[0];

    for (let i = 1; i < arr.length; i++) {
      if (arr[i] < 0) {
        [maxEnding, minEnding] = [minEnding, maxEnding];
      }

      maxEnding = Math.max(arr[i], maxEnding * arr[i]);
      minEnding = Math.min(arr[i], minEnding * arr[i]);

      result = Math.max(result, maxEnding);
    }

    return result;
  }
}
