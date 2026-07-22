class Solution {
  minDeletions(arr) {
    // Stores the smallest possible ending values
    // of increasing subsequences.
    let lis = [];

    // Process every number.
    for (let num of arr) {
      // Extend the subsequence if possible.
      if (lis.length === 0 || num > lis[lis.length - 1]) {
        lis.push(num);
      } else {
        // Binary search for the first value
        // greater than or equal to num.
        let left = 0;
        let right = lis.length - 1;

        while (left <= right) {
          let mid = Math.floor((left + right) / 2);

          if (lis[mid] >= num) right = mid - 1;
          else left = mid + 1;
        }

        // Replace the value to keep future options better.
        lis[left] = num;
      }
    }

    // Total deletions.
    return arr.length - lis.length;
  }
}
