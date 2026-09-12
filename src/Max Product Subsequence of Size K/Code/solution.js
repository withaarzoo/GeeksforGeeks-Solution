/*
 * @param {number[]} arr
 * @param {number} k
 * @return {number}
 */
class Solution {
  maxProduct(arr, k) {
    // Sort the array numerically so the smallest and largest
    // elements can be accessed from both ends.
    arr.sort((a, b) => a - b);

    const n = arr.length;

    // If I need only one element, the largest element
    // gives the maximum possible product.
    if (k === 1) {
      return arr[n - 1];
    }

    // If all elements are non-positive and k is odd,
    // the product cannot be positive.
    // I take the k largest elements because they give
    // the maximum product in this situation.
    if (arr[n - 1] <= 0 && k % 2 === 1) {
      let product = 1;

      // The last k elements are the largest elements.
      for (let i = n - k; i < n; i++) {
        product *= arr[i];
      }

      return product;
    }

    let left = 0; // Points to the two smallest available elements.
    let right = n - 1; // Points to the two largest available elements.
    let product = 1; // Stores the product of selected elements.

    // If k is odd, I take the largest element first.
    // This leaves an even number of elements for pair selection.
    if (k % 2 === 1) {
      product *= arr[right];
      right--;
      k--;
    }

    // Select the remaining elements in pairs.
    while (k > 0) {
      // Product of the two smallest available elements.
      // Two negative numbers can create a large positive product.
      const leftProduct = arr[left] * arr[left + 1];

      // Product of the two largest available elements.
      const rightProduct = arr[right - 1] * arr[right];

      // Choose whichever pair gives the larger product.
      if (leftProduct > rightProduct) {
        product *= leftProduct;
        left += 2; // Move past the two selected left elements.
      } else {
        product *= rightProduct;
        right -= 2; // Move past the two selected right elements.
      }

      // Two elements have been selected.
      k -= 2;
    }

    return product;
  }
}
