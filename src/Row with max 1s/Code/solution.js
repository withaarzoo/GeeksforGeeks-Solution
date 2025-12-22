/**
 * @param number[][] arr
 * @returns number
 */
class Solution {
  rowWithMax1s(arr) {
    const n = arr.length;
    const m = arr[0].length;

    let maxOnes = 0;
    let answer = -1;

    for (let i = 0; i < n; i++) {
      let low = 0,
        high = m - 1;
      let firstOne = -1;

      // Binary search
      while (low <= high) {
        let mid = Math.floor((low + high) / 2);

        if (arr[i][mid] === 1) {
          firstOne = mid;
          high = mid - 1;
        } else {
          low = mid + 1;
        }
      }

      if (firstOne !== -1) {
        let onesCount = m - firstOne;

        if (onesCount > maxOnes) {
          maxOnes = onesCount;
          answer = i;
        }
      }
    }

    return answer;
  }
}
