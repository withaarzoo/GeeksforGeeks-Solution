class Solution {
  // Count how many triplets have a sum <= target.
  countLessEqual(arr, target) {
    const n = arr.length; // Store the number of elements in the array.
    let count = 0; // Store the number of valid triplets.

    // Fix the first element of the triplet one by one.
    for (let i = 0; i < n - 2; i++) {
      let left = i + 1; // Start the second element just after i.
      let right = n - 1; // Start the third element at the end.

      // Move the two pointers until they cross.
      while (left < right) {
        // Calculate the sum of the current three elements.
        const sum = arr[i] + arr[left] + arr[right];

        if (sum <= target) {
          // Because the array is sorted, all indices from left to right - 1
          // also produce valid triplets with arr[i] and arr[right].
          count += right - left;

          // Move left forward to check the next possible pair.
          left++;
        } else {
          // The sum is too large, so move right backward
          // to reduce the sum.
          right--;
        }
      }
    }

    return count; // Return the number of triplets with sum <= target.
  }

  countTriplets(arr, l, r) {
    // Sort numerically because JavaScript's default sort is lexicographical.
    arr.sort((a, b) => a - b);

    // Count sums <= r and subtract sums <= l - 1.
    const result =
      this.countLessEqual(arr, r) - this.countLessEqual(arr, l - 1);

    // The maximum answer for n <= 1000 fits safely in JavaScript's Number.
    return result;
  }
}
