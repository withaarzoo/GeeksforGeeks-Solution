class Solution {
  minToggle(arr) {
    // Count total zeros
    let rightZeros = 0;

    for (let num of arr) {
      if (num === 0) rightZeros++;
    }

    // Initial minimum answer
    let ans = rightZeros;

    // Count ones on left side
    let leftOnes = 0;

    // Traverse array
    for (let num of arr) {
      // Current zero leaves right side
      if (num === 0) rightZeros--;
      // Current one enters left side
      else leftOnes++;

      // Update answer
      ans = Math.min(ans, leftOnes + rightZeros);
    }

    return ans;
  }
}
