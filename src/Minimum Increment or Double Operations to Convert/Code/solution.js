class Solution {
  countMinOperations(arr) {
    // Stores total increment operations
    let increments = 0;

    // Stores the maximum element
    let maxValue = 0;

    // Function to count set bits
    const popcount = (num) => {
      let count = 0;

      while (num > 0) {
        count += num & 1;
        num >>= 1;
      }

      return count;
    };

    // Process every element
    for (let num of arr) {
      // Every set bit needs one increment
      increments += popcount(num);

      // Update maximum element
      if (num > maxValue) {
        maxValue = num;
      }
    }

    // Counts doubling operations
    let doubles = 0;

    // Divide largest element until it becomes 1
    while (maxValue > 1) {
      maxValue = Math.floor(maxValue / 2);
      doubles++;
    }

    // Return answer
    return increments + doubles;
  }
}
