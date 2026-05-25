class Solution {
  checkElements(start, end, arr) {
    // Store all array elements in a Set
    let set = new Set(arr);

    // Check every number from start to end
    for (let i = start; i <= end; i++) {
      // If number does not exist, return false
      if (!set.has(i)) {
        return false;
      }
    }

    // All numbers are present
    return true;
  }
}
