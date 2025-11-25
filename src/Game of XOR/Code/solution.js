/**
 * @param {number[]} arr
 * @return {number}
 */
class Solution {
  subarrayXor(arr) {
    const n = arr.length;

    // Even length -> all elements appear even times -> 0
    if (n % 2 === 0) return 0;

    let ans = 0;
    // Odd length -> only even indices contribute
    for (let i = 0; i < n; i += 2) {
      ans ^= arr[i];
    }
    return ans;
  }
}
