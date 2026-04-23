class Solution {
  canSplit(arr) {
    let total = 0;

    // Step 1: Total sum
    for (let x of arr) total += x;

    // Step 2: Odd check
    if (total % 2 !== 0) return false;

    let target = total / 2;
    let curr = 0;

    // Step 3: Traverse
    for (let i = 0; i < arr.length; i++) {
      curr += arr[i];

      if (curr === target) return true;
    }

    return false;
  }
}
