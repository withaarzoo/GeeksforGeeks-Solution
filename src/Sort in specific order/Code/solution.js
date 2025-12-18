/**
 * @param {number[]} arr
 * @returns {void}
 */
class Solution {
  sortIt(arr) {
    let odd = [];
    let even = [];

    // Separate odd and even numbers
    for (let x of arr) {
      if (x % 2 !== 0) odd.push(x);
      else even.push(x);
    }

    // Sort odd in descending order
    odd.sort((a, b) => b - a);

    // Sort even in ascending order
    even.sort((a, b) => a - b);

    // Merge back into original array
    let idx = 0;
    for (let x of odd) arr[idx++] = x;
    for (let x of even) arr[idx++] = x;
  }
}
