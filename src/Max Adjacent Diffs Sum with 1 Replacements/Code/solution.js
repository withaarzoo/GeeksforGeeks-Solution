class Solution {
  maxDiffSum(arr) {
    // keep stores the best sum when the previous element is kept unchanged.
    let keep = 0;

    // replace stores the best sum when the previous element is replaced by 1.
    let replace = 0;

    // Start from the second element because the first element has no previous neighbor.
    for (let i = 1; i < arr.length; i++) {
      // Calculate the best sum if the current element is kept unchanged.
      // The previous element can either be kept or replaced by 1.
      const newKeep = Math.max(
        keep + Math.abs(arr[i] - arr[i - 1]),
        replace + Math.abs(arr[i] - 1),
      );

      // Calculate the best sum if the current element is replaced by 1.
      // Keeping the previous element gives |1 - arr[i-1]|.
      // Replacing both elements gives |1 - 1| = 0.
      const newReplace = Math.max(keep + Math.abs(1 - arr[i - 1]), replace);

      // Update both states for the next element.
      keep = newKeep;
      replace = newReplace;
    }

    // The final element can be kept or replaced, so return the better state.
    return Math.max(keep, replace);
  }
}
