class Solution {
  replaceElements(arr) {
    const n = arr.length;

    // Temporary array to store updated values
    let temp = new Array(n);

    // First element
    temp[0] = arr[0] ^ arr[1];

    // Last element
    temp[n - 1] = arr[n - 2] ^ arr[n - 1];

    // Middle elements
    for (let i = 1; i < n - 1; i++) {
      temp[i] = arr[i - 1] ^ arr[i + 1];
    }

    // Copy values back to original array
    for (let i = 0; i < n; i++) {
      arr[i] = temp[i];
    }
  }
}
