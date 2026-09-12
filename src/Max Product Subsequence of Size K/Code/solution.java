
class Solution {
    public int maxProduct(int[] arr, int k) {
        // Sort the array so I can work with the smallest
        // and largest elements using two pointers.
        Arrays.sort(arr);

        int n = arr.length;

        // If k is 1, the largest element itself gives
        // the maximum possible product.
        if (k == 1) {
            return arr[n - 1];
        }

        // If all elements are non-positive and k is odd,
        // the final product cannot be positive.
        // I choose the k largest elements to get the maximum product.
        if (arr[n - 1] <= 0 && k % 2 == 1) {
            int product = 1;

            // The last k elements are the largest elements.
            for (int i = n - k; i < n; i++) {
                product *= arr[i];
            }

            return product;
        }

        int left = 0;       // Points to the smallest available elements.
        int right = n - 1; // Points to the largest available elements.
        int product = 1;   // Stores the product of selected elements.

        // For odd k, I first take the largest element.
        // This leaves an even number of elements to select in pairs.
        if (k % 2 == 1) {
            product *= arr[right];
            right--;
            k--;
        }

        // Select the remaining elements two at a time.
        while (k > 0) {
            // Product of the two smallest available elements.
            int leftProduct = arr[left] * arr[left + 1];

            // Product of the two largest available elements.
            int rightProduct = arr[right - 1] * arr[right];

            // Choose the pair that gives the larger product.
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
