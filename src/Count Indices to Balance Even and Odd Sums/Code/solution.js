class Solution {
  cntWays(arr) {
    const n = arr.length;

    let totalEven = 0,
      totalOdd = 0;

    for (let i = 0; i < n; i++) {
      if (i % 2 === 0) totalEven += arr[i];
      else totalOdd += arr[i];
    }

    let leftEven = 0,
      leftOdd = 0;
    let count = 0;

    for (let i = 0; i < n; i++) {
      if (i % 2 === 0) totalEven -= arr[i];
      else totalOdd -= arr[i];

      const newEvenSum = leftEven + totalOdd;
      const newOddSum = leftOdd + totalEven;

      if (newEvenSum === newOddSum) {
        count++;
      }

      if (i % 2 === 0) leftEven += arr[i];
      else leftOdd += arr[i];
    }

    return count;
  }
}
